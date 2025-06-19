import { getSectionTablesFromViewDefinition } from "./getSectionTablesFromViewDefinition";
/**Obtiene los alias de cada tabla relacionada en la definición de la vista
 * @param definition String que contiene la definición de la vista
 * @throws Lanza un error si no encuentra tablas relacionadas en la definición
 */
function tablesWithAliasDefinition(definition: string) {
  const sectionTables = getSectionTablesFromViewDefinition(definition);

  // Separamos la sección mediante la clausula JOIN ya que por cada tabla habrá un JOIN
  // Obtendremos una celda por cada tabla que contenga la sección
  const sectionSepare = sectionTables.split(/ *JOIN */gi);

  // Extraemos el nombre de la tabla y su alias
  // En la definición de una vista seimpre estará separada por la letra ON el nombre de la tabla y la relación con las demás
  const listTableAlias = sectionSepare.map(
    (tableDefinition) =>
      tableDefinition
        .match(/([a-zA-Z]+\.)?[a-zA-Z]+( +AS +[a-zA-Z]+)?/)
        ?.at(0) || tableDefinition
  );

  // Una vez ya normalizado escribimos un objeto para cada TableAlias con las propiedades separadas
  const listTableAliasObject = listTableAlias.map((tableAlias) => {
    const [dboName, alias] = tableAlias.split(/ +AS +/);
    const tableName = dboName.split(".")[1];
    return {
      tableName: tableName || dboName,
      alias: alias || tableName || dboName,
    };
  });

  return listTableAliasObject;
}

export { tablesWithAliasDefinition };
