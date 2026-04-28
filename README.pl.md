# Home Assistant Heating Control Card (Polski)

Niestandardowa **karta dashboardu Lovelace** dla Home Assistant, inspirowana pomarańczowym projektem termostatu z obrazu referencyjnego.

![Heating control card design](images/design.png)

## Języki

- 🇬🇧 English (domyślny): [`README.md`](README.md)
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: `README.pl.md`
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)

## Co robi ta karta

- Pokazuje **aktualną temperaturę** z encji `climate`.
- Pokazuje **temperaturę docelową** i pozwala ją zmieniać suwakiem.
- Umożliwia włączanie/wyłączanie ogrzewania bezpośrednio z karty.
- Opcjonalnie pokazuje **wilgotność** z osobnego sensora.
- Pokazuje aktualny stan HVAC (`heat`, `idle` itd.).
- Pokazuje stan podglądu w selektorze kart dashboardu.
- Wywołuje usługę Home Assistant `climate.set_temperature`.
- Wywołuje `climate.set_hvac_mode` podczas przełączania ogrzewania.

---

## Instalacja przez HACS (zalecana)

### 1) Dodaj to repozytorium jako repozytorium niestandardowe

1. Otwórz **HACS** w Home Assistant.
2. Przejdź do **Settings** (menu w prawym górnym rogu).
3. Otwórz **Custom repositories**.
4. Dodaj URL tego repozytorium.
5. Wybierz kategorię: **Dashboard**.
6. Zapisz.

### 2) Zainstaluj kartę

1. W HACS otwórz **Dashboard**.
2. Wyszukaj **Home Assistant Heating Control Card**.
3. Kliknij **Download**.
4. Zrestartuj Home Assistant (zalecane po pierwszej instalacji).

### 3) Dodaj zasób (jeśli HACS nie doda go automatycznie)

Przejdź do **Settings → Dashboards → Resources** i dodaj:

- **URL**: `/hacsfiles/ha-heat-design/ha-heat-design.js`
- **Type**: `JavaScript Module`

> Jeśli slug repozytorium jest inny, dostosuj ścieżkę.

> Obsługa starej ścieżki: jeśli używasz już `/hacsfiles/ha-heat-design/ha-heat-design.js`, nadal działa jako loader kompatybilności.

## Instalacja ręczna (alternatywa)

1. Skopiuj `heating-control-card.js` do `/config/www/` (lub oba pliki, jeśli chcesz zachować kompatybilność ze starymi ścieżkami).
2. Dodaj ten zasób:
   - URL: `/local/ha-heat-design.js`
   - Type: `JavaScript Module`

---

## Użycie w YAML dashboardu

```yaml
type: custom:heating-control-card
name: Salon
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


## Konfiguracja przez edytor UI

Teraz możesz skonfigurować kartę bezpośrednio w **edytorze UI** Home Assistant (dla większości opcji bez ręcznego YAML).

![Configuration via Home Assistant UI editor](images/configurations.png)

### Opcje karty

| Opcja | Wymagane | Domyślnie | Opis |
|---|---|---:|---|
| `type` | tak | - | Musi mieć wartość `custom:heating-control-card` |
| `entity` | tak | - | Encja climate, np. `climate.living_room` |
| `name` | nie | `Heater` | Etykieta wyświetlana w stopce |
| `humidity_entity` | nie | - | Encja sensora wilgotności |
| `min_temp` | nie | `16` | Minimalna wartość suwaka |
| `max_temp` | nie | `28` | Maksymalna wartość suwaka |
| `step` | nie | `0.5` | Krok suwaka |
| `background_start` | nie | `#ffa20f` | Górny kolor gradientu (fallback tła) |
| `background_end` | nie | `#ff9800` | Dolny kolor gradientu |
| `slider_orientation` | nie | `vertical` | Orientacja suwaka: `vertical` lub `horizontal` |
| `slider_orientation_mobile` | nie | - | Mobilny override orientacji (`vertical` lub `horizontal`) |
| `slider_orientation_desktop` | nie | - | Desktopowy override orientacji (`vertical` lub `horizontal`) |
| `desktop_layout` | nie | `standard` | Gęstość layoutu desktop: `standard` lub `compact` |
| `heating_on_mode` | nie | `heat` | Tryb HVAC używany przy przełączaniu OFF → ON |

---

## Uwagi

- To jest **frontendowa karta** Lovelace (kategoria Dashboard w HACS).
- `entity` musi wskazywać na poprawną encję `climate`.
- Jeśli `humidity_entity` brak lub jest niedostępna, wilgotność będzie pokazana jako `--`.
- `slider_orientation_mobile` i `slider_orientation_desktop` nadpisują `slider_orientation` zależnie od szerokości viewportu.
- `desktop_layout: compact` wpływa tylko na widok desktop i nie zmienia widoku mobilnego.

---

## Szybki start

1. Zainstaluj przez HACS (kategoria Dashboard).
2. Dodaj zasób (jeśli potrzeba): `/hacsfiles/ha-heat-design/ha-heat-design.js`
3. Dodaj kartę:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Salon
```

## Lokalizacja

Interfejs karty i edytor wizualny automatycznie obsługują:
angielski, niemiecki, francuski, hiszpański, włoski, polski, niderlandzki i czeski.

---

## Więcej projektów

- Szukasz pasującego projektu dashboardu do sterowania klimatem/ogrzewaniem? Sprawdź mój drugi projekt:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design

## Wsparcie

- Jeśli podoba Ci się ten projekt i chcesz wesprzeć moją pracę, możesz przekazać darowiznę tutaj:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
