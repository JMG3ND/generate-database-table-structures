import fs from "fs/promises";
import path from "path";
import { findProjectRoot } from "./findProjectRoot";

const pathResolve = async (recivePath: string) =>
  path.resolve(await findProjectRoot(), recivePath);

async function readDirectoriesFiles(recivePath: string) {
  const files = await fs.readdir(await pathResolve(recivePath), {
    withFileTypes: true,
  });
  return files.filter((file) => file.isFile()).map((file) => file.name);
}

export { readDirectoriesFiles };
