import * as IO from "fp-ts/IO";

export const log =
  (output: string): IO.IO<void> =>
  () => {
    const clearLine = "\r" + " ".repeat(200) + "\r"; // Adjust the length as needed
    process.stdout.write(`\r${clearLine}${output}`);
  };
