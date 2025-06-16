import { SQL } from "service-database-connect";
import { getQueryStructure } from "../../querys/getQueryStructure";
import { TableSchema } from "../../types";

/**Esta función obtiene de la base de datos la estrucura de la tabla que se le envíe por parámetro
 * - Si la conexión a la base de datos falla retorna undefined
 * @param tableName Es el nombre de la tabla a analizar
 * @returns Retrona un Array con todas las propiedades de la tabla o undefined si algo sale mal
 */
async function getTableStructure(tableName: string): Promise<TableSchema> {
  const sql = (await SQL.getInstance()).getPool();

  const response = await sql.query<TableSchema>(getQueryStructure(tableName));
  const { recordsets } = response;

  return recordsets as unknown as TableSchema;
}

export { getTableStructure };
