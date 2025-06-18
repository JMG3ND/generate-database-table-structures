import { runQuery } from "../controller/runQuery";

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
    const response = await runQuery<TableList>(getQueryTableListFromDatabase());
    const { recordset } = response;

    const arrayTableName = recordset.map((v) => v.TABLE_NAME);
    return arrayTableName;
  } catch (error) {
    throw error;
  }
}

/**Esta función retorna una sentencia sql para leer todas las tablas disponibles en la base de datos actual */
function getQueryTableListFromDatabase() {
  return `
	SELECT TABLE_SCHEMA, TABLE_NAME
	FROM INFORMATION_SCHEMA.TABLES
	WHERE TABLE_CATALOG = DB_NAME(); -- Opcional: Para la base de datos actual
	`;
}

export { getArrayTableName };
