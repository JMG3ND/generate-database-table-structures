import { columnsViewDefinition } from "./columnsViewDefinition";
import { tablesWithAliasDefinition } from "./tablesWithAliasDefinition";

/**Transforma la definición de una vista en un objeto js con la información de las columnas y tablas a las que hace referencia
 * - La definición de la vista es la sentencia que ejecuta SQL para crearla
 * @example "CREATE VIEW vNombreDeVista as SELECT * FROM NombreDeTabla WHERE..."
 * @param definition Es la definición de la vista
 */
function transformViewDefinition(definition: string) {
  const columnsDefinitions = columnsViewDefinition(definition);
  const tableWithAliasList = tablesWithAliasDefinition(definition);
  //const principalTable = tableWithAliasList[0];

  const response = tableWithAliasList.map((table) => {
    const columnsThisTable = columnsDefinitions
      .filter((column) => column.tableAlias === table.alias)
      .map((column) => column.columnName);
    return {
      table: table.tableName,
      columns: columnsThisTable,
    };
  });

  return response;
}

export { transformViewDefinition };
