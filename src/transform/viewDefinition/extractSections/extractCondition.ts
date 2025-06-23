const regDetectWHERE = /^ *WHERE */gi;

/**Calcula de sección que contiene las condiciones en la definición de la vista
 * @param {string[]} definition Es la definición de la vista a analizar
 * @returns Retorna una cadena de texto que contiene solo la sección donde se definen las condiciones que muestra la vista
 */
function extractCondition(definition: string[]) {
  let detectWHERE = false;
  const sectionTables = definition.map((row) => {
    if (!detectWHERE) detectWHERE = regDetectWHERE.test(row);
    return detectWHERE ? row : undefined;
  });

  const sectionTablesNormalize = sectionTables.filter((row) => row);

  const tablesText = sectionTablesNormalize.reduce(
    (a, b) => (a ? a + b : b),
    ""
  );

  const extractFROM = tablesText?.replace(regDetectWHERE, "").trim();
  return extractFROM;
}

export { extractCondition };
