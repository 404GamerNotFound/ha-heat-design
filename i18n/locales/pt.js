import en from "./en.js";

const pt = {
  heatingControlCard: {
    ...en.heatingControlCard,
    current: "ATUAL",
    humidity: "HUMIDADE",
    outdoorTemperature: "EXTERIOR",
    windowContact: "JANELA",
    co2: "CO₂",
    heatingActiveFor: "AQUECIMENTO ATIVO",
    battery: "BATERIA",
    stateOpen: "ABERTO",
    stateClosed: "FECHADO",
    minutesShort: "min",
    showTemperatureChart: "Mostrar histórico de temperatura",
    showHumidityChart: "Mostrar histórico de humidade",
    temperature: "Temperatura",
    closeChart: "Fechar gráfico",
    entityNotFound: "Entidade não encontrada",
    heatingOn: "AQUECIMENTO LIGADO",
    heatingOff: "AQUECIMENTO DESLIGADO",
    preview: "PRÉ-VISUALIZAÇÃO",
    temperatureTrend: "Histórico de temperatura",
    humidityTrend: "Histórico de humidade",
    chartSubtitleWithCount: (rangeLabel, count) => `Histórico de ${rangeLabel} · ${count} pontos`,
    nowValue: (value, unit) => `Agora: ${value}${unit}`,
    loadingHistory: "A carregar histórico…",
    noHistoryData: "Não existem dados históricos para o período selecionado.",
    historyUnavailable: "Não foi possível carregar o histórico. Verifique as definições do Recorder / History."
  },
  heatingControlCardEditor: {
    ...en.heatingControlCardEditor,
    climateEntity: "Entidade climate",
    humidityEntity: "Entidade de humidade",
    outdoorTemperatureEntity: "Entidade da temperatura exterior",
    windowContactEntity: "Entidade de contacto de janela",
    co2Entity: "Entidade CO₂",
    heatingActiveEntity: "Entidade de aquecimento ativo",
    batteryEntity: "Entidade da bateria",
    cardName: "Nome do cartão",
    minimumTemperature: "Temperatura mínima",
    maximumTemperature: "Temperatura máxima",
    temperatureStep: "Passo da temperatura",
    backgroundStart: "Início do fundo",
    backgroundEnd: "Fim do fundo",
    sliderOrientation: "Orientação do slider",
    mobileOrientation: "Orientação móvel",
    desktopOrientation: "Orientação desktop",
    desktopLayout: "Layout desktop",
    heatingOnMode: "Modo ao ligar aquecimento",
    historyRange: "Intervalo do histórico",
    previewMode: "Modo de pré-visualização",
    useDefault: "Usar predefinição"
  }
};

export default pt;
