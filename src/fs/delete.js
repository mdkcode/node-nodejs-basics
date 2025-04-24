import { unlink } from "fs/promises";

const fileName = new URL("./files/fileToRemove.txt", import.meta.url);

const remove = async () => {
  try {
    await unlink(fileName);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await remove();
