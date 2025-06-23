import { runQuery } from "../controller";

type ResponseViewDefinition = {
  Text: string;
};

/**Obtiene la definición de la vista
 * @param viewName Nombre de la vista
 * @throw Relanza un error si no pudo ejecutar la sentencia
 */
async function getViewDefinition(viewName: string) {
  const query = `EXEC sp_helptext '${viewName}'`;

  try {
    const response = await runQuery<ResponseViewDefinition>(query);
    const { recordset } = response;
    return recordset.map((text) => text.Text.trim());
  } catch (error) {
    throw error;
  }
}

export { getViewDefinition };
