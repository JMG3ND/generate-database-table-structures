import { regExpTableJoin } from "../../../composables";

const detectON = / +ON +/gi;

function tableAnalize(tablesDefinition: string) {
  const arrayDefinition = tablesDefinition.split(regExpTableJoin);
  const onlyTable = arrayDefinition.map((row) => row.split(detectON)[0].trim());
  const tableWithAlias = onlyTable.map((table) => {
    const [tableName, alias] = table.split(/ +AS +| +/gi);
    const normalizedTableName = tableName.replaceAll("dbo.", "");
    return {
      tableName: normalizedTableName,
      alias: alias || normalizedTableName,
    };
  });

  return tableWithAlias;
}

export { tableAnalize };
