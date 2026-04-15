# Home Assistant Heating Control Card (Français)

Une **carte de tableau de bord Lovelace** personnalisée pour Home Assistant, inspirée du design de thermostat orange de l'image de référence.

![Heating control card design](images/design.png)

## Langues

- 🇬🇧 English (par défaut): [`README.md`](README.md)
- 🇩🇪 Deutsch: [`README.de.md`](README.de.md)
- 🇫🇷 Français: `README.fr.md`
- 🇪🇸 Español: [`README.es.md`](README.es.md)
- 🇮🇹 Italiano: [`README.it.md`](README.it.md)
- 🇵🇱 Polski: [`README.pl.md`](README.pl.md)
- 🇳🇱 Nederlands: [`README.nl.md`](README.nl.md)
- 🇨🇿 Čeština: [`README.cs.md`](README.cs.md)

## Ce que fait cette carte

- Affiche la **température actuelle** de votre entité `climate`.
- Affiche la **température cible** et permet de la modifier avec un slider.
- Permet d'activer/désactiver le chauffage directement depuis la carte.
- Affiche l'**humidité** en option depuis un capteur séparé.
- Affiche l'état HVAC actuel (`heat`, `idle`, etc.).
- Affiche un état de prévisualisation dans le sélecteur de cartes du dashboard.
- Appelle le service Home Assistant `climate.set_temperature`.
- Appelle `climate.set_hvac_mode` lors du basculement du chauffage.

---

## Installation avec HACS (recommandée)

### 1) Ajouter ce dépôt comme dépôt personnalisé

1. Ouvrez **HACS** dans Home Assistant.
2. Allez dans **Settings** (menu en haut à droite).
3. Ouvrez **Custom repositories**.
4. Ajoutez l'URL de ce dépôt.
5. Sélectionnez la catégorie **Dashboard**.
6. Enregistrez.

### 2) Installer la carte

1. Dans HACS, ouvrez **Dashboard**.
2. Recherchez **Home Assistant Heating Control Card**.
3. Cliquez sur **Download**.
4. Redémarrez Home Assistant (recommandé après la première installation).

### 3) Ajouter la ressource (si HACS ne l'ajoute pas automatiquement)

Allez dans **Settings → Dashboards → Resources** et ajoutez :

- **URL**: `/hacsfiles/ha-heat-design/heating-control-card.js`
- **Type**: `JavaScript Module`

> Si le slug de votre dépôt est différent, adaptez le chemin.

> Compatibilité ancien chemin : si vous utilisez déjà `/hacsfiles/ha-heat-design/ha-heat-design.js`, il fonctionne toujours comme loader de compatibilité.

## Installation manuelle (alternative)

1. Copiez `heating-control-card.js` dans `/config/www/` (ou les deux fichiers si vous voulez garder la compatibilité avec les anciens chemins de ressource).
2. Ajoutez cette ressource :
   - URL: `/local/heating-control-card.js`
   - Type: `JavaScript Module`

---

## Utilisation dans le YAML du dashboard

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

## Configuration avec l'éditeur UI

Vous pouvez maintenant configurer la carte directement dans l'**éditeur UI** de Home Assistant (pas de YAML manuel nécessaire pour la plupart des options).

![Configuration via Home Assistant UI editor](images/configurations.png)

### Options de la carte

| Option | Requis | Défaut | Description |
|---|---|---:|---|
| `type` | oui | - | Doit être `custom:heating-control-card` |
| `entity` | oui | - | Entité climate, ex. `climate.living_room` |
| `name` | non | `Heater` | Libellé affiché dans le footer |
| `humidity_entity` | non | - | Entité capteur pour l'humidité |
| `min_temp` | non | `16` | Valeur minimale du slider |
| `max_temp` | non | `28` | Valeur maximale du slider |
| `step` | non | `0.5` | Incrément du slider |
| `background_start` | non | `#ffa20f` | Couleur haute du dégradé (aussi utilisée comme fallback) |
| `background_end` | non | `#ff9800` | Couleur basse du dégradé |
| `slider_orientation` | non | `vertical` | Orientation du slider: `vertical` ou `horizontal` |
| `slider_orientation_mobile` | non | - | Override mobile de l'orientation (`vertical` ou `horizontal`) |
| `slider_orientation_desktop` | non | - | Override desktop de l'orientation (`vertical` ou `horizontal`) |
| `desktop_layout` | non | `standard` | Densité de layout desktop: `standard` ou `compact` |
| `heating_on_mode` | non | `heat` | Mode HVAC utilisé lors du passage OFF → ON |

---

## Notes

- C'est une **carte frontend** Lovelace (catégorie Dashboard dans HACS).
- `entity` doit pointer vers une entité `climate` valide.
- Si `humidity_entity` est absent ou indisponible, l'humidité est affichée comme `--`.
- `slider_orientation_mobile` et `slider_orientation_desktop` remplacent `slider_orientation` selon la largeur du viewport.
- `desktop_layout: compact` affecte seulement la vue desktop et conserve la vue mobile.

---

## Démarrage rapide

1. Installer via HACS (catégorie Dashboard).
2. Ajouter la ressource (si nécessaire) : `/hacsfiles/ha-heat-design/heating-control-card.js`
3. Ajouter la carte :

```yaml
type: custom:heating-control-card
entity: climate.living_room
name: Salon
```

## Localisation

L'interface de la carte et l'éditeur visuel prennent automatiquement en charge :
anglais, allemand, français, espagnol, italien, polonais, néerlandais et tchèque.

---

## Plus de projets

- Vous cherchez le design de dashboard correspondant pour le contrôle du chauffage/climat ? Découvrez mon autre projet :  
  **ha-button-design** → https://github.com/404GamerNotFound/ha-button-design

## Me soutenir

- Si vous aimez ce projet et voulez soutenir mon travail, vous pouvez faire un don ici :  
  **PayPal** → https://www.paypal.com/paypalme/TonyBrueser
