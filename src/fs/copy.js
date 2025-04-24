import { constants } from "fs";
import { access, cp } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const originalFolder = resolve(__dirname, "files");
const copyFolder = resolve(__dirname, "files_copy");

const copy = async () => {
  try {
    try {
      await access(copyFolder, constants.F_OK);
      throw new Error("FS operation failed");
    } catch {
      throw new Error("FS operation failed");
    }
    await cp(originalFolder, copyFolder, { recursive: true });
  } catch (err) {
    throw err;
  }
};

await copy();
