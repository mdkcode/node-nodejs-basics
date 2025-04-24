import fs from "fs/promises";

const fileName = new URL("./files/wrongFilename.txt", import.meta.url);
const newFileName = new URL("./files/properFilename.md", import.meta.url);

const rename = async () => {
  try {
    await fs.rename(fileName, newFileName);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
