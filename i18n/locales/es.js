import en from "./en.js";

const es = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "ACTUAL",
    humidity: "HUMEDAD",
    showTemperatureChart: "Mostrar historial de temperatura de 24 h",
    showHumidityChart: "Mostrar historial de humedad de 24 h",
    temperature: "Temperatura",
    closeChart: "Cerrar gráfico",
    entityNotFound: "Entidad no encontrada",
    heatingOn: "CALEFACCIÓN ENCENDIDA",
    heatingOff: "CALEFACCIÓN APAGADA",
    preview: "VISTA PREVIA",
    temperatureTrend: "Historial de temperatura",
    humidityTrend: "Historial de humedad",
    chartSubtitleWithCount: (rangeLabel, count) => `Historial de ${rangeLabel} · ${count} puntos`,
    nowValue: (value, unit) => `Ahora: ${value}${unit}`,
    loadingHistory: "Cargando historial…",
    noHistoryData: "No hay datos de historial para el período seleccionado.",
    historyUnavailable: "No se pudo cargar el historial. Revisa Recorder / Historial."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Entidad climate",
    humidityEntity: "Entidad de humedad",
    cardName: "Nombre de la tarjeta",
    minimumTemperature: "Temperatura mínima",
    maximumTemperature: "Temperatura máxima",
    temperatureStep: "Paso de temperatura",
    backgroundStart: "Inicio del fondo",
    backgroundEnd: "Fin del fondo",
    sliderOrientation: "Orientación del deslizador",
    mobileOrientation: "Orientación móvil",
    desktopOrientation: "Orientación de escritorio",
    desktopLayout: "Diseño de escritorio",
    heatingOnMode: "Modo al encender calefacción",
    historyRange: "Rango del historial",
    previewMode: "Modo vista previa",
    useDefault: "Usar valor predeterminado"
  }
};

export default es;
