import { extractSections } from "./extractSections/extractSections";
import { analiceSections } from "./analiceSections/analiceSections";

export type definitionViewTransformed = {
  tableName: string;
  columns: Array<string>;
};

/**Transforma la definición de una vista en un objeto js con la información de las columnas y tablas a las que hace referencia
 * - La definición de la vista es la sentencia que ejecuta SQL para crearla
 * @example "CREATE VIEW vNombreDeVista as SELECT * FROM NombreDeTabla WHERE..."
 * @param definition Es la definición de la vista
 * @returns Retorna una cadena de texto que contiene solo la sección de las columnas
 */
async function transformViewDefinition(
  definition: string[]
): Promise<definitionViewTransformed> {
  const sectionsText = extractSections(definition);

  const analicis = analiceSections(sectionsText);
  console.log(analicis);
  return {
    tableName: "dEjemplo",
    columns: ["Identifier", "PackDate"],
  };
}

export { transformViewDefinition };
