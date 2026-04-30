# Home Assistant Heating Control Card (Deutsch)

Eine benutzerdefinierte **Lovelace-Dashboard-Karte** für Home Assistant, inspiriert vom orangefarbenen Thermostat-Design aus dem Referenzbild.

![Heating control card design](images/designv2.png)

## Sprachen

- 🇬🇧 Englisch (Standard): [`README.md`](README.md)
- 🇩🇪 Deutsch: `README.de.md`
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)

## Funktionsumfang der Karte

- Zeigt die **aktuelle Temperatur** deiner `climate`-Entität.
- Zeigt die **Zieltemperatur** und ermöglicht die Änderung per Slider.
- Ermöglicht das direkte Ein-/Ausschalten der Heizung über die Karte.
- Zeigt optional die **Luftfeuchtigkeit** aus einem separaten Sensor.
- Unterstützt optionale modulare Infozeilen für **Außentemperatur**, **Fensterkontakt**, **CO₂**, **Heizung aktiv seit X Min** und **Batterie**.
- Zeigt den aktuellen HVAC-Status (`heat`, `idle`, usw.).
- Zeigt einen Vorschaustatus im Dashboard-Kartenpicker.
- Ruft den Home-Assistant-Service `climate.set_temperature` auf.
- Ruft beim Umschalten der Heizung den Service `climate.set_hvac_mode` auf.

---

## Installation mit HACS (empfohlen)

### 1) Repository als benutzerdefiniertes Repository hinzufügen

1. Öffne **HACS** in Home Assistant.
2. Gehe zu **Settings** (Menü oben rechts).
3. Öffne **Custom repositories**.
4. Füge die URL dieses Repositories hinzu.
5. Wähle die Kategorie: **Dashboard**.
6. Speichern.

### 2) Karte installieren

1. Öffne in HACS den Bereich **Dashboard**.
2. Suche nach **Home Assistant Heating Control Card**.
3. Klicke auf **Download**.
4. Starte Home Assistant neu (empfohlen bei Erstinstallation).

### 3) Resource hinzufügen (falls HACS sie nicht automatisch hinzufügt)

Gehe zu **Settings → Dashboards → Resources** und füge hinzu:

- **URL**: `/hacsfiles/ha-great-design/ha-great-design.js`
- **Type**: `JavaScript Module`

> Wenn dein Repository-Slug abweicht, passe den Pfad entsprechend an.


### Registrierte Custom-Element-Namen

Nach dem Laden von `/hacsfiles/ha-great-design/ha-great-design.js` als **JavaScript Module** stehen diese Lovelace-Typen zur Verfügung:

- `type: custom:heating-control-card`
- `type: custom:button-switch-card`
- `type: custom:ha-markdown-title-design`

Das Bundle schreibt einmalig eine Debug-Ausgabe in die Browser-Konsole:

- `HA Great Design bundle loaded`
- inkl. Liste der Card-Tags und deren Registrierungsstatus.

## Manuelle Installation (Alternative)

1. Kopiere `ha-great-design.js` nach `/config/www/ha-great-design/`. Optionale Legacy-Einstiegspunkte (`heating-control-card.js`, `button-switch-card.js` und `markdown-title-card.js`) kannst du ebenfalls kopieren, falls du sie noch direkt als Resource nutzt.
2. Füge diese Resource hinzu:
   - URL: `/local/ha-great-design/ha-great-design.js`
   - Type: `JavaScript Module`

---

## Verwendung im Dashboard-YAML

