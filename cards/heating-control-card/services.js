export async function setClimateTemperature(hass, entityId, temperature) {
  return hass.callService("climate", "set_temperature", {
    entity_id: entityId,
    temperature
  });
}

export async function setClimateHvacMode(hass, entityId, hvacMode) {
  return hass.callService("climate", "set_hvac_mode", {
    entity_id: entityId,
    hvac_mode: hvacMode
  });
}
