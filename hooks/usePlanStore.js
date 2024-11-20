import { create } from "zustand";
import { supabase } from "../lib/supabase";

const usePlanStore = create((set) => ({
  plans: [],

  tempPlan: null, // Plan temporal antes de ser guardado en la base de datos

  routines: [], // Rutinas

  exercises: [],

  // Función para establecer un plan temporal
  setTempPlan: (plan) => set({ tempPlan: plan }),
  resetTempPlan: () => set({ tempPlan: null }),

  setRoutines: (routines) => set({ routines }),

  setExercises: (exercises) => set({ exercises }),

  // Función para traer los planes de la base de datos

  // Función para guardar el plan en Supabase y limpiar el estado temporal
  saveTempPlan: async () => {
    const { tempPlan } = usePlanStore.getState(); // Obtén el plan temporal actual
    if (!tempPlan) return null;

    const { data, error } = await supabase
      .from("Plan")
      .insert(tempPlan)
      .select();
    if (error) {
      console.error("Error al guardar el plan:", error);
      return null;
    }

    set((state) => ({
      plans: [...state.plans, ...data],
      tempPlan: null, // Limpia el plan temporal
    }));

    return data[0]; // Retorna el plan insertado
  },

  // Función para obtener todos los planes de la base de datos
  fetchPlans: async () => {
    const { data, error } = await supabase.from("Plan").select("*");

    if (error) {
      console.error("Error al obtener los planes:", error);
      return;
    }

    set({ plans: data || [] });
  },
}));

export default usePlanStore;
