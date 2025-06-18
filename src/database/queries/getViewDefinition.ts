import { runQuery } from "../controller";

type ResponseViewDefinition = {
  ViewName: string;
  ViewDefinition: string;
};

/**Obtiene la definición de la vista
 * @param viewName Nombre de la vista
 * @throw Relanza un error si no pudo ejecutar la sentencia
 */
async function getViewDefinition(viewName: string) {
  const query = `
		SELECT
    OBJECT_NAME(sm.object_id) AS ViewName,
    OBJECT_DEFINITION(sm.object_id) AS ViewDefinition
		FROM
				sys.sql_modules AS sm
		INNER JOIN
				sys.objects AS o ON sm.object_id = o.object_id
		WHERE
				o.type = 'V' -- 'V' para Vistas
				AND OBJECT_NAME(sm.object_id) = '${viewName}';
	`;

  try {
    const response = await runQuery<ResponseViewDefinition>(query);
    const { recordset } = response;
    return recordset;
  } catch (error) {
    throw error;
  }
}

export { getViewDefinition };
