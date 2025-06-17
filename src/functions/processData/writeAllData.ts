import { getArrayTableName } from "../getData/getArrayTableName";
import { getTableStructure } from "../getData/getStructure";
import { writeJsonTableStructure } from "./writeJson";

/**Función que lee la base de datos definidas en las variables de entorno y genera archivos json
 * - Los archivos son generados en la carpeta structure
 * - Los archivos son de tipo json
 */
async function writeAllData(path = "structures") {
  try {
    // Primero obtengo la lista de tablas
    const tableNameList = await getArrayTableName();

    // Recorremos la lista p[ara obtener las estructuras y escribir un archivo por tabla
    const arrayPromisesWriting = tableNameList.map(async (name) => {
      // Obtenemos la estructura de la tabla
      const structure = await getTableStructure(name);
      return writeJsonTableStructure(structure, path);
    });

    const booleanArray = await Promise.all(arrayPromisesWriting);
    const validateBooleanArray = booleanArray.every((res) => res);
    return validateBooleanArray;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { writeAllData };
