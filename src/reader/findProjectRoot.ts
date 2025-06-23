import fs from "fs/promises";
import path from "path";

async function findProjectRoot(currentDir = __dirname) {
  let dir = currentDir;
  // Bucle para subir directorios hasta encontrar package.json
  while (dir !== path.parse(dir).root) {
    // path.parse(dir).root es la raíz del sistema (ej. C:\ o /)
    const packageJsonPath = path.join(dir, "package.json");
    try {
      await fs.access(packageJsonPath); // Intenta acceder a package.json
      return dir; // Si existe, este es el directorio raíz del proyecto
    } catch (e) {
      // package.json no encontrado, subimos un nivel
      dir = path.dirname(dir);
    }
  }
  throw new Error(
    "No se pudo encontrar la raíz del proyecto (package.json no encontrado)."
  );
}

export { findProjectRoot };
