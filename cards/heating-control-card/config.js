export const heatingControlDefaultConfig = {
  type: "custom:heating-control-card",
  entity: "climate.living_room",
  humidity_entity: "sensor.living_room_humidity",
  outdoor_temp_entity: "sensor.outdoor_temperature",
  window_contact_entity: "binary_sensor.living_room_window",
  co2_entity: "sensor.living_room_co2",
  heating_active_since_entity: "sensor.living_room_heating_active_minutes",
  battery_entity: "sensor.living_room_thermostat_battery",
  name: "Heating",
  min_temp: 16,
  max_temp: 28,
  step: 0.5,
  background_start: "#ffa20f",
  background_end: "#ff9800",
  slider_orientation: "vertical",
  slider_orientation_mobile: "vertical",
  slider_orientation_desktop: "vertical",
  desktop_layout: "standard",
  heating_on_mode: "heat",
  history_range: "24h",
  preview: false
};

export function ensureClimateEntity(config) {
  if (!config?.entity) {
    throw new Error("You need to define a climate entity");
  }
}

export function normalizeHeatingControlConfig(config) {
  return {
    min_temp: 16,
    max_temp: 28,
    step: 0.5,
    background_start: "#ffa20f",
    background_end: "#ff9800",
    slider_orientation: "vertical",
    slider_orientation_mobile: null,
    slider_orientation_desktop: null,
    desktop_layout: "standard",
    heating_on_mode: "heat",
    history_range: "24h",
    ...config
  };
}
