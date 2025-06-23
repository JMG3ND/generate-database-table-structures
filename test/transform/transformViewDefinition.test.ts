import { getArrayTableName, getViewDefinition } from "../../src/database";
import { transformViewDefinition } from "../../src/transform";

test("Prueba de transformación de definición de vista", async () => {
  try {
    const arrayTableName = await getArrayTableName();
    const arrayViewName = arrayTableName.filter(
      (tableName) => tableName.at(0) === "v"
    );

    const arrayViewDefinition = await Promise.all(
      arrayViewName.map((viewName) => {
        return getViewDefinition(viewName);
      })
    );

    const arrayDefinitionTransformed = await Promise.all(
      arrayViewDefinition.map((viewDefinition) => {
        return transformViewDefinition(viewDefinition);
      })
    );
    arrayDefinitionTransformed
    //console.log(arrayDefinitionTransformed);
  } catch (error) {
    console.error(error);
    fail(error);
  }
});
