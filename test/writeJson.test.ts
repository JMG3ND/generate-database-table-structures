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
  const tableStructure = await getTableStructure(tableName);

  expect(tableStructure).not.toBeUndefined();

  // Si la estructura se obtuvo y existe
  if (tableStructure) {
    const centinel = await writeJsonTableStructure(
      tableStructure,
      outputDirectory
    );
    expect(centinel).toBeTruthy();
  }
});
