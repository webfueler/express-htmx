import { IoOperations } from "../services/io";
import { Manifest } from "../services/manifest";
import { ApiError, DeleteMfeDto, MfeDto, MfeInfo } from "./schema";

const getAll = async (env: string) => {
  const filename = `${env}.json`;
  const data = await IoOperations.read(filename);
  return data;
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

  // update current data
  const currentData = await IoOperations.read(filename);
  const key = Object.keys(currentData).find((name) => name === mfe.name);
  let newData: MfeInfo = {};

  if (key) {
    // update
    currentData[key] = {
      jsBundle,
      cssBundle,
    };
    newData = currentData;
  } else {
    // create
    newData = {
      ...currentData,
      ...mfeInfoItem,
    };
  }

  await IoOperations.save(filename, newData);

  return mfeInfoItem;
};

const remove = async (
  env: string,
  mfe: DeleteMfeDto,
): Promise<{} | ApiError> => {
  const filename = `${env}.json`;

  // update current data
  const currentData = await IoOperations.read(filename);
  const key = Object.keys(currentData).find((name) => name === mfe.name);
  if (key) {
    delete currentData[key];
    await IoOperations.save(filename, currentData);
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
  createOrUpdate,
  remove,
};
