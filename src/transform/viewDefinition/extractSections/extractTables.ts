const regDetectFROM = /^(SELECT *\*)? *FROM */gi;
const regDetectWHERE = /^ *WHERE */gi;

/**Calcula de sección que contiene las tablas en la definición de la vista
 * @param {string[]} definition Es la definición de la vista a analizar
 * @returns Retorna una cadena de texto que contiene solo la sección donde se definen las tablas que muestra la vista
 * @throws Lanza un error si la definición de vista proporcionada no contiene la sección de tablas
 */
function extractTables(definition: string[]) {
  let detectFROM = false;
  let detectWHERE = false;
  const sectionTables = definition.map((row) => {
    if (!detectFROM) detectFROM = regDetectFROM.test(row);
    if (!detectWHERE) detectWHERE = regDetectWHERE.test(row);

    return detectFROM && !detectWHERE ? row : undefined;
  });

  const sectionTablesNormalize = sectionTables.filter((row) => row);

  if (sectionTablesNormalize.length === 0)
    throw new Error(
      "La definición de la vista no contiene tablas: \nDEFINICION: (" +
        definition.join("\n") +
        ")\nSECCIÓN TABLAS: (" +
        sectionTables +
        ")"
    );

  const tablesText = sectionTablesNormalize.reduce(
    (a, b) => (a ? a + b : b),
    ""
  ) as string;

  const extractFROM = tablesText.replace(regDetectFROM, "").trim();
  return extractFROM;
}

export { extractTables };
