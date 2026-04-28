export function callHomeAssistantService(hass, domain, service, serviceData = {}) {
  return hass.callService(domain, service, serviceData);
}
