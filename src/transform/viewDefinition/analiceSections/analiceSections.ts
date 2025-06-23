import { analiceColumns } from "./analiceColumns";
import { tableAnalize } from "./tableAnalize";
import type { Sections } from "types/transform";

/**Función que analiza todas las secciones y las retorna en un objeto */
function analiceSections({ columnSectionText, tablesSectionText }: Sections) {
  const columnsAnalized = analiceColumns(columnSectionText);
  const tableAnalized = tableAnalize(tablesSectionText);

  const response = tableAnalized.map((table) => {
    const columns = columnsAnalized
      .filter((column) => column.tableAlias === table.alias)
      .map((column) => column.column);
    return {
      tableName: table.tableName,
      columns: columns,
    };
  });

  return response;
}

export { analiceSections };
