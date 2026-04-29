import en from "./en.js";

const nl = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "HUIDIG",
    humidity: "VOCHTIGHEID",
    showTemperatureChart: "24u-temperatuurgeschiedenis tonen",
    showHumidityChart: "24u-vochtigheidsgeschiedenis tonen",
    temperature: "Temperatuur",
    closeChart: "Grafiek sluiten",
    entityNotFound: "Entiteit niet gevonden",
    heatingOn: "VERWARMING AAN",
    heatingOff: "VERWARMING UIT",
    preview: "VOORBEELD",
    temperatureTrend: "Temperatuurgeschiedenis",
    humidityTrend: "Vochtigheidsgeschiedenis",
    chartSubtitleWithCount: (rangeLabel, count) => `${rangeLabel}-geschiedenis · ${count} punten`,
    nowValue: (value, unit) => `Nu: ${value}${unit}`,
    loadingHistory: "Geschiedenis laden…",
    noHistoryData: "Geen historische gegevens beschikbaar voor de geselecteerde periode.",
    historyUnavailable: "Geschiedenis kon niet worden geladen. Controleer Recorder / Geschiedenis."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Climate-entiteit",
    humidityEntity: "Vochtigheidsentiteit",
    cardName: "Kaartnaam",
    minimumTemperature: "Minimumtemperatuur",
    maximumTemperature: "Maximumtemperatuur",
    temperatureStep: "Temperatuurstap",
    backgroundStart: "Achtergrond begin",
    backgroundEnd: "Achtergrond einde",
    sliderOrientation: "Schuifrichting",
    mobileOrientation: "Mobiele oriëntatie",
    desktopOrientation: "Desktoporiëntatie",
    desktopLayout: "Desktopindeling",
    heatingOnMode: "Verwarmingsmodus bij inschakelen",
    historyRange: "Geschiedenisbereik",
    previewMode: "Voorbeeldmodus",
    useDefault: "Standaard gebruiken"
  }
};

export default nl;
