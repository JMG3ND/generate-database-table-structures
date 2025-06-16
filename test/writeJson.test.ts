import { writeJsonTableStructure } from "../src/functions/processData/writeJson";
import { getTableStructure } from "../src/functions/getData/getStructure";
import { SQL } from "service-database-connect";

afterAll(async () => {
  await SQL.closeInstance();
});

test("Prueba para comprobar la funcionalidad de creación de archivo json", async () => {
  // Definimos el nombre de la tabla
  const tableName = "dDefinedQuery";
  const outputDirectory = "outputTest/WriteJsonTest";

  // Obtenemos la estructura de la base de datos
  const structure = await getTableStructure(tableName);

  expect(structure).not.toBeUndefined();

  // Si la estructura se obtuvo y existe
  if (structure) {
    const centinel = await writeJsonTableStructure(structure, outputDirectory);
    expect(centinel).toBeTruthy();
  }
});
