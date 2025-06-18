import fs from "fs/promises";

/**Esta función se encarga de escribir un archivo json
 * @param folderPath - Ruta del directorio final
 * @param fileName - Nombre del archivo sin extensión
 * @param data - Información transformada a json
 * @trow Propaga un error si no se pudo escribir el arhcivo JSON
 */
async function writeJsonFile(
  folderPath: string,
  fileName: string,
  data: Array<any> | Record<string, any>
) {
  const filePath = `${folderPath}/${fileName}.json`;
  const jsonData = JSON.stringify(data);

  try {
    // Aseguramos que el directorio exista, creándolo recursivamente si es necesario.
    await fs.mkdir(folderPath, { recursive: true });

    // Escribimos la cadena JSON en el archivo.
    await fs.writeFile(filePath, jsonData);
  } catch (error: unknown) {
    // Capturamos cualquier error y lanzamos uno más descriptivo.
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Error al escribir el archivo JSON '${filePath}': ${errorMessage}`
    );
  }
}

export { writeJsonFile };
