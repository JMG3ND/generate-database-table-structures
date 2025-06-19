import { transformViewDefinition } from "../src/transform";
import { getViewDefinition } from "../src/database";

test("Prueba de transformación de definición de vista", async () => {
  try {
    const viewDefinition = (await getViewDefinition("vStockInfo"))[0];
    transformViewDefinition(viewDefinition.ViewDefinition);
  } catch (error) {
    console.error(error);
    fail(error);
  }
});
