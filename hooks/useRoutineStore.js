import { supabase } from "@/lib/supabase";
import { create } from "zustand";

const useRoutineStore = create((set) => ({
  routines: [],
  recipes: [], // Estado inicial vacío para evitar errores

  //Obtener las rutinas de Supabase y ejercicios
  fetchRoutinesandExercises: async (idPlan) => {
    try {
      // Obtener las rutinas asociadas al plan
      const { data: routinesData, error: routinesError } = await supabase
        .from("rutina")
        .select("*")
        .eq("plan_id", idPlan);

      if (routinesError) {
        console.error("Error al obtener las rutinas:", routinesError);
        return;
      }

      console.log("Rutinas obtenidas de supabase:", routinesData);

      // Para cada rutina, obtener sus ejercicios y añadirlos a la rutina
      const routinesWithExercisesPromises = routinesData.map(
        async (routine) => {
          const { data: exercisesData, error: exercisesError } = await supabase
            .from("rutinaejercicios")
            .select("*")
            .eq("rutina_id", routine.id);

          if (exercisesError) {
            console.error(
              `Error al obtener los ejercicios para rutina ${routine.id}:`,
              exercisesError
            );
            return { ...routine, ejercicios: [] }; // Si hay error, asignar ejercicios vacíos
          }

          console.log(
            `Ejercicios obtenidos para rutina ${routine.dia}:`,
            exercisesData
          );
          return { ...routine, ejercicios: exercisesData }; // Agregar ejercicios a la rutina
        }
      );

      // Espera a que todas las promesas se resuelvan
      const routinesWithExercises = await Promise.all(
        routinesWithExercisesPromises
      );

      console.log("Rutinas con ejercicios:", routinesWithExercises);

      // Guardar las rutinas con ejercicios en el estado
      set({ routines: routinesWithExercises });
    } catch (error) {
      console.error(
        "Error inesperado al obtener las rutinas y ejercicios:",
        error.message
      );
    }
  },

  resetRoutines: () => {
    set({ routines: [] });
  },

  agregarRutina: (dayKey, rutina) => {
    console.log("rutina:", rutina);

    set((state) => ({
      routines: {
        ...state.routines,
        [dayKey]: rutina,
      },
    }));
  },

  updateRoutine: (dayKey, updates) => {
    set((state) => ({
      routines: {
        ...state.routines,
        [dayKey]: {
          ...state.routines[dayKey],
          ...updates,
        },
      },
    }));
  },

  addExerciseToRoutine: (dayKey, exercises) => {
    set((state) => {
      // Obtener los ejercicios actuales del día
      const currentExercises = state.routines[dayKey]?.ejercicios || [];

      // Filtrar los ejercicios que no están ya en la rutina para no repetirlos
      const newExercises = exercises.filter(
        (exercise) =>
          !currentExercises.some((current) => current.id === exercise.id)
      );

      // Inicializar sets, reps y peso a 0 para los nuevos ejercicios
      const exercisesWithDefaults = newExercises.map((exercise) => ({
        ...exercise,
        sets: 1, // Inicializa sets con 1
        reps: 1, // Inicializa reps con 1
        peso: 0, // Inicializa peso con 0
      }));

      return {
        routines: {
          ...state.routines,
          [dayKey]: {
            ...state.routines[dayKey],
            ejercicios: [...currentExercises, ...exercisesWithDefaults],
          },
        },
      };
    });
  },

  removeExerciseFromRoutine: (dayKey, exerciseId) => {
    set((state) => ({
      routines: {
        ...state.routines,
        [dayKey]: {
          ...state.routines[dayKey],
          ejercicios: state.routines[dayKey]?.ejercicios.filter(
            (exercise) => exercise.id !== exerciseId
          ),
        },
      },
    }));
  },

  updateExerciseInRoutine: (dayKey, exerciseId, updatedFields) => {
    set((state) => {
      const updatedExercises = state.routines[dayKey]?.ejercicios.map(
        (exercise) =>
          exercise.id === exerciseId
            ? { ...exercise, ...updatedFields } // Actualiza el ejercicio con los nuevos valores
            : exercise
      );

      return {
        routines: {
          ...state.routines,
          [dayKey]: {
            ...state.routines[dayKey],
            ejercicios: updatedExercises,
          },
        },
      };
    });
  },

  addComidaToRoutine: (dayKey, comida) =>
    set((state) => {
      const currentComidas = state.routines[dayKey]?.comidas || [];
      const newComidas = [...currentComidas, comida];

      return {
        routines: {
          ...state.routines,
          [dayKey]: {
            ...state.routines[dayKey],
            comidas: newComidas.flat(), // Aseguramos que sea un array plano
          },
        },
      };
    }),

  removeComidaFromRoutine: (dayKey, comidaId) =>
    set((state) => ({
      routines: {
        ...state.routines,
        [dayKey]: {
          ...state.routines[dayKey],
          comidas: state.routines[dayKey]?.comidas.filter(
            (comida) => comida.id !== comidaId
          ),
        },
      },
    })),
  updateComidaInRoutine: (dayKey, updatedComida) => {
    set((state) => ({
      routines: {
        ...state.routines,
        [dayKey]: {
          ...state.routines[dayKey],
          comidas: updatedComida,
        },
      },
    }));
  },

  fetchRecipes: async () => {
    try {
      const { data: recipesData, error: recipesError } = await supabase
        .from("receta")
        .select("*");

      if (recipesError) {
        console.error("Error al obtener las recetas:", recipesError);
        return;
      }

      console.log("Recetas obtenidas de supabase:", recipesData);

      // Guardar las recetas en el estado
      set({ recipes: recipesData });
    } catch (error) {
      console.error("Error inesperado al obtener las recetas:", error.message);
    }
  },
}));

export default useRoutineStore;
