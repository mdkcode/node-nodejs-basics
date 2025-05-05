import fs from "fs";
import path from "path";
import fsPromises from "fs/promises";

export function readFileStream(filePath) {
  const fullPath = path.resolve(filePath);
  const stream = fs.createReadStream(fullPath, { encoding: "utf-8" });
  stream.on("error", (err) => {
    console.error(err.message);
  });
  stream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
  stream.on("end", () => {
    console.log("\n");
  });
}

export async function createNewFile(fileName) {
  const fullPath = path.resolve(process.cwd(), fileName);
  try {
    await fsPromises.writeFile(fullPath, "");
    console.log(`File "${fileName}" created.`);
  } catch (err) {
    console.error(err.message);
  }
}

export async function createDirectory(dirName) {
  const fullPath = path.resolve(process.cwd(), dirName);
  try {
    await fsPromises.mkdir(fullPath);
    console.log(`Directory "${dirName}" created.`);
  } catch (err) {
    console.error(err.message);
  }
}

export async function renameFile(filePath, newFileName) {
  try {
    const oldPath = path.resolve(filePath);
    const dir = path.dirname(oldPath);
    const newPath = path.join(dir, newFileName);
    await fsPromises.rename(oldPath, newPath);
    console.log(`File renamed to "${newFileName}".`);
  } catch (err) {
    console.error(err.message);
  }
}

export async function copyFile(sourcePath, destDir) {
  const sourceFullPath = path.resolve(sourcePath);
  const fileName = path.basename(sourceFullPath);
  const destFullPath = path.join(path.resolve(destDir), fileName);
  return new Promise((resolve, reject) => {
    const readable = fs.createReadStream(sourceFullPath);
    const writable = fs.createWriteStream(destFullPath);
    readable.on("error", reject);
    writable.on("error", reject);
    writable.on("finish", () => {
      console.log(`File copied to ${destDir}`);
      resolve();
    });
    readable.pipe(writable);
  });
}

export async function moveFile(sourcePath, destDir) {
  try {
    await copyFile(sourcePath, destDir);
    await fsPromises.unlink(path.resolve(sourcePath));
    console.log(`File moved to ${destDir}`);
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteFile(filePath) {
  try {
    await fsPromises.unlink(path.resolve(filePath));
    console.log(`File "${filePath}" deleted.`);
  } catch (err) {
    console.error(err.message);
  }
}
