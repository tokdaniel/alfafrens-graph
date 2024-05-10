import TE from "fp-ts/TaskEither";
import fs from "fs/promises";

export const writeFile = (path: string, data: string): TE.TaskEither<Error, void> => {
    return TE.tryCatch(
      () => fs.writeFile(path, data),
      (reason) => new Error(`Failed to write to file: ${String(reason)}`)
    );
  };