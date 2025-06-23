/**- Esta función retorna una expresión regular para detectar los separadores de tabla.
 * - Se usa para detectar los separadores de tabla.
 */
function getRegExpTableJoin() {
  const listOfUnionNames = [
    "JOIN",
    "INNER JOIN",
    "LEFT JOIN",
    "LEFT OUTER JOIN",
    "RIGHT JOIN",
    "RIGHT OUTER JOIN",
    "FULL JOIN",
    "FULL OUTER JOIN",
    "CROSS JOIN",
    "SELF JOIN",
  ];

  return new RegExp(listOfUnionNames.join("|"), "gi");
}

/**Expresión regular que contiene todas las definiciones de uniones de tablas.
 * @example
 * ["JOIN", "INNER JOIN", "LEFT JOIN", ...]
 */
const regExpTableJoin = getRegExpTableJoin();

export { regExpTableJoin };
