import { getViewDefinition, getArrayTableName } from "../src/database";

test("Obtención de la definición de una vista", async () => {
  try {
    const arrayTableName = await getArrayTableName();
    // Comprobamos el prefijo de las tablas obtenidas para retornar la primeravista encontrada
    const viewName = arrayTableName.find(
      (viewName) => viewName.charAt(0) === "v"
    );
    if (!viewName) throw new Error("No existen vistas en la base de datos");
    const ViewDefinition = await getViewDefinition(viewName);
    const compareResponse = ViewDefinition[0].ViewName === viewName;
    expect(compareResponse).toBeTruthy();
    console.log(ViewDefinition[0].ViewDefinition);
  } catch (error) {
    console.error(error);
    fail();
  }
});