```yaml
type: custom:heating-control-card
name: Wohnzimmer
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


## Konfiguration mit dem UI-Editor

Du kannst die Karte direkt im Home-Assistant-**UI-Editor** konfigurieren (für die meisten Optionen ist kein manuelles YAML nötig).

![Configuration via Home Assistant UI editor](images/configurations.png)

![UI editor settings view](images/settings.png)

## Verlaufsgraphen

Die Karte kann zusätzlich Verlaufsgraphen für Luftfeuchtigkeit und Temperatur anzeigen.

![Humidity trend graph](images/graph.png)

![Temperature trend graph](images/graph.png)

### Kartenoptionen

| Option | Pflicht | Standard | Beschreibung |
|---|---|---:|---|
| `type` | ja | - | Muss `custom:heating-control-card` sein |
| `entity` | ja | - | Climate-Entität, z. B. `climate.living_room` |
| `name` | nein | `Heater` | Beschriftung im Footer |
| `humidity_entity` | nein | - | Sensor-Entität für Luftfeuchtigkeit |
| `min_temp` | nein | `16` | Minimaler Sliderwert |
| `max_temp` | nein | `28` | Maximaler Sliderwert |
| `step` | nein | `0.5` | Slider-Schrittweite |
| `background_start` | nein | `#ffa20f` | Obere Verlaufsfarbe (auch als Fallback-Hintergrundfarbe) |
| `background_end` | nein | `#ff9800` | Untere Verlaufsfarbe |
| `slider_orientation` | nein | `vertical` | Slider-Ausrichtung: `vertical` oder `horizontal` |
| `slider_orientation_mobile` | nein | - | Mobile Override für Slider-Ausrichtung (`vertical` oder `horizontal`) |
| `slider_orientation_desktop` | nein | - | Desktop Override für Slider-Ausrichtung (`vertical` oder `horizontal`) |
| `desktop_layout` | nein | `standard` | Desktop-Layoutdichte: `standard` oder `compact` |
| `heating_on_mode` | nein | `heat` | HVAC-Modus beim Umschalten von AUS auf AN (muss von der Climate-Entität unterstützt werden) |
| `history_range` | nein | `24h` | Zeitfenster für Verlaufsdiagramme: `24h`, `7d` oder `30d` |
| `outdoor_temp_entity` | nein | - | Optionale Entität als Infozeile für Außentemperatur |
| `window_contact_entity` | nein | - | Optionale Entität als Infozeile für Fensterkontakt |
| `co2_entity` | nein | - | Optionale Entität als Infozeile für CO₂ |
| `heating_active_since_entity` | nein | - | Optionale Entität für „Heizung aktiv“ (Minutenwert oder Zeitstempel) |
| `battery_entity` | nein | - | Optionale Entität als Infozeile für Batteriestand |

---


## Fehlerbehebung

### Fehler: `Custom element doesn't exist: heating-control-card`

Dieser Fehler bedeutet, dass Home Assistant das JavaScript-Modul der Karte nicht laden konnte.

1. Prüfe unter **Einstellungen → Dashboards → Ressourcen**, ob die Ressource eingetragen ist.
2. Nutze exakt eine dieser URLs:
   - HACS: `/hacsfiles/ha-great-design/ha-great-design.js`
   - Manuell: `/local/ha-great-design/ha-great-design.js`
3. Der Ressourcentyp muss `JavaScript Module` sein (nicht `JavaScript`).
4. Browser hart neu laden (`Strg+F5`) und Frontend-Cache leeren.
5. In den Browser-Devtools prüfen, ob der Log `HA Great Design bundle loaded` erscheint.
6. In YAML muss `type: custom:heating-control-card` gesetzt sein.

Wenn der Fehler bleibt, prüfe in der Browser-Konsole auf 404- oder MIME-Type-Fehler für die Ressourcen-URL.

## Hinweise

- Dies ist eine Lovelace-**Frontend-Karte** (Dashboard-Kategorie in HACS).
- `entity` muss auf eine gültige `climate`-Entität zeigen.
- Wenn `humidity_entity` fehlt oder nicht verfügbar ist, wird Luftfeuchtigkeit als `--` angezeigt.
- `slider_orientation_mobile` und `slider_orientation_desktop` überschreiben `slider_orientation` abhängig von der Viewport-Breite.
- `desktop_layout: compact` wirkt sich nur auf die Desktop-Ansicht aus und lässt die mobile Ansicht unverändert.
- Für horizontale Slider kannst du die Dicke per CSS-Variablen reduzieren:
  - `--heating-horizontal-slider-track-height` (Standard: `12px`)
  - `--heating-horizontal-slider-thumb-size` (Standard: `26px`)
  - `--heating-horizontal-slider-shell-height` (Standard: `90px`)

---

## Schnellstart

1. Über HACS installieren (Dashboard-Kategorie).
2. Resource hinzufügen (falls nötig): `/hacsfiles/ha-great-design/ha-great-design.js`
3. Karte hinzufügen:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Wohnzimmer
```

## Lokalisierung

Die Kartenoberfläche und der visuelle Editor unterstützen automatisch:
Englisch, Deutsch, Französisch, Spanisch, Italienisch, Polnisch, Niederländisch und Tschechisch.

---

## Weitere Projekte

- Du suchst das passende Dashboard-Design für Klima-/Heizungssteuerung? Schau dir mein weiteres Projekt an:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design
- Du suchst weitere Ideen und Vorlagen rund um Slider? Sieh dir alle Repositories an:  
  **404GamerNotFound Repositories** → https://github.com/404GamerNotFound?tab=repositories

## Support

- Wenn dir dieses Projekt gefällt und du meine Arbeit unterstützen möchtest, kannst du hier spenden:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
