import { Transform } from "stream";

const transform = async () => {
  try {
    const reverseTranform = new Transform({
      transform(chunk, encoding, callback) {
        this.push(chunk.toString().split("").reverse().join(""));
        process.exit();
        callback();
      },
    });
    process.stdin.pipe(reverseTranform).pipe(process.stdout);
  } catch (err) {
    throw err;
  }
};

await transform();
