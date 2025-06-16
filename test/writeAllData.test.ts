import { writeAllData } from "../src/functions/processData/writeAllData"
import { SQL } from "service-database-connect";

afterAll(async () => {
  await SQL.closeInstance();
});

test("Prueba de escritura de archivos json de toda la base de datos", async () => {
  let responseProcess = false
  try {
    responseProcess = await writeAllData("outputTest/writeAllData");
    
  } catch (error) {
    console.log(error);
  } finally {
    expect(responseProcess).toBeTruthy();
  }
});