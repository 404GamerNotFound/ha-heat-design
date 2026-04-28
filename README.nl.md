# Home Assistant Heating Control Card (Nederlands)

Een aangepaste **Lovelace-dashboardkaart** voor Home Assistant, geïnspireerd op het oranje thermostaatontwerp uit de referentieafbeelding.

![Heating control card design](images/design.png)

## Talen

- 🇬🇧 English (standaard): [`README.md`](README.md)
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: `README.nl.md`
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)

## Wat deze kaart doet

- Toont de **huidige temperatuur** van je `climate`-entiteit.
- Toont de **doeltemperatuur** en laat je die aanpassen met een slider.
- Laat je verwarming direct op de kaart aan/uit zetten.
- Toont optioneel **luchtvochtigheid** van een aparte sensor.
- Toont de huidige HVAC-status (`heat`, `idle`, enz.).
- Toont een previewstatus in de dashboard-kaartkiezer.
- Roept de Home Assistant-service `climate.set_temperature` aan.
- Roept `climate.set_hvac_mode` aan bij het schakelen van verwarming.

---

## Installeren met HACS (aanbevolen)

### 1) Voeg deze repository toe als custom repository

1. Open **HACS** in Home Assistant.
2. Ga naar **Settings** (menu rechtsboven).
3. Open **Custom repositories**.
4. Voeg de URL van deze repository toe.
5. Selecteer categorie: **Dashboard**.
6. Opslaan.

### 2) Installeer de kaart

1. Open in HACS **Dashboard**.
2. Zoek naar **Home Assistant Heating Control Card**.
3. Klik op **Download**.
4. Herstart Home Assistant (aanbevolen na eerste installatie).

### 3) Voeg de resource toe (als HACS dit niet automatisch doet)

Ga naar **Settings → Dashboards → Resources** en voeg toe:

- **URL**: `/hacsfiles/ha-heat-design/ha-heat-design.js`
- **Type**: `JavaScript Module`

> Als je repository-slug afwijkt, pas het pad aan.

> Ondersteuning voor legacy-pad: als je al `/hacsfiles/ha-heat-design/ha-heat-design.js` gebruikt, blijft dit werken als compatibiliteits-loader.

## Handmatige installatie (alternatief)

1. Kopieer `heating-control-card.js` naar `/config/www/` (of beide bestanden als je achterwaartse compatibiliteit wilt).
2. Voeg deze resource toe:
   - URL: `/local/ha-heat-design.js`
   - Type: `JavaScript Module`

---

## Gebruik in dashboard YAML

```yaml
type: custom:heating-control-card
name: Woonkamer
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


## Configureren met de UI-editor

Je kunt de kaart nu direct in de Home Assistant-**UI-editor** configureren (voor de meeste opties is handmatige YAML niet nodig).

![Configuration via Home Assistant UI editor](images/configurations.png)

### Kaartopties

| Optie | Verplicht | Standaard | Beschrijving |
|---|---|---:|---|
| `type` | ja | - | Moet `custom:heating-control-card` zijn |
| `entity` | ja | - | Climate-entiteit, bijv. `climate.living_room` |
| `name` | nee | `Heater` | Label in de footer |
| `humidity_entity` | nee | - | Sensor-entiteit voor luchtvochtigheid |
| `min_temp` | nee | `16` | Minimale sliderwaarde |
| `max_temp` | nee | `28` | Maximale sliderwaarde |
| `step` | nee | `0.5` | Sliderstap |
| `background_start` | nee | `#ffa20f` | Bovenste gradiëntkleur (ook fallback) |
| `background_end` | nee | `#ff9800` | Onderste gradiëntkleur |
| `slider_orientation` | nee | `vertical` | Sliderrichting: `vertical` of `horizontal` |
| `slider_orientation_mobile` | nee | - | Mobiele override (`vertical` of `horizontal`) |
| `slider_orientation_desktop` | nee | - | Desktop override (`vertical` of `horizontal`) |
| `desktop_layout` | nee | `standard` | Desktop lay-outdichtheid: `standard` of `compact` |
| `heating_on_mode` | nee | `heat` | HVAC-modus bij schakelen van OFF naar ON |

---

## Opmerkingen

- Dit is een Lovelace-**frontendkaart** (Dashboard-categorie in HACS).
- `entity` moet verwijzen naar een geldige `climate`-entiteit.
- Als `humidity_entity` ontbreekt of niet beschikbaar is, wordt vochtigheid als `--` getoond.
- `slider_orientation_mobile` en `slider_orientation_desktop` overschrijven `slider_orientation` afhankelijk van viewportbreedte.
- `desktop_layout: compact` beïnvloedt alleen desktopweergave en laat mobiel ongewijzigd.

---

## Snelstart

1. Installeer via HACS (Dashboard-categorie).
2. Voeg de resource toe (indien nodig): `/hacsfiles/ha-heat-design/ha-heat-design.js`
3. Voeg de kaart toe:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Woonkamer
```

## Lokalisatie

De kaartinterface en de visuele editor ondersteunen automatisch:
Engels, Duits, Frans, Spaans, Italiaans, Pools, Nederlands en Tsjechisch.

---

## Meer projecten

- Op zoek naar het bijpassende dashboardontwerp voor klimaat-/verwarmingsbediening? Bekijk mijn andere project:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design

## Support

- Als je dit project leuk vindt en mijn werk wilt ondersteunen, kun je hier doneren:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
