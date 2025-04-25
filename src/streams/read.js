import fs from "fs";

const fileName = new URL("./files/fileToRead.txt", import.meta.url);

const read = async () => {
  try {
    const reader = fs.createReadStream(fileName);
    let res = "";
    for await (const chunk of reader) {
      res += chunk;
    }
    process.stdout.write(res);
  } catch (err) {
    throw err;
  }
};

await read();
