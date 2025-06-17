import { SQL } from "service-database-connect";
import { getQueryStructure } from "../../querys/getQueryStructure";
import { TableSchema } from "../../types";

/**Esta función obtiene de la base de datos la estrucura de la tabla que se le envíe por parámetro
 * @param {string} tableName Es el nombre de la tabla a analizar
 * @returns Retrona un Array con todos los metadatos de la tabla
 * @throws Lanza un error si algo sale mal en la obtención de los datos
 */
async function getTableStructure(tableName: string): Promise<TableSchema> {
  try {
    const sql = (await SQL.getInstance()).getPool();

    const response = await sql.query<TableSchema>(getQueryStructure(tableName));
    const { recordsets } = response;

    return recordsets as unknown as TableSchema;
  } catch (error) {
    throw error;
  }
}

export { getTableStructure };
