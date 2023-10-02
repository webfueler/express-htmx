import axios from "axios";

export class Manifest {
  public static loadManifest = async (
    mfeUrl: string,
  ): Promise<{ jsBundle: string; cssBundle?: string }> =>
    new Promise(async (resolve, reject) => {
      let manifest: Record<string, string> = {};

      try {
        manifest = (
          await axios.get<Record<string, string>>(mfeUrl + "/manifest.json", {
            timeout: 1000,
          })
        ).data;

        let jsBundle = "";
        let cssBundle: string | undefined = undefined;

        for (const file of Object.keys(manifest)) {
          if (file.endsWith(".js")) {
            jsBundle = mfeUrl + "/" + manifest[file];
          }
          if (file.endsWith(".css")) {
            cssBundle = mfeUrl + "/" + manifest[file];
          }
        }

        resolve({ jsBundle, cssBundle });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          reject(e.message);
        }

        if (e instanceof Error) {
          reject(e.message);
        }

        reject(String(e));
      }
    });
}
