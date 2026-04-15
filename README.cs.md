# Home Assistant Heating Control Card (Čeština)

Vlastní **Lovelace dashboard karta** pro Home Assistant inspirovaná oranžovým designem termostatu z referenčního obrázku.

![Heating control card design](images/design.png)

## Jazyky

- 🇬🇧 English (výchozí): [`README.md`](README.md)
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: `README.cs.md`

## Co karta umí

- Zobrazuje **aktuální teplotu** z vaší entity `climate`.
- Zobrazuje **cílovou teplotu** a umožňuje ji změnit pomocí slideru.
- Umožňuje přepínat topení zapnuto/vypnuto přímo z karty.
- Volitelně zobrazuje **vlhkost** ze samostatného senzoru.
- Zobrazuje aktuální HVAC stav (`heat`, `idle` atd.).
- Zobrazuje náhledový stav ve výběru dashboard karet.
- Volá službu Home Assistant `climate.set_temperature`.
- Při přepnutí topení volá `climate.set_hvac_mode`.

---

## Instalace přes HACS (doporučeno)

### 1) Přidejte tento repozitář jako vlastní repozitář

1. Otevřete **HACS** v Home Assistant.
2. Přejděte do **Settings** (menu vpravo nahoře).
3. Otevřete **Custom repositories**.
4. Přidejte URL tohoto repozitáře.
5. Vyberte kategorii: **Dashboard**.
6. Uložte.

### 2) Nainstalujte kartu

1. V HACS otevřete **Dashboard**.
2. Vyhledejte **Home Assistant Heating Control Card**.
3. Klikněte na **Download**.
4. Restartujte Home Assistant (doporučeno po první instalaci).

### 3) Přidejte resource (pokud ji HACS nepřidá automaticky)

Jděte do **Settings → Dashboards → Resources** a přidejte:

- **URL**: `/hacsfiles/ha-heat-design/heating-control-card.js`
- **Type**: `JavaScript Module`

> Pokud máte jiný slug repozitáře, upravte cestu.

> Podpora legacy cesty: pokud už používáte `/hacsfiles/ha-heat-design/ha-heat-design.js`, bude dál fungovat jako kompatibilní loader.

## Ruční instalace (alternativa)

1. Zkopírujte `heating-control-card.js` do `/config/www/` (nebo oba soubory, pokud chcete kompatibilitu se starými cestami).
2. Přidejte tuto resource:
   - URL: `/local/heating-control-card.js`
   - Type: `JavaScript Module`

---

## Použití v dashboard YAML

```yaml
type: custom:heating-control-card
name: Obývací pokoj
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

## Konfigurace přes UI editor

Kartu nyní můžete konfigurovat přímo v Home Assistant **UI editoru** (pro většinu voleb není nutné ruční YAML).

![Configuration via Home Assistant UI editor](images/configurations.png)

### Možnosti karty

| Možnost | Povinné | Výchozí | Popis |
|---|---|---:|---|
| `type` | ano | - | Musí být `custom:heating-control-card` |
| `entity` | ano | - | Climate entita, např. `climate.living_room` |
| `name` | ne | `Heater` | Popisek v patičce |
| `humidity_entity` | ne | - | Entita senzoru vlhkosti |
| `min_temp` | ne | `16` | Minimální hodnota slideru |
| `max_temp` | ne | `28` | Maximální hodnota slideru |
| `step` | ne | `0.5` | Krok slideru |
| `background_start` | ne | `#ffa20f` | Horní barva gradientu (fallback) |
| `background_end` | ne | `#ff9800` | Spodní barva gradientu |
| `slider_orientation` | ne | `vertical` | Orientace slideru: `vertical` nebo `horizontal` |
| `slider_orientation_mobile` | ne | - | Mobilní override orientace (`vertical` nebo `horizontal`) |
| `slider_orientation_desktop` | ne | - | Desktop override orientace (`vertical` nebo `horizontal`) |
| `desktop_layout` | ne | `standard` | Hustota desktop layoutu: `standard` nebo `compact` |
| `heating_on_mode` | ne | `heat` | HVAC režim při přepnutí OFF → ON |

---

## Poznámky

- Toto je Lovelace **frontend karta** (Dashboard kategorie v HACS).
- `entity` musí odkazovat na platnou `climate` entitu.
- Pokud `humidity_entity` chybí nebo není dostupná, vlhkost se zobrazí jako `--`.
- `slider_orientation_mobile` a `slider_orientation_desktop` přepisují `slider_orientation` podle šířky viewportu.
- `desktop_layout: compact` ovlivňuje jen desktop zobrazení, mobilní zůstává beze změny.

---

## Rychlý start

1. Nainstalujte přes HACS (kategorie Dashboard).
2. Přidejte resource (pokud je potřeba): `/hacsfiles/ha-heat-design/heating-control-card.js`
3. Přidejte kartu:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Obývací pokoj
```

## Lokalizace

Rozhraní karty a vizuální editor automaticky podporují:
angličtinu, němčinu, francouzštinu, španělštinu, italštinu, polštinu, nizozemštinu a češtinu.

---

## Další projekty

- Hledáte odpovídající design dashboardu pro ovládání klima/topení? Podívejte se na můj další projekt:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design

## Podpora

- Pokud se vám projekt líbí a chcete podpořit mou práci, můžete přispět zde:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
