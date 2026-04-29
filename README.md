# Home Assistant Heating Control Card

A custom **Lovelace dashboard card bundle** for Home Assistant inspired by the orange thermostat design in your reference image.

This repository now contains:
- `custom:heating-control-card` (climate dashboard card)
- `custom:button-switch-card` (switch/button dashboard card)
- `custom:ha-markdown-title-design` (title/markdown-style dashboard card)

![Heating control card design](images/designv2.png)

## Languages

- 🇬🇧 English (default): `README.md`
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)
- 🇵🇹 Português: built-in UI translation support

## What this card does

- Shows **current temperature** from your `climate` entity.
- Shows **target temperature** and lets you change it using a slider.
- Lets you toggle heating **on/off** directly from the card.
- Shows optional **humidity** from a separate sensor.
- Supports optional modular info rows for **outdoor temperature**, **window contact**, **CO₂**, **heating active for X min**, and **battery**.
- Shows current HVAC state (`heat`, `idle`, etc.).
- Shows a preview state in the dashboard card picker.
- Calls Home Assistant service `climate.set_temperature`.
- Calls Home Assistant service `climate.set_hvac_mode` when heating is toggled.

---

## Install with HACS (recommended)

### 1) Add this repository as a custom repository

1. Open **HACS** in Home Assistant.
2. Go to **Settings** (top-right menu).
3. Open **Custom repositories**.
4. Add this repository URL.
5. Select category: **Dashboard**.
6. Save.

### 2) Install the card

1. In HACS, open **Dashboard**.
2. Search for **Home Assistant Heating Control Card**.
3. Click **Download**.
4. Restart Home Assistant (recommended after first install).

### 3) Add the resource (if HACS does not add it automatically)

Go to **Settings → Dashboards → Resources** and add:

- **URL**: `/hacsfiles/ha-heat-design/ha-heat-design.js`
- **Type**: `JavaScript Module`

> If your repository slug differs, adjust the path accordingly.


### Registered custom element names

After loading `/hacsfiles/ha-heat-design/ha-heat-design.js` as a **JavaScript Module**, these Lovelace card types are available:

- `type: custom:heating-control-card`
- `type: custom:button-switch-card`
- `type: custom:ha-markdown-title-design`

The bundle logs a one-time debug message in the browser console:

- `HA Heat Design bundle loaded`
- includes the list of card tags and their registration state.

## Manual installation (alternative)

1. Copy `ha-heat-design.js` to `/config/www/ha-heat-design/`. Optional legacy entrypoints (`heating-control-card.js`, `button-switch-card.js`, and `markdown-title-card.js`) can be copied too if you still reference them directly.
2. Add this resource:
   - URL: `/local/ha-heat-design/ha-heat-design.js`
   - Type: `JavaScript Module`

---

## Usage in dashboard YAML

```yaml
type: custom:heating-control-card
name: Living Room
entity: climate.living_room
humidity_entity: sensor.living_room_humidity
min_temp: 16
max_temp: 28
step: 0.5
background_start: "#ffa20f"
background_end: "#ff9800"
slider_orientation: vertical
slider_orientation_mobile: vertical
slider_orientation_desktop: horizontal
desktop_layout: compact
heating_on_mode: heat
history_range: 24h
outdoor_temp_entity: sensor.outdoor_temperature
window_contact_entity: binary_sensor.living_room_window
co2_entity: sensor.living_room_co2
heating_active_since_entity: sensor.living_room_heating_active_minutes
battery_entity: sensor.living_room_thermostat_battery
```


### Button switch card YAML

```yaml
type: custom:button-switch-card
entity: switch.tv
name: TV
icon: mdi:radiator
layout_variant: compact
```


### Markdown title card YAML

```yaml
type: custom:ha-markdown-title-design
title: Living Room
subtitle: Heating overview
text: Optional markdown-style description text
align: center
show_divider: true
```

## Configure with the UI editor

You can now configure the card directly in the Home Assistant **UI editor** (no manual YAML required for most options).

![UI editor settings view](images/settings.png)

## History graphs

The card can also show history graphs for humidity and temperature trends.

![Humidity trend graph](images/graph.png)

![Temperature trend graph](images/graph2.png)

### Card options

