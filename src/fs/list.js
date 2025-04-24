import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const originalFolder = resolve(__dirname, "files");

const list = async () => {
  fs.readdir(originalFolder, (err, files) => {
    if (err) {
      console.error("FS operation failed");
      return;
    }
    console.log("Files in the directory:");
    files.forEach((file) => {
      console.log(file);
    });
  });
};

await list();
