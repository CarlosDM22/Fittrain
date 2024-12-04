import { create } from "zustand";
import { supabase } from "../lib/supabase";

const usePlanStore = create((set) => ({
  plans: [],

  tempPlan: null, // Plan temporal antes de ser guardado en la base de datos

  // Función para establecer un plan temporal
  setTempPlan: (plan) => set({ tempPlan: plan }),

  resetTempPlan: () => set({ tempPlan: null }),

  setRoutines: (routines) => set({ routines }),

  setExercises: (exercises) => set({ exercises }),

  // Función para traer los planes de la base de datos

  // Función para guardar el plan en Supabase y limpiar el estado temporal

  savePlanAndRoutines: async (routines) => {
    const tempPlan = usePlanStore.getState().tempPlan;

    try {
      console.log("Iniciando guardado de plan:", tempPlan);

      // Inserta el plan
      const { data: planData, error: planError } = await supabase
        .from("plan")
        .insert({
          usuario_id: tempPlan.usuario_id,
          nombre: tempPlan.nombre,
          descripcion: tempPlan.descripcion,
          tipo: tempPlan.tipo,
          dificultad: tempPlan.dificultad,
          frecuencia: tempPlan.frecuencia,
          dias: tempPlan.dias,
        })
        .select()
        .single();

      if (planError) {
        console.error("Error al insertar el plan:", planError.message);
        throw planError;
      }
      console.log("Plan guardado exitosamente:", planData);

      // Itera sobre las rutinas y las guarda
      for (const [dayKey, routine] of Object.entries(routines)) {
        console.log(`Procesando rutina para el día: ${dayKey}`, routine);

        const descansoSeries =
          routine.descansoEntreSeries.minutos * 60 +
          routine.descansoEntreSeries.segundos;
        const descansoEjercicios =
          routine.descansoEntreEjercicios.minutos * 60 +
          routine.descansoEntreEjercicios.segundos;

        const { data: routineData, error: routineError } = await supabase
          .from("rutina")
          .insert({
            plan_id: planData.id,
            dia: dayKey,
            nombre: routine.nombre,
            descanso_entre_series: descansoSeries,
            descanso_entre_ejercicios: descansoEjercicios,
          })
          .select()
          .single();

        if (routineError) {
          console.error(
            `Error al insertar la rutina para ${dayKey}:`,
            routineError.message
          );
          throw routineError;
        }
        console.log(
          `Rutina guardada exitosamente para ${dayKey}:`,
          routineData
        );

        // Guarda los ejercicios de la rutina
        for (const ejercicio of routine.ejercicios) {
          console.log(
            `Insertando ejercicio en rutina ${routineData.id}:`,
            ejercicio
          );

          const { error: ejercicioError } = await supabase
            .from("rutinaejercicios")
            .insert({
              rutina_id: routineData.id,
              ejercicio_id: ejercicio.id,
              sets: ejercicio.sets || 1,
              reps: ejercicio.reps || 1,
              peso: ejercicio.peso || 0,
            });

          if (ejercicioError) {
            console.error(
              `Error al insertar ejercicio ${ejercicio.id} en rutina ${routineData.id}:`,
              ejercicioError.message
            );
            throw ejercicioError;
          }
          console.log(
            `Ejercicio ${ejercicio.id} guardado exitosamente en rutina ${routineData.id}`
          );
        }
      }

      console.log("Plan y rutinas guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar el plan y las rutinas:", error.message);
    }
  },

  saveDietsAndRoutines: async (routines) => {
    const tempPlan = usePlanStore.getState().tempPlan;

    try {
      console.log("Iniciando guardado de plan:", tempPlan);

      // Inserta el plan
      const { data: planData, error: planError } = await supabase
        .from("plan")
        .insert({
          usuario_id: tempPlan.usuario_id,
          nombre: tempPlan.nombre,
          descripcion: tempPlan.descripcion,
          tipo: tempPlan.tipo,
          dificultad: tempPlan.dificultad,
          frecuencia: tempPlan.frecuencia,
          dias: tempPlan.dias,
        })
        .select()
        .single();

      if (planError) {
        console.error("Error al insertar el plan:", planError.message);
        throw planError;
      }
      console.log("Plan guardado exitosamente:", planData);

      // Itera sobre las rutinas y las guarda

      for (const dayKey of Object.keys(routines)) {
        const routine = routines[dayKey];
        console.log(`Procesando rutina para el día: ${dayKey}`, routine);

        const { data: routineData, error: routineError } = await supabase
          .from("rutina")
          .insert({
            plan_id: planData.id,
            dia: dayKey,
            nombre: routine.nombre,
          })
          .select()
          .single();

        if (routineError) {
          console.error(
            `Error al insertar la rutina para ${dayKey}:`,
            routineError.message
          );
          throw routineError;
        }
        console.log(
          `Rutina guardada exitosamente para ${dayKey}:`,
          routineData
        );

        // Iterar sobre las comidas
        // Guardar las comidas en Supabase
        for (const [tipo, comidas] of Object.entries(routine.comidas)) {
          console.log(`Procesando comidas de tipo: ${tipo}`);

          for (const comida of comidas) {
            console.log(
              `Insertando comida de tipo ${tipo} con id_receta ${comida.id_receta}`
            );

            const { error: comidaError } = await supabase
              .from("rutinacomidas")
              .insert({
                rutina_id: routineData.id,
                tipo_comida: tipo, // Aquí usamos el tipo específico
                receta_id: comida.id_receta, // Asegúrate de que id_receta esté presente
              });

            if (comidaError) {
              console.error(
                `Error al insertar comida ${comida.id_receta} en rutina ${routineData.id}:`,
                comidaError.message
              );
              throw comidaError;
            }
            console.log(
              `Comida ${comida.id_receta} guardada exitosamente en rutina ${routineData.id}`
            );
          }
        }
      }

      console.log("Plan y rutinas guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar el plan y las rutinas:", error.message);
    }
  },

  // Función para obtener todos los planes de la base de datos

  // Obtener todos los planes de la base de datos
  fetchPlansandRoutines: async () => {
    try {
      const usuario_id = (await supabase.auth.getUser()).data.user.id;

      console.log("ID del usuario:", usuario_id);

      const { data, error } = await supabase
        .from("plan")
        .select("*")
        .eq("usuario_id", usuario_id);

      if (error) {
        console.error("Error al obtener los planes:", error);
        return;
      }

      if (data) {
        console.log("Planes obtenidos:", data);
        set({ plans: data });
      } else {
        console.warn("No se encontraron planes.");
        set({ plans: [] });
      }
    } catch (error) {
      console.error("Error inesperado al obtener los planes:", error.message);
    }
  },

  // Función para actualizar un plan en la base de datos
  updatePlan: async (planupdated) => {
    try {
      const { data, error } = await supabase
        .from("plan")
        .update({
          usuario_id: planupdated.usuario_id,
          nombre: planupdated.nombre,
          descripcion: planupdated.descripcion,
          tipo: planupdated.tipo,
          dificultad: planupdated.dificultad,
          frecuencia: planupdated.frecuencia,
          dias: planupdated.dias,
        })
        .eq("id", PlanId.id)
        .select("*");

      if (error) {
        console.error("Error al actualizar el plan:", error);
        return;
      }
    } catch (error) {
      console.error("Error inesperado al actualizar el plan:", error.message);
    }
  },
}));

export default usePlanStore;
