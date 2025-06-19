import { transformViewDefinition } from "../src/transform";
import { getViewDefinition } from "../src/database";

test("Prueba de transformación de definición de vista", async () => {
  try {
    const viewDefinition = (await getViewDefinition("vStockInfo"))[0];
    const viewDefinitionTransformer = transformViewDefinition(
      viewDefinition.ViewDefinition
    );
    console.log(viewDefinitionTransformer);
  } catch (error) {
    console.error(error);
    fail(error);
  }
});
