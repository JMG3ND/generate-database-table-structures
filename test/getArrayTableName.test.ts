import { getArrayTableName } from "../src/database";
import { writeJsonFile } from "../src/writers";

test("Prueba en la obtención de los nombres de tablas", async () => {
  let isArray = false;
  let itsContentIsString = false;
  try {
    const arrayTableName = await getArrayTableName();

    isArray = Array.isArray(arrayTableName);
    itsContentIsString = arrayTableName.every(
      (name) => typeof name === "string"
    );

    arrayTableName.sort();

    writeJsonFile(
      "outputTest/arrayTableName",
      "arrayTableName",
      arrayTableName
    );
  } catch (error) {
    console.error(error);
  } finally {
    expect(isArray).toBeTruthy();
    expect(itsContentIsString).toBeTruthy();
  }
});
