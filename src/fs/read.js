import fs from "fs";

const fileName = new URL("./files/fileToRead.txt", import.meta.url);

const read = async () => {
  fs.readFile(fileName, { encoding: "utf-8" }, function (err, data) {
    if (!err) {
      console.log(data);
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await read();
