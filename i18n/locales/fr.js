import en from "./en.js";

const fr = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "ACTUELLE",
    humidity: "HUMIDITÉ",
    showTemperatureChart: "Afficher l'historique de température sur 24 h",
    showHumidityChart: "Afficher l'historique d'humidité sur 24 h",
    temperature: "Température",
    closeChart: "Fermer le graphique",
    entityNotFound: "Entité introuvable",
    heatingOn: "CHAUFFAGE ACTIVÉ",
    heatingOff: "CHAUFFAGE DÉSACTIVÉ",
    preview: "APERÇU",
    temperatureTrend: "Historique de température",
    humidityTrend: "Historique d'humidité",
    chartSubtitleWithCount: (rangeLabel, count) => `Historique ${rangeLabel} · ${count} points`,
    nowValue: (value, unit) => `Maintenant : ${value}${unit}`,
    loadingHistory: "Chargement de l'historique…",
    noHistoryData: "Aucune donnée d'historique disponible pour la période sélectionnée.",
    historyUnavailable: "Impossible de charger l'historique. Vérifiez Recorder / Historique."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Entité climate",
    humidityEntity: "Entité d'humidité",
    cardName: "Nom de la carte",
    minimumTemperature: "Température minimale",
    maximumTemperature: "Température maximale",
    temperatureStep: "Pas de température",
    backgroundStart: "Début de fond",
    backgroundEnd: "Fin de fond",
    sliderOrientation: "Orientation du curseur",
    mobileOrientation: "Orientation mobile",
    desktopOrientation: "Orientation bureau",
    desktopLayout: "Disposition bureau",
    heatingOnMode: "Mode chauffage activé",
    historyRange: "Plage d'historique",
    previewMode: "Mode aperçu",
    useDefault: "Utiliser la valeur par défaut"
  }
};

export default fr;
