function getQueryStructure(tableName: string) {
  return `EXEC sp_help '${tableName}'`;
}

export { getQueryStructure };
