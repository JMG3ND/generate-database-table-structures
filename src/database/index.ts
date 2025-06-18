import { getTableMetadata } from "./queries/getTableMetadata";
import { getArrayTableName } from "./queries/getArrayTableName";
import { runQuery } from "./controller/runQuery";
import { closeConnection } from "./controller/closeConnection";

export { getTableMetadata, getArrayTableName, runQuery, closeConnection };
