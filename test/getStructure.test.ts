import { getTableStructure } from "../src/functions/getData/getStructure";
import { SQL } from "service-database-connect";

afterAll(async () => {
  await SQL.closeInstance();
});

test("Prueba de obtención de estructura de tabla", async () => {
  // Definimos un nombre de tabla ya existente
  const tableName = "dDefinedQuery";
  
  // Obtenermos la estructura de la función de obtención
  const structure = await getTableStructure(tableName);
  console.log(structure);
  expect(structure).not.toBeUndefined();
});
