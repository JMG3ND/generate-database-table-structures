import { SQL } from "service-database-connect";

/** Esta función se encarga de cerrar la conexión sql*/
async function closeConnection() {
  await SQL.closeInstance();
}

export { closeConnection };
