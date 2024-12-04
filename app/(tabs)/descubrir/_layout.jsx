import { View, Text, Pressable, Image } from "react-native";
import { PlusIcon } from "@/components/Icons";
import { Link } from "expo-router";

export default function DiscLayout() {
  return (
    <View className="flex-1" style={{ backgroundColor: "#222" }}>
      {/* Título del apartado */}
      <Text className="text-xl font-bold text-amber-100 mx-12 mt-2">
        Seleccionar Rutina
      </Text>

      {/* Botón para navegar hacia "Seleccionar Rutinas Comunes" */}
      <Link href="/seleccionarRutinas" asChild>
        <Pressable
          className="bg-blue-400 p-6 rounded-2xl m-3 active:bg-blue-400/50 active:scale-95 transition"
          accessibilityLabel="Botón para seleccionar rutinas comunes"
        >
          <View className="flex-row justify-around items-center">
            {/* Imagen de ícono */}
            <Image
              source={require("@/assets/favicon.png")}
              alt="Ícono de rutinas comunes"
            />
            {/* Texto descriptivo del botón */}
            <Text className="text-lg font-bold">Rutinas Comunes</Text>
            {/* Ícono adicional */}
            <PlusIcon />
          </View>
        </Pressable>
      </Link>

      {/* Título del apartado */}
      <Text className="text-xl font-bold text-amber-100 mx-12 mt-2">
        Seleccionar Alimentencion
      </Text>

      {/* Botón para navegar hacia "Seleccionar Alimentacion Comunes" */}
      <Link href="/seleccionarDietas" asChild>
        <Pressable
          className="bg-blue-400 p-6 rounded-2xl m-3 active:bg-blue-400/50 active:scale-95 transition"
          accessibilityLabel="Botón para seleccionar Dietas comunes"
        >
          <View className="flex-row justify-around items-center">
            {/* Imagen de ícono */}
            <Image
              source={require("@/assets/favicon.png")}
              alt="Ícono de rutinas comunes"
            />
            {/* Texto descriptivo del botón */}
            <Text className="text-lg font-bold">Dietas Comunes</Text>
            {/* Ícono adicional */}
            <PlusIcon />
          </View>
        </Pressable>
      </Link>

      {/* Título del apartado */}
      <Text className="text-xl font-bold text-amber-100 mx-12 mt-2">
        Seleccionar Rutinas sin Equipo
      </Text>

      {/* Botón para navegar hacia "Sugerencias de Rutinas sin Equipamiento" */}
      <Link href="/seleccionarRutinasSinEquipo" asChild>
        <Pressable
          className="bg-blue-400 p-6 rounded-2xl m-3 active:bg-blue-400/50 active:scale-95 transition"
          accessibilityLabel="Botón para Sugerencias de Rutinas sin Equipamiento"
        >
          <View className="flex-row justify-around items-center">
            {/* Imagen de ícono */}
            <Image
              source={require("@/assets/favicon.png")}
              alt="Ícono de rutinas comunes"
            />
            {/* Texto descriptivo del botón */}
            <Text className="text-lg font-bold">Rutinas Sin Equipo</Text>
            {/* Ícono adicional */}
            <PlusIcon />
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
