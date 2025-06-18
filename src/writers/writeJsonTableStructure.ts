import { TableSchema, TableMetadata } from "../types";
import { writeJsonFile } from "./writeJsonFile";

/**
 * Escribe un objeto JavaScript en un archivo JSON, organizándolo en una estructura de carpetas
 * basada en el tipo y nombre de la tabla.
 *
 * @param {TableSchema} data Un array de arrays que contiene el objeto a serializar. Se espera que el primer
 * elemento (data[0][0]) contenga las propiedades `Name` y `Type` de la tabla.
 * @param {string} basePath La ruta base donde se crearán las carpetas y el archivo JSON.
 * @returns Una promesa que resuelve a `true` si el archivo se escribió correctamente.
 * @throws Error si el objeto no contiene las propiedades `Name` o `Type` requeridas,
 * o si ocurre algún error durante la operación de archivo.
 */
async function writeJsonTableStructure(
  data: TableSchema,
  basePath: string
): Promise<boolean> {
  // Validamos que el objeto de datos tenga la estructura esperada y extraemos los metadatos.
  if (
    !data ||
    !Array.isArray(data) ||
    !data[0] ||
    !Array.isArray(data[0]) ||
    !data[0][0]
  ) {
    throw new Error("La estructura de datos proporcionada no es válida.");
  }

  const metadata: TableMetadata = data[0][0];

  // Validamos la presencia de las propiedades esenciales 'Name' y 'Type'.
  if (typeof metadata.Name !== "string" || metadata.Name.trim() === "") {
    throw new Error(
      "El objeto de metadatos no contiene un 'Name' de tabla válido."
    );
  }
  if (typeof metadata.Type !== "string" || metadata.Type.trim() === "") {
    throw new Error(
      "El objeto de metadatos no contiene un 'Type' de tabla válido."
    );
  }

  const fileName = metadata.Name;
  const folderPath = getOutputPathsfromTypeTable(
    metadata.Type,
    basePath,
    fileName
  );

  try {
    await writeJsonFile(folderPath, fileName, data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getOutputPathsfromTypeTable(
  type: string,
  basePath: string,
  fileName: string
): string {
  // Normalizamos el tipo para usarlo en el nombre de la carpeta, reemplazando espacios por guiones bajos.
  const normalizedType = type.replace(/\s+/g, "_");
  let typeTable = null;

  // si el tipo es una tabla de usuario lo separamos
  if (normalizedType === "user_table") {
    // Extraemos el primer caracter del nombre
    const firstCharacter = fileName.charAt(0);
    switch (firstCharacter) {
      case "d":
        typeTable = "data";
        break;
      case "h":
        typeTable = "history";
        break;
      default:
        typeTable = "other";
    }
  }

  // Construimos las rutas de la carpeta y el archivo.
  const folderPath = `${basePath}/${normalizedType}${
    typeTable ? `/${typeTable}` : ""
  }`;

  return folderPath;
}

export { writeJsonTableStructure };
