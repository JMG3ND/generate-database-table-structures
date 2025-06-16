/**Esta función retorna una sentencia sql para leer todas las tablas disponibles en la base de datos actual */
function getQueryTableListFromDatabase() {
  return `
	SELECT TABLE_SCHEMA, TABLE_NAME
	FROM INFORMATION_SCHEMA.TABLES
	WHERE TABLE_CATALOG = DB_NAME(); -- Opcional: Para la base de datos actual
	`;
}

export { getQueryTableListFromDatabase };
