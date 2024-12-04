import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "plans",
      columns: [
        { name: "nombre", type: "string" },
        { name: "descripcion", type: "string", isOptional: true },
        { name: "tipo", type: "string" },
        { name: "frecuencia", type: "number" },
        { name: "dificultad", type: "string" },
        { name: "dias", type: "string" }, // Se guarda como JSON
        { name: "fecha_creacion", type: "number" },
      ],
    }),
  ],
});
