import fs from "fs";

const fileName = new URL("./files/fresh.txt", import.meta.url);
const fileContent = "I am fresh and young";

const create = async () => {
  fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err && err.code === "ENOENT") {
      fs.writeFile(fileName, fileContent, (err) => err && console.error(err));
    } else throw new Error("FS operation failed");
  });
};

await create();
