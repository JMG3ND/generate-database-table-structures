import {
  getSubdirectories,
  findProjectRoot,
  readDirectoriesFiles,
} from "../reader";
import { metadata } from "../database";
import { writeJsonFile } from "../writers";

async function writeGeneratedFiles() {
  const { database } = metadata;
  const root = await findProjectRoot();
  const directorieRoots = await getSubdirectories(`${root}/${database}`);

  const dataDirectories = await Promise.all(
    directorieRoots.map(async (root) => {
      const [name, path] = root;
      const files = await readDirectoriesFiles(path);
      return files.length > 0
        ? {
            name,
            files,
          }
        : undefined;
    })
  );

  const delUndef = dataDirectories.filter((file) => file);

  await Promise.all(
    delUndef.map(async (file) => {
      if (metadata.database && file?.name && file.files) {
        const newObj = Object.fromEntries([[file.name, file.files]]);
        await writeJsonFile(metadata.database, file.name, newObj);
      }
    })
  );
}

export { writeGeneratedFiles };
