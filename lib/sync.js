import { supabase } from "../lib/supabase";
import database from "..lib//database";

async function syncPlansFromSupabase() {
  const { data, error } = await supabase.from("Plan").select("*");
  if (error) {
    console.error("Error fetching plans:", error);
    return;
  }

  const plansCollection = database.collections.get("plans");

  await database.action(async () => {
    await Promise.all(
      data.map(async (plan) => {
        await plansCollection.create((newPlan) => {
          newPlan._raw.id = plan.id; // Usar ID de Supabase
          newPlan.nombre = plan.nombre;
          newPlan.descripcion = plan.descripcion;
          newPlan.tipo = plan.tipo;
          newPlan.frecuencia = plan.frecuencia;
          newPlan.dificultad = plan.dificultad;
          newPlan.dias = plan.dias; // Guardar como JSON
          newPlan.fechaCreacion = new Date(plan.fecha_creacion).getTime();
        });
      })
    );
  });
}
async function savePlanLocally(planData) {
  const plansCollection = database.collections.get("plans");
  let newPlan;

  await database.action(async () => {
    newPlan = await plansCollection.create((plan) => {
      plan.nombre = planData.nombre;
      plan.descripcion = planData.descripcion;
      plan.tipo = planData.tipo;
      plan.frecuencia = planData.frecuencia;
      plan.dificultad = planData.dificultad;
      plan.dias = planData.dias; // Guardar como JSON
      plan.fechaCreacion = Date.now();
    });
  });

  // Subir a Supabase
  const { error } = await supabase.from("Plan").insert({
    id: newPlan.id, // ID local de WatermelonDB
    nombre: planData.nombre,
    descripcion: planData.descripcion,
    tipo: planData.tipo,
    frecuencia: planData.frecuencia,
    dificultad: planData.dificultad,
    dias: planData.dias,
    fecha_creacion: new Date(newPlan.fechaCreacion).toISOString(),
  });

  if (error) console.error("Error syncing with Supabase:", error);
}
