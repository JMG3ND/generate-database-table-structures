#!/usr/bin/env node
import { writeAllData } from "../writers";
import { closeConnection } from "../database";
import dotenv from "dotenv";
dotenv.config();

async function generateJsonFromStructureTables() {
  try {
    const isWritinData = await writeAllData(
      process.env.DATABASE_NAME || undefined
    );
    if (!isWritinData) throw new Error("Error al escribir la data");
  } catch (error) {
    console.error(error);
  } finally {
    await closeConnection();
  }
}

generateJsonFromStructureTables();
