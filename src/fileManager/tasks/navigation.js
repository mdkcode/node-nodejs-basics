import path from "path";
import fsPromises from "fs/promises";

export function printCurrentDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

export function changeDirectory(targetPath) {
  try {
    const absolutePath = path.resolve(targetPath);
    process.chdir(absolutePath);
  } catch (err) {
    console.error(err.message);
  }
}

export function goUpperFromCurrentDirectory() {
  const currentDir = process.cwd();
  const rootDir = path.parse(currentDir).root;
  if (currentDir === rootDir) return;
  const parentDir = path.resolve(currentDir, "..");
  process.chdir(parentDir);
}

export async function listAllFilesAndFolders() {
  let list = [];
  const currentDir = process.cwd();
  try {
    const items = await fsPromises.readdir(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = await fsPromises.lstat(fullPath);
      if (item.startsWith(".")) continue;
      list.push({
        Name: item,
        Type: stat.isDirectory() ? "Directory" : "File",
      });
    }
    list = list.sort((a, b) => {
      if (a.Type === "Directory" && b.Type === "File") return -1;
      if (a.Type === "File" && b.Type === "Directory") return 1;
      return 0;
    });
    console.table(list);
  } catch (err) {
    console.error(err.message);
  }
}
