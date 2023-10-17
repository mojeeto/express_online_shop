import path from "path";
import fs from "fs";
import { STORAGE_DATA_DIR } from "./static";

export const readFile = (path: string, cb: Function) => {
  fs.readFile(path, (err, data) => {
    if (err) throw new Error(err.message);
    cb(data);
  });
};

export const readFileFromStorage = (fileName: string, cb: Function) => {
  readFile(path.join(STORAGE_DATA_DIR, fileName), cb);
};

export const writeFile = (path: string, data: any, cb: Function) => {
  fs.writeFile(path, data, (err) => {
    cb(err);
  });
};

export const writeFileFromStorage = (
  fileName: string,
  data: any,
  cb: Function
) => {
  writeFile(path.join(STORAGE_DATA_DIR, fileName), data, cb);
};
