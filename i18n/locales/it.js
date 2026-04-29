import en from "./en.js";

const it = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "ATTUALE",
    humidity: "UMIDITÀ",
    showTemperatureChart: "Mostra storico temperatura 24 h",
    showHumidityChart: "Mostra storico umidità 24 h",
    temperature: "Temperatura",
    closeChart: "Chiudi grafico",
    entityNotFound: "Entità non trovata",
    heatingOn: "RISCALDAMENTO ATTIVO",
    heatingOff: "RISCALDAMENTO DISATTIVO",
    preview: "ANTEPRIMA",
    temperatureTrend: "Storico temperatura",
    humidityTrend: "Storico umidità",
    chartSubtitleWithCount: (rangeLabel, count) => `Storico ${rangeLabel} · ${count} punti`,
    nowValue: (value, unit) => `Ora: ${value}${unit}`,
    loadingHistory: "Caricamento storico…",
    noHistoryData: "Nessun dato storico disponibile per il periodo selezionato.",
    historyUnavailable: "Impossibile caricare lo storico. Controlla Recorder / History."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Entità climate",
    humidityEntity: "Entità umidità",
    cardName: "Nome scheda",
    minimumTemperature: "Temperatura minima",
    maximumTemperature: "Temperatura massima",
    temperatureStep: "Passo temperatura",
    backgroundStart: "Inizio sfondo",
    backgroundEnd: "Fine sfondo",
    sliderOrientation: "Orientamento cursore",
    mobileOrientation: "Orientamento mobile",
    desktopOrientation: "Orientamento desktop",
    desktopLayout: "Layout desktop",
    heatingOnMode: "Modalità accensione riscaldamento",
    historyRange: "Intervallo storico",
    previewMode: "Modalità anteprima",
    useDefault: "Usa predefinito"
  }
};

export default it;
