import en from "./en.js";

const cs = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "AKTUÁLNÍ",
    humidity: "VLHKOST",
    showTemperatureChart: "Zobrazit 24h historii teploty",
    showHumidityChart: "Zobrazit 24h historii vlhkosti",
    temperature: "Teplota",
    closeChart: "Zavřít graf",
    entityNotFound: "Entita nebyla nalezena",
    heatingOn: "TOPENÍ ZAPNUTO",
    heatingOff: "TOPENÍ VYPNUTO",
    preview: "NÁHLED",
    temperatureTrend: "Historie teploty",
    humidityTrend: "Historie vlhkosti",
    chartSubtitleWithCount: (rangeLabel, count) => `Historie ${rangeLabel} · ${count} bodů`,
    nowValue: (value, unit) => `Nyní: ${value}${unit}`,
    loadingHistory: "Načítá se historie…",
    noHistoryData: "Pro vybrané období nejsou k dispozici žádná historická data.",
    historyUnavailable: "Historii se nepodařilo načíst. Zkontrolujte Recorder / Historii."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Entita climate",
    humidityEntity: "Entita vlhkosti",
    cardName: "Název karty",
    minimumTemperature: "Minimální teplota",
    maximumTemperature: "Maximální teplota",
    temperatureStep: "Krok teploty",
    backgroundStart: "Začátek pozadí",
    backgroundEnd: "Konec pozadí",
    sliderOrientation: "Orientace posuvníku",
    mobileOrientation: "Mobilní orientace",
    desktopOrientation: "Desktopová orientace",
    desktopLayout: "Rozložení desktopu",
    heatingOnMode: "Režim při zapnutí topení",
    historyRange: "Rozsah historie",
    previewMode: "Režim náhledu",
    useDefault: "Použít výchozí"
  }
};

export default cs;
