import { Model } from "@nozbe/watermelondb";
import { field, date, json } from "@nozbe/watermelondb/decorators";

export default class Plan extends Model {
  static table = "plans";

  @field("nombre") nombre;
  @field("descripcion") descripcion;
  @field("tipo") tipo;
  @field("frecuencia") frecuencia;
  @field("dificultad") dificultad;
  @json("dias", (raw) => raw) dias;
  @date("fecha_creacion") fechaCreacion;
}
