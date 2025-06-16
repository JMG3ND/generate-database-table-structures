import { getArrayTableName } from "../src/functions/getData/getArrayTableName";
import { SQL } from "service-database-connect";

afterAll(async () => {
  await SQL.closeInstance();
});

test("Prueba en la obtención de los nombres de tablas", async () => {
  let isArray = false;
  let itsContentIsString = false;
  try {
    const arrayTableName = await getArrayTableName();

    isArray = Array.isArray(arrayTableName);
    itsContentIsString = arrayTableName.every(
      (name) => typeof name === "string"
    );
  } catch (error) {
    console.log(error);
  } finally {
    expect(isArray).toBeTruthy();
    expect(itsContentIsString).toBeTruthy();
  }
});
