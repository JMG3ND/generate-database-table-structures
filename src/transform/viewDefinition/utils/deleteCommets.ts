/**Elimina los comentarios de la definiciones
 * @param definition array que contiene la definición de la vista
 */
function deleteCommets(definition: string[]) {
  const newDefinition = definition
    .map((row) => {
      // Detectamos si el registro tiene comentarios
      if (/--/g.test(row)) {
        const newRow = row.split(/--/g)[0].trim();
        return newRow ? newRow : undefined;
      }

      return row;
    })
    .filter((row) => !!row);

  return newDefinition as string[];
}

export { deleteCommets };
