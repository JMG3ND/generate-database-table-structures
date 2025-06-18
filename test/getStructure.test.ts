import {
  getTableMetadata,
  getArrayTableName,
} from "../src/database";

test("Prueba de obtención de estructura de tabla", async () => {
  // Extraemos un nombre de tabla de la base de datos
  const tableName = (await getArrayTableName())[0];
  const isString = typeof tableName === "string";
  expect(isString).toBeTruthy();

  // Obtenermos la estructura de la función de obtención
  const structure = await getTableMetadata(tableName);
  console.log(structure);
  expect(structure).not.toBeUndefined();
});
