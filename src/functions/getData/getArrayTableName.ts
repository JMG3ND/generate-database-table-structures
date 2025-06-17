import { SQL } from "service-database-connect";
import { getQueryTableListFromDatabase } from "../../querys/getQueryTableList";

export type TableList = {
  TABLE_SCHEMA: string;
  TABLE_NAME: string;
};

/**Función que retorna una lista de nombres existentes en la base de datos
 * @returns Retorna un array con la lista de tablas existentes en la base de datos
 * @throw Relanza un error si no puede obtener la lista de tablas para que se maneje desde afuera
 */
async function getArrayTableName() {
  try {
    const sql = (await SQL.getInstance()).getPool();

    const response = await sql.query<TableList>(
      getQueryTableListFromDatabase()
    );
    const { recordset } = response;

    const arrayTableName = recordset.map((v) => v.TABLE_NAME);
    return arrayTableName;
  } catch (error) {
    throw error;
  }
}

export { getArrayTableName };
