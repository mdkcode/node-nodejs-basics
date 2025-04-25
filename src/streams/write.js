import fs from "fs";

const fileName = new URL("./files/fileToWrite.txt", import.meta.url);

const write = async () => {
  try {
    const writer = await fs.createWriteStream(fileName);
    process.stdin.on("data", (data) => {
      console.log(`You typed ${data}`);
      writer.write(data);
      process.exit();
    });
  } catch (err) {
    throw err;
  }
};

await write();
