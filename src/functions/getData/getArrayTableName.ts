import { SQL } from "service-database-connect";
import { getQueryTableListFromDatabase } from "../../querys/getQueryTableList";

export type TableList = {
  TABLE_SCHEMA: string;
  TABLE_NAME: string;
};

/**Función que retorna una lista de nombres existentes en la base de datos
 * - Retorna undefined si hubo un problema en la conexión de la base de datos
 * @returns undefined | arrayTableName[]
 */
async function getArrayTableName() {
  const sql = (await SQL.getInstance()).getPool();

  const response = await sql.query<TableList>(getQueryTableListFromDatabase());
  const { recordset } = response;

  const arrayTableName = recordset.map((v) => v.TABLE_NAME);
  return arrayTableName;
}

export { getArrayTableName };
