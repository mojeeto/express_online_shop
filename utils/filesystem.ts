import path from "path";
import fs from "fs";
import { STORAGE_DATA_DIR } from "./static";

export type ReadFileCallback = (
  err: NodeJS.ErrnoException | null,
  data: Buffer
) => void;
export type WriteFileCallback = (err: NodeJS.ErrnoException | null) => void;

export const readFileFromStorage = (fileName: string, cb: ReadFileCallback) => {
  fs.readFile(path.join(STORAGE_DATA_DIR, fileName), cb);
};

export const writeFileFromStorage = (
  fileName: string,
  data: any,
  cb: WriteFileCallback
) => {
  fs.writeFile(path.join(STORAGE_DATA_DIR, fileName), data, cb);
};
