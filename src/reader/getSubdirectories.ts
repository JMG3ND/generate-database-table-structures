import { promises as fs } from "fs";
import * as path from "path";

/**
 * Representa una entrada de directorio con información de tipo.
 * Equivale a fs.Dirent, pero con tipos explícitos para .isDirectory().
 */
interface DirectoryEntry {
  name: string;
  isDirectory(): boolean;
  isFile(): boolean;
  isSymbolicLink(): boolean;
  // Puedes añadir más métodos si los necesitas, como isBlockDevice(), etc.
}

/**
 * Analiza recursivamente un directorio para extraer todas sus subcarpetas.
 * @param directoryPath La ruta del directorio a analizar.
 * @returns Una promesa que resuelve con un array de rutas completas de las subcarpetas.
 * @throws {Error} Si hay un error al leer el directorio
 */
async function getSubdirectories(directoryPath: string): Promise<string[][]> {
  let subdirectories: string[][] = [];

  try {
    // Usamos 'as unknown as DirectoryEntry[]' porque fs.Dirent tiene todos estos métodos.
    // TypeScript a veces necesita esta pequeña ayuda para reconocerlo directamente del readdir.
    const entries = (await fs.readdir(directoryPath, {
      withFileTypes: true,
    })) as unknown as DirectoryEntry[];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(directoryPath, entry.name);
        subdirectories.push([entry.name, fullPath]);

        // Llamada recursiva para explorar las subcarpetas anidadas
        const nestedSubdirectories = await getSubdirectories(fullPath);
        subdirectories = subdirectories.concat(nestedSubdirectories);
      }
    }
  } catch (error) {
    throw new Error(
      `Error al leer el directorio ${directoryPath}: ${
        error instanceof Error ? error.message : error
      }`
    );
  }

  return subdirectories;
}

export { getSubdirectories };
