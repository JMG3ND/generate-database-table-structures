const regDetectSELECT = /^ *SELECT */gi;
const regDetectFROM = /^ *FROM */gi;

/**Calcula de sección que contiene las columnas en la definición de la vista
 * @param {string[]} definition Es la definición de la vista a analizar
 * @returns Retorna una cadena de texto que contiene solo la sección donde se definen las columnas que muestra la vista
 * @throws Lanza un erro si la definición de vista proporcionada no contiene la sección de columnas
 */
function extractColumns(definition: string[]) {
  let detectSELECT = false;
  let detectFROM = false;
  const sectionColumns = definition.map((row) => {
    if (!detectSELECT) detectSELECT = regDetectSELECT.test(row);
    if (!detectFROM) detectFROM = regDetectFROM.test(row);
    return detectSELECT && !detectFROM ? row : undefined;
  });

  const sectionColumnsNormalize = sectionColumns.filter((row) => !!row);

  if (sectionColumnsNormalize.length === 0)
    throw new Error(
      "La definición de la vista no contiene columnas: \nDEFINICION: (" +
        definition +
        ")\nSECCIÓN COLUMNAS: (" +
        sectionColumns +
        ")"
    );

  const columnsText = sectionColumnsNormalize.reduce(
    (a, b) => (a ? a + b : b),
    ""
  ) as string;

  const extractSELECT = columnsText.replace(regDetectSELECT, "").trim();
  return extractSELECT;
}

export { extractColumns };
