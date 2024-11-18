import { create } from "zustand"; // Importa create from "zustand";

const useStore = create((set) => ({
  plans: [], // Arreglo para almacenar los planes
  routines: [], // Arreglo para almacenar las rutinas
  exercises: [], // Arreglo para almacenar los ejercicios

  // Acción para agregar un plan
  addPlan: (plan) =>
    set((state) => ({
      plans: [...state.plans, plan],
    })),

  // Acción para agregar una rutina
  addRoutine: (routine) =>
    set((state) => ({
      routines: [...state.routines, routine],
    })),

  // Acción para actualizar un plan (si es necesario)
  updatePlan: (id, updatedPlan) =>
    set((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === id ? { ...plan, ...updatedPlan } : plan
      ),
    })),

  // Acción para actualizar una rutina (si es necesario)
  updateRoutine: (id, updatedRoutine) =>
    set((state) => ({
      routines: state.routines.map((routine) =>
        routine.id === id ? { ...routine, ...updatedRoutine } : routine
      ),
    })),

  /*************  ✨ Codeium Command 🌟  *************/
  /**
   * Acción para eliminar un plan
   * @param {number} id Identificador del plan a eliminar
   * @returns {object} Estado actualizado sin el plan eliminado
   */
  // Acción para eliminar un plan
  deletePlan: (id) =>
    set((state) => ({
      // Filtra el arreglo de planes y devuelve un nuevo arreglo
      // que no incluye el plan con el id proporcionado
      plans: state.plans.filter((plan) => plan.id !== id),
    })),
  /******  173d8d82-e112-465e-b85a-905fc77269b2  *******/

  // Acción para eliminar una rutina
  deleteRoutine: (id) =>
    set((state) => ({
      routines: state.routines.filter((routine) => routine.id !== id),
    })),

  addExercise: (exercise) =>
    set((state) => ({
      exercises: [...state.exercises, exercise],
    })),

  updateExercise: (id, updatedExercise) =>
    set((state) => ({
      exercises: state.exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, ...updatedExercise } : exercise
      ),
    })),
}));

export default useStore;
