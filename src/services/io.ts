/* eslint-disable no-console */
import { access, constants, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { MfeInfo, MfeInfoSchema } from "../models/schema";

const fileFolder =
  path.resolve(path.join(__dirname, "..", "public")) + path.sep;

export class IoOperations {
  public static async save(file: string, content: MfeInfo): Promise<void> {
    try {
      writeFile(fileFolder + file, JSON.stringify(content, null, 2), "utf-8");
    } catch (writingFileError) {
      console.log(
        `Error writing file: "${fileFolder + file}"`,
        writingFileError,
      );
    }
  }

  public static async read(file: string): Promise<MfeInfo> {
    let rawResult: string = "";
    let result: MfeInfo = {};

    try {
      await access(fileFolder + file, constants.F_OK);
      rawResult = await readFile(fileFolder + file, "utf-8");
    } catch (missingFileError) {
      console.log(`Creating file "${fileFolder + file}"...`);
      IoOperations.save(file, {});
      return {};
    }

    try {
      result = JSON.parse(rawResult);
    } catch (parseError) {
      console.log(`Error parsing file "${fileFolder + file}"`, parseError);
    }

    try {
      result = MfeInfoSchema.parse(result);
    } catch (validationError) {
      console.log(`File schema is not expected!!!`);
    }

    return result;
  }
}
/* eslint-enable no-console */
