/**Extrae un array con el nombre de la columna y a cuál alias de tabla corresponde
 * @param definition String que contiene la definición de la vista
 * @throws Arroja un error si la definición de la vista no contiene columnas
 */
function columnsViewDefinition(definition: string) {
  const stringColumns = definition.split(/SELECT|FROM/gi)[1];
  const arrayNameColumns = stringColumns.match(/[a-zA-Z]+\.[a-zA-Z]+/g);

  if (!arrayNameColumns)
    throw new Error("La definición de la vista no contiene columnas");

  const columnsViewDefinition = arrayNameColumns.map((columns) => {
    const separeTableAlias = columns.split(".");
    return {
      columnName: separeTableAlias[1],
      tableAlias: separeTableAlias[0],
    };
  });

  return columnsViewDefinition;
}

export { columnsViewDefinition };
