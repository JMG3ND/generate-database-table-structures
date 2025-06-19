import { columnsViewDefinition } from "./columnsViewDefinition";
import { aliasViewDefinition } from "./aliasViewDefinition";

function transformViewDefinition(definition: string) {
  const columnsDefinitions = columnsViewDefinition(definition);
  const aliasViewDefinitions = aliasViewDefinition(definition);
  console.log(aliasViewDefinitions);
  return columnsDefinitions;
}

export { transformViewDefinition };
