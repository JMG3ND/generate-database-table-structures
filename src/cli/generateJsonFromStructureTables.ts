#!/usr/bin/env node
import { writeAllData, writeGeneratedFiles } from "../";
import { closeConnection } from "../database";
import { metadata } from "../database";

async function generateJsonFromStructureTables() {
  try {
    const isWritinData = await writeAllData(metadata.database || undefined);
    if (!isWritinData) throw new Error("Error al escribir la data");
    await writeGeneratedFiles();
  } catch (error) {
    console.error(error);
  } finally {
    await closeConnection();
  }
}

generateJsonFromStructureTables();
