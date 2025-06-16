import fs from "fs/promises";
import { TableSchema, TableMetadata } from "../../types";

/**
 * Escribe un objeto JavaScript en un archivo JSON, organizándolo en una estructura de carpetas
 * basada en el tipo y nombre de la tabla.
 *
 * @param data Un array de arrays que contiene el objeto a serializar. Se espera que el primer
 * elemento (data[0][0]) contenga las propiedades `Name` y `Type` de la tabla.
 * @param basePath La ruta base donde se crearán las carpetas y el archivo JSON.
 * @returns Una promesa que resuelve a `true` si el archivo se escribió correctamente.
 * @throws Error si el objeto no contiene las propiedades `Name` o `Type` requeridas,
 * o si ocurre algún error durante la operación de archivo.
 */
async function writeJsonTableStructure(
  data: TableSchema,
  basePath: string
): Promise<boolean> {
  // Validamos que el objeto de datos tenga la estructura esperada y extraemos los metadatos.
  if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0]) || !data[0][0]) {
    throw new Error("La estructura de datos proporcionada no es válida.");
  }

  const metadata: TableMetadata = data[0][0];

  // Validamos la presencia de las propiedades esenciales 'Name' y 'Type'.
  if (typeof metadata.Name !== "string" || metadata.Name.trim() === "") {
    throw new Error("El objeto de metadatos no contiene un 'Name' de tabla válido.");
  }
  if (typeof metadata.Type !== "string" || metadata.Type.trim() === "") {
    throw new Error("El objeto de metadatos no contiene un 'Type' de tabla válido.");
  }

  // Normalizamos el tipo para usarlo en el nombre de la carpeta, reemplazando espacios por guiones bajos.
  const normalizedType = metadata.Type.replace(/\s+/g, "_");

  // Construimos las rutas de la carpeta y el archivo.
  const folderPath = `${basePath}/${normalizedType}`;
  const filePath = `${folderPath}/${metadata.Name}.json`;

  try {
    // Aseguramos que el directorio exista, creándolo recursivamente si es necesario.
    await fs.mkdir(folderPath, { recursive: true });

    // Convertimos el objeto completo a una cadena JSON.
    const jsonData = JSON.stringify(data, null, 2); // El 'null, 2' formatea el JSON para mayor legibilidad.

    // Escribimos la cadena JSON en el archivo.
    await fs.writeFile(filePath, jsonData);

    return true;
  } catch (error: unknown) {
    // Capturamos cualquier error y lanzamos uno más descriptivo.
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error al escribir el archivo JSON '${filePath}': ${errorMessage}`);
  }
}

export { writeJsonTableStructure };