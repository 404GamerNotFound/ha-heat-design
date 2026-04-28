export const buttonSwitchDefaultConfig = {
  type: "custom:button-switch-card",
  entity: "switch.tv",
  name: "TV",
  icon: "mdi:radiator",
  layout_variant: "compact"
};

const buttonSwitchConfigBase = {
  name: "",
  title: "",
  icon: "mdi:radiator",
  power_entity: "",
  power_value: "",
  power_unit: "W",
  on_label: "SWITCH ON",
  off_label: "SWITCH OFF",
  unavailable_label: "UNAVAILABLE",
  state_text_on: "Active",
  state_text_off: "Idle",
  state_text_unavailable: "Not available",
  background_start: "#ffa20f",
  background_end: "#ff9800",
  track_color: "rgba(255,255,255,0.25)",
  track_inner_color: "rgba(255,255,255,0.45)",
  knob_color: "#d9d9d9",
  chip_active_background: "rgba(216, 133, 0, 0.8)",
  chip_inactive_background: "rgba(255,255,255,0.14)",
  slider_orientation: "horizontal",
  reverse_direction: false,
  button_color: "",
  name_content: "entity",
  show_power_secondary: true,
  power_threshold_target: "button",
  show_on_off_label: false,
  power_thresholds: [],
  tap_action: { action: "toggle" },
  hold_action: { action: "more-info" },
  double_tap_action: { action: "toggle" }
};

export function normalizeLayoutVariant(config) {
  const hasLegacyCompactFlag = typeof config?.compact === "boolean";

  if (config?.layout_variant === "large") return "large";
  if (config?.layout_variant === "compact") return "compact";
  if (hasLegacyCompactFlag && config.compact === false) return "large";
  return "compact";
}

export function normalizeButtonSwitchConfig(config) {
  const layoutVariant = normalizeLayoutVariant(config || {});
  const normalizedConfig = {
    ...buttonSwitchConfigBase,
    layout_variant: layoutVariant,
    compact: layoutVariant === "compact",
    ...(config || {})
  };

  if (normalizedConfig.layout_variant !== "large") {
    normalizedConfig.layout_variant = "compact";
  }

  if (normalizedConfig.power_threshold_target !== "power_text") {
    normalizedConfig.power_threshold_target = "button";
  }

  normalizedConfig.compact = normalizedConfig.layout_variant === "compact";

  if (!Array.isArray(normalizedConfig.power_thresholds)) {
    normalizedConfig.power_thresholds = [];
  }

  return normalizedConfig;
}

export function validateSwitchEntity(config) {
  if (!config || !config.entity) {
    throw new Error("Button Switch Card: You need to define an entity.");
  }

  if (!config.entity.startsWith("switch.")) {
    throw new Error("Button Switch Card: The entity must be from the switch domain (switch.*).");
  }
}
