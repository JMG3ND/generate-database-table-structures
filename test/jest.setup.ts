import { closeConnection } from "../src/database";

afterAll(async () => {
  await closeConnection();
});
