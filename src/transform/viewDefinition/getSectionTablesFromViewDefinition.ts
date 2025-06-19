/**Extrael la sección que contiene las tablas dentro de una definición de vista
 * @param definition Es la definición de la vista.
 * @throws Lanza un error si la definición de la vista no contiene la clausula FROM
 */
function getSectionTablesFromViewDefinition(definition: string): string {
  // La sección donde aparecen las tablas en una definición de vista está siempre después del FROM y antes del WHERE si existe
  const afterFROM = definition.split(/FROM/ig)[1];

  // Si afterFROM no contiene nada es porque la definición no traía la clausalo FROM por lo cuál está incorrecto
  // Así que hacemos una comprobación y lanzamos un error si está vacío
  if (!afterFROM)
    throw new Error("La definición de la vista no contiene la clausula FROM");

  // Ahora vamos a eliminar lo que haya después de la clausula WHERE en caso de que exista
  const beforeWHERE = afterFROM.split(/WHERE/ig)[0];

  // Como estamos seleccionando la casilla 0 del array estamos seguros de que beforeWHERE siempre contendrá algo
  // Necesitamos quitar los espacios vacíos que hayan dentro de la sección de tablas
  const sectionTables = beforeWHERE.trim();

  return sectionTables;
}

export { getSectionTablesFromViewDefinition }