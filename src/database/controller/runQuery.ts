import { SQL } from "service-database-connect";
import { IResult } from "service-database-connect/node_modules/@types/mssql";

/**Esta función ejecuta la consulta según el controlador de conexión a sql server
 * @param query - Consulta sql
 * @returns Retorna una promesa que resuelve el resultado de la consulta sql
 * @throws Relanza un error para ser manejado en orden superior
 */
async function runQuery<T extends any>(query: string): Promise<IResult<T>> {
  try {
    const sql = (await SQL.getInstance()).getPool();
    const response = await sql.query<T>(query);
    return response;
  } catch (error) {
    throw error;
  }
}

export { runQuery };
