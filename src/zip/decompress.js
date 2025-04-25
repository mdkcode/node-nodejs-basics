import { createUnzip } from "zlib";
import { pipeline } from "stream";
import { createReadStream, createWriteStream, unlink } from "fs";

const decompressedFile = new URL("./files/fileToCompress.txt", import.meta.url);
const archive = new URL("./files/archive.gz", import.meta.url);

const decompress = async () => {
  const unzip = createUnzip();
  const source = createReadStream(archive);
  const destination = createWriteStream(decompressedFile);
  pipeline(source, unzip, destination, (err) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    unlink(archive, (unlinkErr) => {
      if (unlinkErr) {
        throw unlinkErr;
      }
    });
  });
};

await decompress();
