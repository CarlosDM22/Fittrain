import { WeekCalendar, LocaleConfig } from "react-native-calendars";

export default function CustomCalendar() {
  LocaleConfig.defaultLocale = "es";
  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May"],
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  };

  return (
    <WeekCalendar
      theme={{
        textDayHeaderFontSize: 14,
        textDayFontSize: 20,
        selectedDotColor: "#444",
        selectedDayBackgroundColor: "#444",
        selectedDayTextColor: "#fff",
        calendarBackground: "#222",
        dayTextColor: "#fff",
        textDisabledColor: "#444",
        monthTextColor: "#888",
        dotStyle: {
          themerized: true,
          width: 46,
          height: 46,
          backgroundColor: "#fff",
          borderColor: "#fff",
          borderRadius: 1,
        },
      }}
    />
  );
}
