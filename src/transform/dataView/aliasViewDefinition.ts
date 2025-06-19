/**Obtiene los alias de cada tabla relacionada en la definición de la vista
 * @param definition String que contiene la definición de la vista
 */
function aliasViewDefinition(definition: string) {
  const tablesDefinition = definition
    .split(/FROM/gi)[1]
    .split(/WHERE/gi)[0]
    .trim();

  if (!tablesDefinition)
    throw new Error("No existen tablas relacionadas en la vista");

  const arrayTablesNotNormalize = tablesDefinition.split(/ *JOIN */gi);
  const arrayTablesNormalize = arrayTablesNotNormalize.map((tableName) =>
    tableName.trim()
  );

  const rowTableRelation = arrayTablesNormalize.map((tableName) => {
    const rowTableRelation = tableName.match(
      /[a-zA-Z]+\.[a-zA-Z]+ +AS +[a-zA-Z]+/g
    );
    if (!rowTableRelation) {
      const dboName = tableName.trim().split(/\./g);
      if (dboName.length > 1) return { tableName: dboName[1], alias: null };
      return { tableName: dboName[0], alias: null };
    }

    const [dbotableName, alias] = rowTableRelation[0].split(/ +AS +/);
    const tableNameExtract = dbotableName.split(".")[1];
    return {
      tableName: tableNameExtract,
      alias,
    };
  });

  return rowTableRelation;
}

export { aliasViewDefinition };
