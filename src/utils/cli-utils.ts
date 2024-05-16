import * as IO from "fp-ts/IO";

export const logProgress =
  (current: number, total: number): IO.IO<void> =>
  () => {
    const percentage = ((current / total) * 100).toFixed(2);
    process.stdout.write(`Progress: ${percentage}%\r`);
  };
