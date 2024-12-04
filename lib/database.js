import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "./schema"; // Esquema definido en schema.js
import Plan from "../models/Plan"; // Modelos de WatermelonDB

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [Plan], // Añade aquí todos los modelos que uses
});

export default database;
