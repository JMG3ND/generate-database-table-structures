import { writeAllData } from "./writers";
import { closeConnection } from "./database";

async function runGenerate() {
  try {
    const isWritinData = await writeAllData();
    if (!isWritinData) throw new Error("Error al escribir la data");
  } catch (error) {
    console.error(error);
  } finally {
    await closeConnection();
  }
}

runGenerate();
