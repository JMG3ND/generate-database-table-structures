import { extractColumns } from "./extractColumns";
import { extractTables } from "./extractTables";
import { extractCondition } from "./extractCondition";
import { deleteCommets } from "../utils/deleteCommets";
import type { Sections } from "types/transform";

/**Extrael las secciones de la definición de una vista
 * @param definition Es la definición de la vista.
 * @throws Lanza un error si la definición de la vista no contiene la clausula FROM
 */
function extractSections(definition: string[]): Sections {
  try {
    const definitionWithoutComments = deleteCommets(definition);
    const columnSectionText = extractColumns(definitionWithoutComments);
    const tablesSectionText = extractTables(definitionWithoutComments);
    const conditionSectionText = extractCondition(definitionWithoutComments);

    return { columnSectionText, tablesSectionText, conditionSectionText };
  } catch (error) {
    throw error;
  }
}

export { extractSections };
