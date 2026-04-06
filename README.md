# Home Assistant Heating Control Card

A custom **Lovelace dashboard card** for Home Assistant inspired by the orange thermostat design in your reference image.

## What this card does

- Shows **current temperature** from your `climate` entity.
- Shows **target temperature** and lets you change it using a slider.
- Shows optional **humidity** from a separate sensor.
- Shows current HVAC state (`heat`, `idle`, etc.).
- Calls Home Assistant service `climate.set_temperature`.

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

- **URL**: `/hacsfiles/ha-heat-design/heating-control-card.js`
- **Type**: `JavaScript Module`

> If your repository slug differs, adjust the path accordingly.

---

## Manual installation (alternative)

1. Copy `heating-control-card.js` to `/config/www/`.
2. Add this resource:
   - URL: `/local/heating-control-card.js`
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
```

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

---

## Notes

- This is a Lovelace **frontend card** (Dashboard category in HACS).
- `entity` must point to a valid `climate` entity.
- If `humidity_entity` is missing or unavailable, humidity is shown as `--`.
