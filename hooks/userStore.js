import { create } from "zustand";

export const useUserStore = create((set) => ({
  userData: {
    fullName: "",
    edad: null,
    sexo: "",
    altura: null,
    peso: null,
    nivelActividad: "",
    objetivo: "",
  },
  updateUserData: (key, value) =>
    set((state) => ({
      userData: { ...state.userData, [key]: value },
    })),
  resetUserData: () => set({ userData: {} }),
}));
