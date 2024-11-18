// app/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Asegúrate de tener configurado Supabase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };
  const signUp = async (email, password) => {
    // Crear el usuario en Supabase Auth
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    // Si se creó el usuario, insertar el perfil inicial en la tabla "usuario"
    const userId = user.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from("usuario").insert({
        id: userId, // usar el mismo ID del usuario de Supabase Auth
        email, // Puedes guardar otros datos iniciales si deseas
      });

      if (insertError) throw insertError;
    }
    return user;
  };

  // Actualizar el perfil del usuario con el id del usuario autenticado
  const updateProfile = async (
    fullName,
    edad,
    sexo,
    altura,
    peso,
    nivelActividad,
    objetivo
  ) => {
    if (!session) {
      throw new Error("Usuario no autenticado");
    }

    const userId = session.user.id;
    console.log(userId);

    const { error } = await supabase
      .from("usuario")
      .update({
        nombre: fullName,
        edad: edad,
        sexo: sexo,
        altura: altura,
        peso: peso,
        nivel_actividad: nivelActividad,
        objetivo: objetivo,
      })
      .eq("id", userId);

    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ session, login, logout, signUp, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
