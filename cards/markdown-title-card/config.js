export const cardName = "ha-markdown-title-design";

export const defaultConfig = {
  type: `custom:${cardName}`,
  title: "",
  subtitle: "",
  text: "",
  align: "center",
  background_start: "#ffad10",
  background_end: "#ff9f00",
  gradient_direction: 180,
  title_color: "#ffffff",
  subtitle_color: "rgba(255,255,255,0.88)",
  text_color: "rgba(255,255,255,0.92)",
  title_size: 42,
  subtitle_size: 22,
  text_size: 16,
  title_weight: 800,
  subtitle_weight: 600,
  text_weight: 500,
  title_line_height: 1.12,
  subtitle_line_height: 1.2,
  text_line_height: 1.35,
  title_letter_spacing: 0.01,
  subtitle_letter_spacing: 0,
  text_letter_spacing: 0,
  padding_top: 28,
  padding_bottom: 24,
  padding_left: 24,
  padding_right: 24,
  border_radius: 28,
  min_height: 130,
  max_content_width: 100,
  subtitle_spacing: 10,
  divider_spacing: 14,
  text_spacing: 14,
  show_divider: false,
  divider_color: "rgba(255,255,255,0.34)",
  divider_width: 96,
  divider_height: 2,
  uppercase_title: false,
  enable_shadow: true,
  shadow_blur: 24,
  shadow_opacity: 0.2
};

export function clampNumber(value, fallback, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export function normalizeConfig(config) {
  return {
    ...defaultConfig,
    ...(config || {}),
    align: ["left", "center", "right"].includes(config?.align) ? config.align : defaultConfig.align,
    gradient_direction: clampNumber(config?.gradient_direction, defaultConfig.gradient_direction, 0, 360),
    title_size: clampNumber(config?.title_size, defaultConfig.title_size, 10, 200),
    subtitle_size: clampNumber(config?.subtitle_size, defaultConfig.subtitle_size, 8, 200),
    text_size: clampNumber(config?.text_size, defaultConfig.text_size, 8, 200),
    title_weight: clampNumber(config?.title_weight, defaultConfig.title_weight, 100, 1000),
    subtitle_weight: clampNumber(config?.subtitle_weight, defaultConfig.subtitle_weight, 100, 1000),
    text_weight: clampNumber(config?.text_weight, defaultConfig.text_weight, 100, 1000),
    title_line_height: clampNumber(config?.title_line_height, defaultConfig.title_line_height, 0.6, 3),
    subtitle_line_height: clampNumber(config?.subtitle_line_height, defaultConfig.subtitle_line_height, 0.6, 3),
    text_line_height: clampNumber(config?.text_line_height, defaultConfig.text_line_height, 0.6, 3),
    title_letter_spacing: clampNumber(config?.title_letter_spacing, defaultConfig.title_letter_spacing, -1, 5),
    subtitle_letter_spacing: clampNumber(config?.subtitle_letter_spacing, defaultConfig.subtitle_letter_spacing, -1, 5),
    text_letter_spacing: clampNumber(config?.text_letter_spacing, defaultConfig.text_letter_spacing, -1, 5),
    padding_top: clampNumber(config?.padding_top, defaultConfig.padding_top, 0, 200),
    padding_bottom: clampNumber(config?.padding_bottom, defaultConfig.padding_bottom, 0, 200),
    padding_left: clampNumber(config?.padding_left, defaultConfig.padding_left, 0, 200),
    padding_right: clampNumber(config?.padding_right, defaultConfig.padding_right, 0, 200),
    border_radius: clampNumber(config?.border_radius, defaultConfig.border_radius, 0, 100),
    min_height: clampNumber(config?.min_height, defaultConfig.min_height, 0, 2000),
    max_content_width: clampNumber(config?.max_content_width, defaultConfig.max_content_width, 10, 100),
    subtitle_spacing: clampNumber(config?.subtitle_spacing, defaultConfig.subtitle_spacing, 0, 200),
    divider_spacing: clampNumber(config?.divider_spacing, defaultConfig.divider_spacing, 0, 200),
    text_spacing: clampNumber(config?.text_spacing, defaultConfig.text_spacing, 0, 200),
    divider_width: clampNumber(config?.divider_width, defaultConfig.divider_width, 10, 1000),
    divider_height: clampNumber(config?.divider_height, defaultConfig.divider_height, 1, 30),
    shadow_blur: clampNumber(config?.shadow_blur, defaultConfig.shadow_blur, 0, 120),
    shadow_opacity: clampNumber(config?.shadow_opacity, defaultConfig.shadow_opacity, 0, 1),
    show_divider: Boolean(config?.show_divider),
    uppercase_title: Boolean(config?.uppercase_title),
    enable_shadow: config?.enable_shadow !== false
  };
}

export function configsEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
