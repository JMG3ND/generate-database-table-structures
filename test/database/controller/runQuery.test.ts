import { runQuery } from "../../../src/database";

test("Prueba de conexión a base de datos", async () => {
  try {
    const response = await runQuery("select * from sys.sql_modules");
    expect(response).toBeTruthy();
  } catch (error) {
    fail(error);
  }
});
