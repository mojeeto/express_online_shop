import { join } from "path";

export const PROJECT_DIR = require.main!.path;
export const STORAGE_DATA_DIR = join(PROJECT_DIR, "data");
