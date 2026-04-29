import en from "./en.js";

const pl = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "AKTUALNA",
    humidity: "WILGOTNOŚĆ",
    showTemperatureChart: "Pokaż historię temperatury z 24 h",
    showHumidityChart: "Pokaż historię wilgotności z 24 h",
    temperature: "Temperatura",
    closeChart: "Zamknij wykres",
    entityNotFound: "Nie znaleziono encji",
    heatingOn: "OGRZEWANIE WŁĄCZONE",
    heatingOff: "OGRZEWANIE WYŁĄCZONE",
    preview: "PODGLĄD",
    temperatureTrend: "Historia temperatury",
    humidityTrend: "Historia wilgotności",
    chartSubtitleWithCount: (rangeLabel, count) => `Historia ${rangeLabel} · ${count} punktów`,
    nowValue: (value, unit) => `Teraz: ${value}${unit}`,
    loadingHistory: "Ładowanie historii…",
    noHistoryData: "Brak danych historycznych dla wybranego okresu.",
    historyUnavailable: "Nie udało się wczytać historii. Sprawdź Recorder / History."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Encja climate",
    humidityEntity: "Encja wilgotności",
    cardName: "Nazwa karty",
    minimumTemperature: "Temperatura minimalna",
    maximumTemperature: "Temperatura maksymalna",
    temperatureStep: "Krok temperatury",
    backgroundStart: "Początek tła",
    backgroundEnd: "Koniec tła",
    sliderOrientation: "Orientacja suwaka",
    mobileOrientation: "Orientacja mobilna",
    desktopOrientation: "Orientacja desktopowa",
    desktopLayout: "Układ desktopowy",
    heatingOnMode: "Tryb przy włączaniu ogrzewania",
    historyRange: "Zakres historii",
    previewMode: "Tryb podglądu",
    useDefault: "Użyj domyślnej"
  }
};

export default pl;