| Option | Required | Default | Description |
|---|---|---:|---|
| `type` | yes | - | Must be `custom:heating-control-card` |
| `entity` | yes | - | Climate entity, e.g. `climate.living_room` |
| `name` | no | `Heater` | Label shown in the footer |
| `humidity_entity` | no | - | Sensor entity for humidity |
| `min_temp` | no | `16` | Minimum slider value |
| `max_temp` | no | `28` | Maximum slider value |
| `step` | no | `0.5` | Slider increment |
| `background_start` | no | `#ffa20f` | Top gradient color (also used as solid background color fallback) |
| `background_end` | no | `#ff9800` | Bottom gradient color |
| `slider_orientation` | no | `vertical` | Slider direction: `vertical` or `horizontal` |
| `slider_orientation_mobile` | no | - | Mobile-only slider orientation override (`vertical` or `horizontal`) |
| `slider_orientation_desktop` | no | - | Desktop-only slider orientation override (`vertical` or `horizontal`) |
| `desktop_layout` | no | `standard` | Desktop layout density: `standard` or `compact` |
| `heating_on_mode` | no | `heat` | HVAC mode used when toggling from OFF to ON (must be supported by your climate entity) |
| `history_range` | no | `24h` | History window for chart drawer: `24h`, `7d`, or `30d` |
| `outdoor_temp_entity` | no | - | Optional entity shown as outdoor temperature info row |
| `window_contact_entity` | no | - | Optional entity shown as window contact info row |
| `co2_entity` | no | - | Optional entity shown as CO₂ info row |
| `heating_active_since_entity` | no | - | Optional entity for “heating active” duration (minutes or timestamp) |
| `battery_entity` | no | - | Optional entity shown as battery info row |

---


## Troubleshooting

### Error: `Custom element doesn't exist: heating-control-card`

This means Home Assistant could not load the JavaScript module that registers the card.

1. Verify the resource exists under **Settings → Dashboards → Resources**.
2. Use exactly one of these URLs:
   - HACS: `/hacsfiles/ha-heat-design/ha-heat-design.js`
   - Manual: `/local/ha-heat-design/ha-heat-design.js`
3. Ensure resource **Type** is `JavaScript Module` (not `JavaScript`).
4. Hard refresh the browser (`Ctrl+F5`) and clear the Home Assistant frontend cache.
5. Open browser dev tools and confirm you see the log `HA Heat Design bundle loaded`.
6. Confirm your card YAML uses `type: custom:heating-control-card`.

If the error persists, open the browser console and check for 404 or MIME type errors on the resource URL.

## Notes

- This is a Lovelace **frontend card** (Dashboard category in HACS).
- `entity` must point to a valid `climate` entity.
- If `humidity_entity` is missing or unavailable, humidity is shown as `--`.
- `slider_orientation_mobile` and `slider_orientation_desktop` override `slider_orientation` depending on the current viewport width.
- `desktop_layout: compact` only affects desktop view and keeps the mobile layout unchanged.
- For horizontal sliders, you can slim the control via CSS variables:
  - `--heating-horizontal-slider-track-height` (default `12px`)
  - `--heating-horizontal-slider-thumb-size` (default `26px`)
  - `--heating-horizontal-slider-shell-height` (default `90px`)

---

## Quick start

1. Install with HACS (Dashboard category).
2. Add resource (if needed): `/hacsfiles/ha-heat-design/ha-heat-design.js`
3. Add card:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Living Room
```

## Localization

The card UI and the visual editor now automatically support:
English, German, French, Spanish, Italian, Polish, Dutch, Czech, and Portuguese.

### Community translation workflow (external overrides)

You can provide translation overrides without editing this repository by adding a small JS resource
that sets `window.haHeatDesignTranslations` before the card is loaded.

```js
window.haHeatDesignTranslations = {
  heatingControlCard: {
    pt: {
      current: "ATUAL",
      humidity: "HUMIDADE"
    }
  },
  heatingControlCardEditor: {
    pt: {
      cardName: "Nome do cartão"
    }
  }
};
```

This allows community-driven translation updates while keeping defaults in the card.

---

## More projects

- Looking for the matching dashboard design for climate/heating controls? Check out my other project:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design
- Looking for more slider-related ideas and templates? Browse all repositories:  
  **404GamerNotFound repositories** → https://github.com/404GamerNotFound?tab=repositories

## Support me

- If you like this project and want to support my work, you can donate here:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
