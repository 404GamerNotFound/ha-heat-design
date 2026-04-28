# Home Assistant Heating Control Card (Español)

Una **tarjeta de panel Lovelace** personalizada para Home Assistant, inspirada en el diseño naranja de termostato de la imagen de referencia.

![Heating control card design](images/design.png)

## Idiomas

- 🇬🇧 English (predeterminado): [`README.md`](README.md)
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: [`README.fr.md`](README.fr.md)
- 🇪🇸 Español: `README.es.md`
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)

## Qué hace esta tarjeta

- Muestra la **temperatura actual** de tu entidad `climate`.
- Muestra la **temperatura objetivo** y te permite cambiarla con un slider.
- Permite activar/desactivar la calefacción directamente desde la tarjeta.
- Muestra **humedad** opcional desde un sensor separado.
- Muestra el estado HVAC actual (`heat`, `idle`, etc.).
- Muestra un estado de vista previa en el selector de tarjetas del dashboard.
- Llama al servicio de Home Assistant `climate.set_temperature`.
- Llama a `climate.set_hvac_mode` al alternar la calefacción.

---

## Instalar con HACS (recomendado)

### 1) Añadir este repositorio como repositorio personalizado

1. Abre **HACS** en Home Assistant.
2. Ve a **Settings** (menú arriba a la derecha).
3. Abre **Custom repositories**.
4. Añade la URL de este repositorio.
5. Selecciona la categoría: **Dashboard**.
6. Guarda.

### 2) Instalar la tarjeta

1. En HACS, abre **Dashboard**.
2. Busca **Home Assistant Heating Control Card**.
3. Haz clic en **Download**.
4. Reinicia Home Assistant (recomendado tras la primera instalación).

### 3) Añadir el recurso (si HACS no lo añade automáticamente)

Ve a **Settings → Dashboards → Resources** y añade:

- **URL**: `/hacsfiles/ha-heat-design/ha-heat-design.js`
- **Type**: `JavaScript Module`

> Si el slug de tu repositorio es distinto, ajusta la ruta.

> Compatibilidad con ruta antigua: si ya usas `/hacsfiles/ha-heat-design/ha-heat-design.js`, seguirá funcionando como cargador de compatibilidad.

## Instalación manual (alternativa)

1. Copia `heating-control-card.js` en `/config/www/` (o ambos archivos si quieres mantener compatibilidad con rutas antiguas).
2. Añade este recurso:
   - URL: `/local/ha-heat-design.js`
   - Type: `JavaScript Module`

---

## Uso en YAML del dashboard

```yaml
type: custom:heating-control-card
name: Sala
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


## Configuración con el editor UI

Ahora puedes configurar la tarjeta directamente en el **editor UI** de Home Assistant (sin YAML manual para la mayoría de opciones).

![Configuration via Home Assistant UI editor](images/configurations.png)

### Opciones de la tarjeta

| Opción | Requerido | Predeterminado | Descripción |
|---|---|---:|---|
| `type` | sí | - | Debe ser `custom:heating-control-card` |
| `entity` | sí | - | Entidad climate, p. ej. `climate.living_room` |
| `name` | no | `Heater` | Etiqueta mostrada en el pie |
| `humidity_entity` | no | - | Entidad de sensor para humedad |
| `min_temp` | no | `16` | Valor mínimo del slider |
| `max_temp` | no | `28` | Valor máximo del slider |
| `step` | no | `0.5` | Incremento del slider |
| `background_start` | no | `#ffa20f` | Color superior del degradado (también fallback sólido) |
| `background_end` | no | `#ff9800` | Color inferior del degradado |
| `slider_orientation` | no | `vertical` | Orientación del slider: `vertical` o `horizontal` |
| `slider_orientation_mobile` | no | - | Override móvil para orientación (`vertical` o `horizontal`) |
| `slider_orientation_desktop` | no | - | Override desktop para orientación (`vertical` o `horizontal`) |
| `desktop_layout` | no | `standard` | Densidad de layout desktop: `standard` o `compact` |
| `heating_on_mode` | no | `heat` | Modo HVAC usado al cambiar de OFF a ON |

---

## Notas

- Esta es una **tarjeta frontend** Lovelace (categoría Dashboard en HACS).
- `entity` debe apuntar a una entidad `climate` válida.
- Si `humidity_entity` falta o no está disponible, la humedad se muestra como `--`.
- `slider_orientation_mobile` y `slider_orientation_desktop` sobrescriben `slider_orientation` según el ancho del viewport.
- `desktop_layout: compact` solo afecta a la vista desktop y mantiene la vista móvil sin cambios.

---

## Inicio rápido

1. Instala con HACS (categoría Dashboard).
2. Añade el recurso (si hace falta): `/hacsfiles/ha-heat-design/ha-heat-design.js`
3. Añade la tarjeta:

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Sala
```

## Localización

La interfaz de la tarjeta y el editor visual admiten automáticamente:
inglés, alemán, francés, español, italiano, polaco, neerlandés y checo.

---

## Más proyectos

- ¿Buscas el diseño de dashboard a juego para control de clima/calefacción? Revisa mi otro proyecto:  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design

## Apóyame

- Si te gusta este proyecto y quieres apoyar mi trabajo, puedes donar aquí:  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
