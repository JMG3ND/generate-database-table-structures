import { getSubdirectories } from "../../src/reader";
import { findProjectRoot } from "../../src/reader";
import { metadata } from "../../src/database";

test("Prueba de lectura de los archivos del directorio", async () => {
  const projectRoot = await findProjectRoot();
  const roots = await getSubdirectories(`${projectRoot}/${metadata.database}`);
  console.log(roots);
});
