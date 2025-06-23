import { writeJsonTableStructure } from "../../src/writers";
import { getArrayTableName, getTableMetadata} from "../../src/database";

test("Prueba para comprobar la funcionalidad de creación de archivo json", async () => {
  // Definimos el nombre de la tabla
  const tableName = (await getArrayTableName())[0];
  const outputDirectory = "outputTest/WriteJsonTest";

  // Obtenemos la estructura de la base de datos
  const tableStructure = await getTableMetadata(tableName);

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
