import { getArrayTableName, getTableMetadata } from "database";
import { writeJsonTableStructure } from "../writers/writeJsonTableStructure";
import { writeJsonFile } from "../writers/writeJsonFile";

/**Función que lee la base de datos definidas en las variables de entorno y genera archivos json
 * - Los archivos son generados en la carpeta structure
 * - Los archivos son de tipo json
 */
async function writeAllData(path = "structures") {
  try {
    // Primero obtengo la lista de tablas
    const tableNameList = await getArrayTableName();
    const tablesErrors: Array<any> = [];

    // Recorremos la lista para obtener las estructuras y escribir un archivo por tabla
    const arrayPromisesWriting = tableNameList.map(async (name) => {
      // Obtenemos la estructura de la tabla
      try {
        const structure = await getTableMetadata(name);
        return writeJsonTableStructure(structure, path);
      } catch (error) {
        tablesErrors.push({
          tableName: name,
          error: error,
        });
        return true;
      }
    });
    
    if (tablesErrors.length > 0) {
      await writeJsonFile("errorlogs", "onWriteStructureError", tablesErrors);
    }

    const booleanArray = await Promise.all(arrayPromisesWriting);
    const validateBooleanArray = booleanArray.every((res) => res);
    return validateBooleanArray;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { writeAllData };
