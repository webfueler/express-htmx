import { IoOperations } from "../services/io";
import { Manifest } from "../services/manifest";
import { ApiError, DeleteMfeDto, MfeDto, MfeInfo } from "./schema";
import { db } from "../db";

const getEnvIdOrThrow = async (env: string): Promise<number> => {
  const env_id = await db.database.get<{ id: number }>(
    "SELECT id FROM environments WHERE name=?",
    [env],
  );

  if (!env_id) {
    throw new Error(`Environment not found: "${env}"`);
  }

  return env_id.id;
};

const getAllEnvs = async (): Promise<string[]> =>
  (
    await db.database.all<Array<{ name: string }>>(
      "SELECT name FROM environments",
    )
  ).map((res) => res.name);

const getAll = async (env: string): Promise<MfeInfo> => {
  const env_id = await getEnvIdOrThrow(env);
  const data = await db.database.all<
    Array<{
      id: number;
      id_environment: number;
      name: string;
      js: string;
      css: string;
      env_name: string;
    }>
  >(
    `SELECT * FROM maps 
     WHERE id_environment=?`,
    [env_id],
  );

  const result: MfeInfo = {};
  for (const map of data) {
    result[map.name] = { jsBundle: map.js, cssBundle: map.css };
  }

  return result;
};

const createOrUpdate = async (
  env: string,
  mfe: MfeDto,
): Promise<MfeInfo | ApiError> => {
  let jsBundle: string;
  let cssBundle: string | undefined;
  const filename = `${env}.json`;

  // load from manifest file if it's the case
  if (mfe.manifest) {
    try {
      ({ jsBundle, cssBundle } = await Manifest.loadManifest(mfe.url));
    } catch (e) {
      return {
        status: "failed",
        error: [
          {
            message: `Unable to load manifest from ${mfe.url}`,
          },
        ],
      };
    }
  } else {
    jsBundle = mfe.url;
  }

  const mfeInfoItem: MfeInfo = {
    [mfe.name]: {
      jsBundle,
      cssBundle,
    },
  };

  const env_id = await getEnvIdOrThrow(env);
  const exists = await db.database.get<{ name: string }>(
    "SELECT name FROM maps WHERE name=? AND id_environment = ?",
    [mfe.name, env_id],
  );

  if (exists) {
    await db.database.run(
      "UPDATE maps SET js = ?, css = ? WHERE name = ? AND id_environment = ?",
      [jsBundle, cssBundle || "", mfe.name, env_id],
    );
  } else {
    await db.database.run(
      "INSERT INTO maps (id_environment, name, js, css) VALUES (?, ?, ?, ?)",
      [env_id, mfe.name, jsBundle, cssBundle || ""],
    );
  }

  // update current data
  const newData = await getAll(env);
  await IoOperations.save(filename, newData);

  return mfeInfoItem;
};

const remove = async (
  env: string,
  mfe: DeleteMfeDto,
): Promise<{} | ApiError> => {
  const filename = `${env}.json`;

  const env_id = await getEnvIdOrThrow(env);
  const exists = await db.database.get<{ name: string }>(
    "SELECT name FROM maps WHERE name=? AND id_environment = ?",
    [mfe.name, env_id],
  );

  if (exists) {
    await db.database.run(
      "DELETE from maps WHERE name = ? AND id_environment = ?",
      [mfe.name, env_id],
    );

    const newData = await getAll(env);
    await IoOperations.save(filename, newData);
    return {};
  } else {
    return {
      status: "failed",
      message: `"${mfe.name}" does not exist.`,
    };
  }
};

export const MfeModel = {
  getAll,
  getAllEnvs,
  createOrUpdate,
  remove,
};
