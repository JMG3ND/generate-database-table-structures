import { readDirectoriesFiles } from "../../src/reader";
import { metadata } from "../../src/database";

test("Prueba de lectura de los archivos del directorio", async () => {
  const files = await readDirectoriesFiles(`${metadata.database}/view`);
  const isArray = Array.isArray(files);
  expect(isArray).toBeTruthy();

  if (isArray) {
    const validateString = files.every((file) => typeof file === "string");
    expect(validateString).toBeTruthy();
  }
});
