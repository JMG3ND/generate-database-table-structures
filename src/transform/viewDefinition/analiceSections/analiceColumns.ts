/**Función que genera un objeto analizando las definiciones de las cadenas de texto proporcionada
 * @param columnDefinition Definición de solo las columnas de una definición de vista
 * @returns Retorna un arreglo que coloca el nombre de la columna y su alias
 * @example { column: "identifier", alias: "s" }
 * @throws Lanza una excepción el objeto generadoa está vacío
 */
function analiceColumns(columnDefinition: string) {
  const arrayColumnDefinition = columnDefinition
    .split(",") // Separamos las columnas
    .map((row) => row.replaceAll(getExeptionCharacters(), "").trim()) // Normalizamos los registros quitandole los espacios y guiones
    .map((row) => row.split(/\d *\d/gi)) // Separamos en caso de que hayan combinados
    .flat();

  const aliasWithColumn = arrayColumnDefinition.map(
    (columnDefinition) => columnDefinition.split(".").reverse() // Separamos el alias del nomrbe de la columna
  );

  const formatStructure = aliasWithColumn.map((arrDefinition) => ({
    column: arrDefinition[0] || arrDefinition[1],
    tableAlias: (arrDefinition[0] && arrDefinition[1]) || null,
  }));

  // Validamos la información
  const validate = formatStructure.some((structure) => !!structure.column);
  if (!validate)
    throw new Error(
      "Error al analizar la definición de las columnas: \n" +
        arrayColumnDefinition.join("\n") +
        "\n" +
        JSON.stringify(formatStructure)
    );

  return formatStructure;
}

/**@returns Retorna una expresión regular con caracteres que se quieren obviar en el análisis de las columnas */
function getExeptionCharacters() {
  const characters = ["--"]; // Añadir caracteres para reemplazar en caso de ser necesario
  const regExp = new RegExp(characters.join("|"), "g");
  return regExp;
}

export { analiceColumns };
