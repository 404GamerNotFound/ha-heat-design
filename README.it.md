# Home Assistant Heating Control Card (Italiano)

Una **card dashboard Lovelace** personalizzata per Home Assistant, ispirata al design arancione del termostato nell'immagine di riferimento.

![Heating control card design](images/design.png)

## Lingue

- 🇬🇧 English (predefinito): [`README.md`](README.md)
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: `README.it.md`
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)

## Cosa fa questa card

- Mostra la **temperatura corrente** della tua entità `climate`.
- Mostra la **temperatura target** e permette di modificarla con uno slider.
- Permette di attivare/disattivare il riscaldamento direttamente dalla card.
- Mostra opzionalmente l'**umidità** da un sensore separato.
- Mostra lo stato HVAC corrente (`heat`, `idle`, ecc.).
- Mostra uno stato di anteprima nel selettore card della dashboard.
- Chiama il servizio Home Assistant `climate.set_temperature`.
- Chiama `climate.set_hvac_mode` quando il riscaldamento viene commutato.

---

## Installazione con HACS (consigliata)

### 1) Aggiungi questo repository come repository personalizzato

1. Apri **HACS** in Home Assistant.
2. Vai su **Settings** (menu in alto a destra).
3. Apri **Custom repositories**.
4. Aggiungi l'URL di questo repository.
5. Seleziona categoria: **Dashboard**.
6. Salva.

### 2) Installa la card

1. In HACS, apri **Dashboard**.
2. Cerca **Home Assistant Heating Control Card**.
3. Clicca **Download**.
4. Riavvia Home Assistant (consigliato dopo la prima installazione).

### 3) Aggiungi la resource (se HACS non la aggiunge automaticamente)

Vai su **Settings → Dashboards → Resources** e aggiungi:

- **URL**: `/hacsfiles/ha-great-design/ha-great-design.js`
- **Type**: `JavaScript Module`

> Se lo slug del repository è diverso, adatta il percorso.

> Supporto percorso legacy: se usi già `/hacsfiles/ha-great-design/ha-great-design.js`, continua a funzionare come loader di compatibilità.

## Installazione manuale (alternativa)

1. Copia `heating-control-card.js` in `/config/www/` (o entrambi i file se vuoi compatibilità con vecchi percorsi resource).
2. Aggiungi questa resource:
   - URL: `/local/ha-great-design.js`
   - Type: `JavaScript Module`

---

## Utilizzo nel YAML dashboard

```yaml
type: custom:heating-control-card
name: Soggiorno
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


## Configura con l'editor UI

Ora puoi configurare la card direttamente nell'**editor UI** di Home Assistant (senza YAML manuale per la maggior parte delle opzioni).

![Configuration via Home Assistant UI editor](images/configurations.png)

### Opzioni della card

| Opzione | Obbligatorio | Predefinito | Descrizione |
|---|---|---:|---|
| `type` | sì | - | Deve essere `custom:heating-control-card` |
| `entity` | sì | - | Entità climate, es. `climate.living_room` |
| `name` | no | `Heater` | Etichetta mostrata nel footer |
| `humidity_entity` | no | - | Entità sensore per umidità |
| `min_temp` | no | `16` | Valore minimo slider |
| `max_temp` | no | `28` | Valore massimo slider |
| `step` | no | `0.5` | Incremento slider |
| `background_start` | no | `#ffa20f` | Colore superiore gradiente (anche fallback pieno) |
| `background_end` | no | `#ff9800` | Colore inferiore gradiente |
| `slider_orientation` | no | `vertical` | Orientamento slider: `vertical` o `horizontal` |
| `slider_orientation_mobile` | no | - | Override mobile orientamento (`vertical` o `horizontal`) |
| `slider_orientation_desktop` | no | - | Override desktop orientamento (`vertical` o `horizontal`) |
| `desktop_layout` | no | `standard` | Densità layout desktop: `standard` o `compact` |
| `heating_on_mode` | no | `heat` | Modalità HVAC usata nel passaggio OFF → ON |

---

## Note

- Questa è una **card frontend** Lovelace (categoria Dashboard in HACS).
- `entity` deve puntare a una entità `climate` valida.
- Se `humidity_entity` manca o non è disponibile, l'umidità viene mostrata come `--`.
- `slider_orientation_mobile` e `slider_orientation_desktop` sovrascrivono `slider_orientation` in base alla larghezza del viewport.
- `desktop_layout: compact` influisce solo sulla vista desktop e lascia invariata la vista mobile.

---

## Avvio rapido

1. Installa con HACS (categoria Dashboard).
2. Aggiungi la resource (se necessario): `/hacsfiles/ha-great-design/ha-great-design.js`
3. Aggiungi la card:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Soggiorno
```

## Localizzazione

L'interfaccia della card e l'editor visuale supportano automaticamente:
inglese, tedesco, francese, spagnolo, italiano, polacco, olandese e ceco.

---

## Altri progetti

- Cerchi il design dashboard coordinato per il controllo clima/riscaldamento? Dai un'occhiata al mio altro progetto:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design

## Supportami

- Se ti piace questo progetto e vuoi supportare il mio lavoro, puoi donare qui:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
