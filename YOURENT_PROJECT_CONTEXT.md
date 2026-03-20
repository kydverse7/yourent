# YOURENT — Fichier de contexte projet
> **À placer à la racine du nouveau projet.** Ce fichier est le brief complet pour tout agent IA,
> développeur ou outil générant du code sur ce projet. Il prime sur toute autre instruction.

---

## 1. IDENTITÉ DU PROJET

| Champ | Valeur |
|---|---|
| Nom de l'app | **Yourent** |
| Type | SaaS de location de voitures — usage interne agence + site public client |
| Marché | **Maroc** (devise MAD, timezone Africa/Casablanca, docs CIN marocaine) |
| Taille agence | ~60 véhicules |
| Multi-tenant | ❌ Non — une seule agence, configuration singleton |
| Paiement en ligne | ❌ Non — tout se passe en agence (espèces, carte, virement, chèque) |
| Langue principale | Français (support Arabe RTL prévu en v2) |

---

## 2. RÈGLES MÉTIER ABSOLUES (ne jamais violer)

### 2.1 Caution — exclue des finances
```
La caution EST une garantie, PAS un revenu.

RÈGLE : Tout paiement avec categorie IN ['caution', 'caution_restitution']
        doit être EXCLU de TOUS les calculs financiers :
        - Dashboard revenus
        - Page Finances (CA, marge, graphiques)
        - Export CSV/Excel
        - Tableau rentabilité par véhicule

Filtre MongoDB obligatoire sur toutes les requêtes stats :
  { categorie: { $nin: ['caution', 'caution_restitution'] } }

La caution a son propre affichage dans la page Locations uniquement.
```

### 2.2 Types de caution — uniquement 3
```
cheque        → numéro de chèque obligatoire (referenceDoc)
carte_empreinte → 4 derniers chiffres carte + mention "pré-autorisation UNIQUEMENT"
cash          → espèces conservées physiquement en agence
```
Pas de Stripe. Pas de paiement CB en ligne. Jamais.

### 2.3 Mono-agence
```
Le modèle Agence est un singleton (jamais plus d'un document).
Pas de plan, pas de slug multi-tenant, pas d'agenceId sur les entités.
```

### 2.4 Paiements — modes acceptés en agence
```
especes | carte | virement | cheque
(pas de 'stripe', pas de PayDunya, pas de CMI)
```

---

## 3. STACK TECHNIQUE

```
Framework      : Next.js 15+ — App Router, TypeScript strict, Server Components par défaut
Base de données: MongoDB Atlas + Mongoose (ODM)
Auth           : NextAuth.js v5 (Credentials) — UN seul système JWT, cookies HttpOnly
Styles         : Tailwind CSS v4 + shadcn/ui
State          : Zustand (stores) + TanStack Query v5 (data fetching)
Upload         : Cloudinary SDK v2
PDF            : @react-pdf/renderer
Notifications  : Resend (email) + Twilio (SMS/WhatsApp)
Cache/RL       : Upstash Redis (@upstash/redis) — sliding window rate limiting
Validation     : Zod (schémas partagés front/back dans lib/validators/)
Tests          : Vitest (unitaires) + Playwright (E2E)
Lint/Format    : ESLint strict + Prettier
CI             : GitHub Actions (lint → typecheck → test → build → smoke)
Déploiement    : Vercel ou Docker
```

---

## 4. DESIGN SYSTEM

### 4.1 Back-office (dashboard agence) — Thème "Luxe Noir & Or"

L'interface agence doit inspirer le **luxe premium, confiance, autorité**.
Inspiré : dashboards Bentley, hôtels 5 étoiles, plateformes finance haut de gamme.

#### Palette exacte
```css
/* Or */
--gold:           #C9A84C;   /* couleur principale — boutons, accents, KPIs */
--gold-light:     #E8C97A;   /* hover, highlights, icônes actives */
--gold-dark:      #9B7B2E;   /* pressed, états actifs profonds */
--gold-glow:      rgba(201,168,76,0.15); /* glow subtil sur hover cards */

/* Noirs & gris profonds */
--bg-root:        #0A0A0A;   /* fond body principal */
--bg-card:        #111111;   /* fond de toutes les cartes */
--bg-surface:     #1A1A1A;   /* inputs, dropdowns, tooltips */
--bg-sidebar:     #0D0D0D;   /* sidebar fond */
--border:         #2A2A2A;   /* bordures subtiles */
--border-muted:   #1E1E1E;   /* séparateurs légers */

/* Textes */
--text-primary:   #F5F0E8;   /* blanc crème (jamais blanc pur) */
--text-secondary: #A89880;   /* gris doré — labels, sous-titres */
--text-muted:     #6B5E4E;   /* placeholders, textes désactivés */

/* Statuts adaptés au fond sombre */
--green:          #4ADE80;   /* disponible, succès */
--amber:          #FBBF24;   /* warning, en attente (proche or) */
--red:            #F87171;   /* erreur, maintenance, blacklist */
--blue:           #60A5FA;   /* info, en cours */

/* Blanc pur — utilisé avec parcimonie pour contraste maximum */
--white:          #FFFFFF;
```

#### Règles de composants
```
BODY / ROOT
  background: #0A0A0A
  color: #F5F0E8
  font-family: Inter, system-ui

SIDEBAR (240px / 64px collapsed)
  background: #0D0D0D
  border-right: 1px solid #1E1E1E
  Logo Yourent: texte #C9A84C, taille 1.4rem, font-weight 700
  Item inactif: icône #6B5E4E, texte #A89880
  Item actif: border-left 3px solid #C9A84C, background #C9A84C12, icône + texte #C9A84C
  Item hover: background #1A1A1A, texte #F5F0E8

HEADER (64px, sticky top)
  background: rgba(10,10,10,0.85)
  backdrop-filter: blur(12px)
  border-bottom: 1px solid #1E1E1E
  Breadcrumb: texte #6B5E4E → #A89880 (dernier item #C9A84C)
  Avatar: ring 2px #C9A84C

CARTES KPI
  background: #111111
  border: 1px solid #2A2A2A
  border-top: 2px solid #C9A84C
  border-radius: 12px
  Chiffre principal: font-size 2rem, font-weight 700, color #C9A84C
  Label: color #A89880, font-size 0.85rem
  Tendance positive: color #4ADE80 ↑
  Tendance négative: color #F87171 ↓

BOUTONS PRIMAIRES
  background: linear-gradient(135deg, #C9A84C, #9B7B2E)
  color: #0A0A0A (noir sur fond doré)
  border: none
  border-radius: 8px
  font-weight: 600
  box-shadow: 0 0 20px rgba(201,168,76,0.2)
  hover: brightness 1.1 + shadow intensifié

BOUTONS SECONDAIRES
  background: transparent
  border: 1px solid #C9A84C
  color: #C9A84C
  hover: background #C9A84C12

BOUTONS DANGER
  background: transparent
  border: 1px solid #F87171
  color: #F87171
  hover: background rgba(248,113,113,0.1)

INPUTS / SELECT / TEXTAREA
  background: #1A1A1A
  border: 1px solid #2A2A2A
  border-radius: 8px
  color: #F5F0E8
  placeholder: #6B5E4E
  focus: border-color #C9A84C, box-shadow 0 0 0 3px rgba(201,168,76,0.15)

TABLES
  thead: background #0D0D0D, color #A89880, font-size 0.8rem, uppercase, letter-spacing 0.08em
  tbody tr: border-bottom 1px solid #1E1E1E
  tbody tr:hover: background #C9A84C08
  Cellules: color #F5F0E8
  Zebra: row-pair #111111, row-impair #0F0F0F

BADGES
  Disponible:   bg rgba(74,222,128,0.15), text #4ADE80, border rgba(74,222,128,0.3)
  Loué:         bg rgba(96,165,250,0.15), text #60A5FA, border rgba(96,165,250,0.3)
  Réservé:      bg rgba(201,168,76,0.15), text #C9A84C, border rgba(201,168,76,0.3)
  Maintenance:  bg rgba(248,113,113,0.15), text #F87171, border rgba(248,113,113,0.3)
  En attente:   bg rgba(251,191,36,0.15), text #FBBF24, border rgba(251,191,36,0.3)
  Terminé:      bg rgba(107,94,78,0.15),  text #A89880, border rgba(107,94,78,0.3)

MODALES
  overlay: rgba(0,0,0,0.8)
  panel: background #111111, border 1px solid #2A2A2A, border-radius 16px
  header modal: border-bottom 1px solid #1E1E1E, titre #F5F0E8
  fermeture ESC + clic overlay + bouton ×

TOASTS (position: bottom-right)
  background: #1A1A1A
  border-left: 3px solid (vert succès | or warning | rouge erreur)
  texte: #F5F0E8
  durée: 4s auto-dismiss

SKELETON LOADERS
  background: linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%)
  animation: shimmer 1.5s infinite

SCROLLBAR (custom webkit)
  track: #0A0A0A
  thumb: #2A2A2A, hover #C9A84C40
  width: 6px

GRAPHIQUES (recharts)
  Courbe revenus: stroke #C9A84C, strokeWidth 2
  Barres: fill #C9A84C (revenus), fill #F87171 (dépenses)
  Grille: stroke #1E1E1E
  Axes: color #6B5E4E
  Tooltip: background #1A1A1A, border #2A2A2A, texte #F5F0E8

ANIMATIONS
  Transitions: 200ms ease sur tous les états hover/focus
  Cards hover: translateY(-2px) + shadow or intensifiée
  Boutons hover: scale 1.01
  Sidebar item: transition couleur 150ms
```

#### Typographie
```
Titres H1-H2 : Inter, font-weight 700, color #F5F0E8
Titres H3-H4 : Inter, font-weight 600, color #F5F0E8
Corps texte  : Inter, font-weight 400, color #F5F0E8
Labels form  : Inter, font-weight 500, color #A89880, font-size 0.875rem
Montants/KPI : Inter, font-weight 700, color #C9A84C, tabular-nums
Code/Ref     : JetBrains Mono, color #C9A84C
```

---

### 4.2 Site public (catalogue + réservation) — Thème "Futuriste Luxe Or"

Le site public doit **couper le souffle** au visiteur. Effet premium, comme un configurateur
de voiture de luxe. Inspiré : Lamborghini.com, Rolls-Royce, Bentley Motors configurateur.

#### Ambiance visuelle
```
Fond général   : dégradé radial noir profond → anthracite
                 background: radial-gradient(ellipse at 50% 0%, #1A1208 0%, #0A0A0A 60%, #000000 100%)
Particules     : petites étoiles/particules dorées animées (canvas subtle, opacity 0.3)
Lignes de grille: grille perspective futuriste très subtile (opacity 0.05)
Lueur or       : glow doux #C9A84C sur les éléments actifs / CTA
```

#### Section Hero
```css
/* Fond hero */
background: linear-gradient(
  to bottom,
  rgba(0,0,0,0) 0%,
  rgba(0,0,0,0.4) 50%,
  #0A0A0A 100%
), url('[photo-voiture-premium]') center/cover no-repeat;

/* Titre principal */
font-size: clamp(3rem, 8vw, 7rem);
font-weight: 900;
letter-spacing: -0.02em;
background: linear-gradient(135deg, #FFFFFF 0%, #C9A84C 40%, #E8C97A 60%, #FFFFFF 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
/* → effet texte dégradé blanc → or → blanc */

/* Sous-titre */
color: #A89880;
font-size: 1.2rem;
letter-spacing: 0.1em;
text-transform: uppercase;

/* CTA bouton hero */
background: linear-gradient(135deg, #C9A84C, #9B7B2E);
color: #000;
font-weight: 700;
padding: 1rem 2.5rem;
border-radius: 4px; /* coins moins arrondis = style luxe */
box-shadow: 0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15);
letter-spacing: 0.08em;
text-transform: uppercase;
transition: all 0.3s ease;
hover: box-shadow 0 0 60px rgba(201,168,76,0.6) + scale(1.02)

/* Badge "Yourent" au-dessus du titre */
border: 1px solid #C9A84C40;
background: rgba(201,168,76,0.08);
backdrop-filter: blur(8px);
color: #C9A84C;
font-size: 0.75rem;
letter-spacing: 0.3em;
text-transform: uppercase;
padding: 0.4rem 1.2rem;
border-radius: 100px;
```

#### Cards véhicules (catalogue)
```css
/* Carte véhicule */
background: linear-gradient(145deg, #141414, #0F0F0F);
border: 1px solid #1E1E1E;
border-radius: 12px;
overflow: hidden;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Photo container */
aspect-ratio: 16/10;
overflow: hidden;
position: relative;

/* Overlay dégradé sur photo (bas de carte) */
background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);

/* Badge catégorie */
position: absolute; top: 12px; left: 12px;
background: rgba(201,168,76,0.15);
border: 1px solid rgba(201,168,76,0.4);
backdrop-filter: blur(8px);
color: #C9A84C;
font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;

/* Prix (overlay bas photo) */
position: absolute; bottom: 12px; right: 12px;
font-size: 1.6rem; font-weight: 700;
color: #C9A84C;
span "/ jour" : color #A89880, font-size 0.9rem

/* Footer carte */
padding: 16px;
background: #111111;
border-top: 1px solid #1E1E1E;
Nom véhicule: color #F5F0E8, font-weight 600
Specs (icônes + texte): color #A89880, font-size 0.8rem

/* Bouton "Réserver" */
width: 100%;
background: transparent;
border: 1px solid #C9A84C30;
color: #C9A84C;
border-radius: 6px;
margin-top: 12px;
font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase;
transition: all 0.3s;

/* Hover carte complète */
transform: translateY(-4px);
border-color: #C9A84C40;
box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.08);
photo: scale(1.05) (transition 0.6s);
bouton: background #C9A84C, color #000, border none;
```

#### Navigation publique
```css
/* Header sticky */
background: rgba(0,0,0,0.7);
backdrop-filter: blur(20px) saturate(180%);
border-bottom: 1px solid rgba(201,168,76,0.1);

/* Logo */
font-family: Inter;
font-weight: 900;
font-size: 1.5rem;
letter-spacing: -0.02em;
color: transparent;
background: linear-gradient(90deg, #C9A84C, #E8C97A);
-webkit-background-clip: text;
/* → "YOURENT" en dégradé or vivant */

/* Liens nav */
color: #A89880;
hover: color #C9A84C;
transition: 200ms;

/* CTA nav "Réserver" */
border: 1px solid #C9A84C;
color: #C9A84C;
padding: 0.5rem 1.2rem;
border-radius: 4px;
hover: background #C9A84C, color #000;
```

#### Section filtres catalogue
```css
background: rgba(17,17,17,0.8);
border: 1px solid #1E1E1E;
backdrop-filter: blur(10px);
border-radius: 12px;
Boutons filtres actifs: background #C9A84C, color #000
Boutons filtres inactifs: transparent, border #2A2A2A, color #A89880
```

#### Page fiche véhicule
```css
/* Galerie principale */
background: #0A0A0A;
Photo active: border 1px solid #C9A84C40;
Thumbnails: border 1px solid transparent, hover border #C9A84C40;
Thumbnail active: border 1px solid #C9A84C;

/* Bloc prix & tarifs */
background: linear-gradient(135deg, #141414, #111111);
border: 1px solid #C9A84C20;
border-radius: 12px;

Tableau tarifs:
  header: color #A89880, text-transform uppercase, font-size 0.75rem
  Prix/jour: color #C9A84C, font-weight 700, font-size 1.2rem
  Durée active (calculée): background #C9A84C15, border-left 2px solid #C9A84C

/* Formulaire réservation (sticky droite) */
background: #111111;
border: 1px solid #2A2A2A;
border-radius: 16px;
padding: 24px;

  Date picker: fond #1A1A1A, jours indisponibles grisés
  Jours sélectionnés: background #C9A84C20, border #C9A84C
  "Jour actuel" ring: #C9A84C

  Calcul prix dynamique:
    box: background #0D0D0D, border #C9A84C20, border-radius 8px
    Ligne "Total estimé": font-size 1.4rem, color #C9A84C, font-weight 700
    Note "Paiement en agence": color #A89880, font-size 0.8rem, italic

  CTA "Demander une réservation":
    → style identique au CTA hero (dégradé or, texte noir, glow)
    → full-width dans le panel

/* Options supplémentaires */
Checkbox custom: checked = fond #C9A84C, coche noire
Label: color #F5F0E8
Prix option: color #C9A84C
```

#### Page confirmation réservation
```css
/* Icône succès animée */
width: 80px; height: 80px;
border-radius: 50%;
background: rgba(201,168,76,0.1);
border: 2px solid #C9A84C;
animation: pulse-gold 2s infinite;

@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4); }
  50%       { box-shadow: 0 0 0 20px rgba(201,168,76,0); }
}

/* Checkmark SVG */
stroke: #C9A84C;
animation: draw 0.6s ease forwards;

/* Récap réservation */
background: #111111;
border: 1px solid #1E1E1E;
border-left: 3px solid #C9A84C;
border-radius: 8px;

/* Message "Nous vous contactons sous 30 min" */
color: #A89880;
```

#### Footer public
```css
background: #060606;
border-top: 1px solid #1E1E1E;
Logo: dégradé or (même que nav)
Liens: color #6B5E4E, hover #C9A84C
Texte copyright: color #3A3A3A
Ligne décorative top: 1px solid rgba(201,168,76,0.2)
```

---

## 5. STRUCTURE DU PROJET

```
yourent/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx             — connexion agence (fond noir, form centré)
│   ├── (dashboard)/                   — back-office protégé (thème noir & or)
│   │   ├── layout.tsx                 — sidebar + header
│   │   ├── dashboard/page.tsx
│   │   ├── vehicles/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── new/page.tsx
│   │   ├── clients/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── new/page.tsx
│   │   ├── reservations/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── locations/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── planning/page.tsx
│   │   ├── payments/page.tsx
│   │   ├── expenses/page.tsx
│   │   ├── finances/page.tsx           — admin + comptable only
│   │   ├── maintenance/page.tsx
│   │   ├── etats-des-lieux/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── users/page.tsx              — admin only
│   │   ├── audit/page.tsx              — admin only
│   │   └── parametres/page.tsx         — admin only
│   ├── (public)/                       — site réservation (thème futuriste or)
│   │   ├── layout.tsx                  — nav publique + footer
│   │   ├── page.tsx                    — hero + catalogue
│   │   ├── [slug]/
│   │   │   ├── page.tsx                — fiche véhicule + form résa
│   │   │   └── components/
│   │   │       ├── VehicleGallery.tsx
│   │   │       ├── PricingTable.tsx
│   │   │       └── BookingForm.tsx
│   │   └── confirmation/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── agence/route.ts
│       ├── vehicles/
│       ├── clients/
│       ├── reservations/
│       ├── locations/
│       ├── payments/
│       ├── expenses/
│       ├── maintenance/
│       ├── edl/
│       ├── finances/
│       ├── planning/
│       ├── users/
│       ├── audit/
│       ├── notifications/
│       ├── public/
│       │   ├── catalog/route.ts
│       │   ├── vehicle/[slug]/route.ts
│       │   ├── availability/[slug]/route.ts
│       │   └── reserve/route.ts        — PAS de paiement en ligne
│       └── upload/route.ts
├── components/
│   ├── ui/                             — shadcn/ui re-thémés noir & or
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── KpiCard.tsx
│   │   ├── DataTable.tsx               — table générique paginée
│   │   ├── CautionModal.tsx            — 3 types: chèque / carte_empreinte / cash
│   │   ├── QuickPayModal.tsx
│   │   └── ConfirmModal.tsx            — remplace window.confirm
│   ├── public/
│   │   ├── HeroSection.tsx
│   │   ├── VehicleCard.tsx             — card catalogue (style futuriste or)
│   │   ├── FilterBar.tsx
│   │   ├── DateRangePicker.tsx
│   │   ├── BookingFormPanel.tsx
│   │   └── ConfirmationPage.tsx
│   └── shared/
│       ├── GoldButton.tsx              — bouton dégradé or réutilisable
│       ├── GoldBadge.tsx
│       ├── PageHeader.tsx
│       └── Toaster.tsx                 — toast noir & or
├── lib/
│   ├── auth.ts                         — NextAuth v5 config
│   ├── db.ts                           — Mongoose singleton
│   ├── redis.ts                        — Upstash Redis
│   ├── csrf.ts                         — assertSameOrigin
│   ├── rateLimit.ts                    — sliding window Redis
│   ├── cloudinary.ts
│   ├── pdf.ts                          — @react-pdf/renderer
│   ├── notifications.ts                — Resend + Twilio
│   ├── env.ts                          — validation Zod des variables d'env
│   └── validators/
│       ├── vehicle.schema.ts
│       ├── client.schema.ts
│       ├── reservation.schema.ts
│       ├── location.schema.ts
│       ├── payment.schema.ts
│       └── caution.schema.ts           — cheque | carte_empreinte | cash
├── models/
│   ├── Vehicle.ts
│   ├── Client.ts
│   ├── Reservation.ts
│   ├── Location.ts
│   ├── Payment.ts
│   ├── EtatDesLieux.ts
│   ├── Maintenance.ts
│   ├── Expense.ts
│   ├── Notification.ts
│   ├── AuditLog.ts
│   ├── User.ts
│   └── Agence.ts                       — singleton, 1 seul document
├── services/
│   ├── auditService.ts
│   ├── cautionService.ts               — logique caution séparée des finances
│   ├── financeService.ts               — TOUJOURS exclut categorie caution
│   └── notificationService.ts
├── stores/
│   ├── uiStore.ts                      — sidebar state, modales globales
│   └── filterStore.ts                  — filtres persistants par page
├── hooks/
│   ├── useVehicles.ts
│   ├── useLocations.ts
│   ├── useCaution.ts
│   └── useFinances.ts
├── types/
│   ├── vehicle.ts
│   ├── client.ts
│   ├── location.ts
│   ├── payment.ts                      — PaymentCategorie exclut caution des finances
│   └── caution.ts                      — CautionType: 'cheque' | 'carte_empreinte' | 'cash'
├── scripts/
│   ├── seed.mjs                        — données initiales agence + 5 véhicules
│   └── smoke.mjs                       — 16 scénarios critiques
├── __tests__/
│   ├── unit/
│   └── e2e/
├── public/
│   ├── logo-yourent.svg                — logo or sur transparent
│   └── car-schema.svg                  — schéma voiture pour état des lieux
├── tailwind.config.ts                  — palette gold + noir étendue
├── middleware.ts                       — protection routes dashboard + redirections
├── next.config.ts
├── env.example                         — liste toutes les variables nécessaires
└── YOURENT_PROJECT_CONTEXT.md          — CE FICHIER (contexte projet)
```

---

## 6. TAILWIND CONFIG (palette étendue)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C97A',
          dark:    '#9B7B2E',
          muted:   'rgba(201,168,76,0.15)',
          glow:    'rgba(201,168,76,0.08)',
        },
        noir: {
          root:    '#0A0A0A',
          card:    '#111111',
          surface: '#1A1A1A',
          sidebar: '#0D0D0D',
          border:  '#2A2A2A',
          muted:   '#1E1E1E',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted:   '#A89880',
          faint:   '#6B5E4E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C9A84C, #9B7B2E)',
        'gold-text':        'linear-gradient(135deg, #FFFFFF 0%, #C9A84C 40%, #E8C97A 60%, #FFFFFF 100%)',
        'hero-radial':      'radial-gradient(ellipse at 50% 0%, #1A1208 0%, #0A0A0A 60%, #000000 100%)',
      },
      boxShadow: {
        'gold':         '0 0 20px rgba(201,168,76,0.2)',
        'gold-lg':      '0 0 40px rgba(201,168,76,0.4)',
        'gold-xl':      '0 0 80px rgba(201,168,76,0.15)',
        'card':         '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':   '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.08)',
      },
      animation: {
        'shimmer':      'shimmer 1.5s infinite',
        'pulse-gold':   'pulse-gold 2s infinite',
        'fade-in':      'fade-in 0.3s ease',
        'slide-up':     'slide-up 0.3s ease',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':      { boxShadow: '0 0 0 20px rgba(201,168,76,0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(8px)', opacity: '0' },
          to:   { transform: 'translateY(0)',   opacity: '1' },
        },
      },
    },
  },
};
export default config;
```

---

## 7. VARIABLES D'ENVIRONNEMENT REQUISES

```env
# .env.local (à créer — ne jamais committer dans git)

# Base de données
MONGODB_URI=mongodb+srv://...

# Auth (NextAuth v5)
NEXTAUTH_SECRET=changeme-min-32-chars
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (photos véhicules)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend (emails)
RESEND_API_KEY=

# Twilio (SMS + WhatsApp)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
TWILIO_WHATSAPP_NUMBER=

# Upstash Redis (rate limiting + cache)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Yourent

# PAS DE STRIPE — paiement en agence uniquement
```

---

## 8. PHASES DE DÉVELOPPEMENT

### Phase 1 — Fondations (Semaine 1)
**Objectif : projet qui tourne, auth, base de données, design system**

- [ ] Init Next.js 15 + TypeScript strict + Tailwind v4 + shadcn/ui
- [ ] Config Tailwind palette or & noir (tailwind.config.ts complet)
- [ ] Connexion MongoDB Atlas (lib/db.ts singleton)
- [ ] Tous les modèles Mongoose (Vehicle, Client, Reservation, Location, Payment, EtatDesLieux, Maintenance, Expense, Agence, User, AuditLog, Notification)
- [ ] NextAuth v5 (login/logout/session/middleware)
- [ ] Layout dashboard : Sidebar + Header + toast system
- [ ] Page login stylisée noir & or
- [ ] lib/ : csrf, rateLimit (Upstash), validators (Zod), env (validation démarrage)
- [ ] Script seed.mjs (agence + admin + 5 véhicules)
- [ ] Variables d'env validées

### Phase 2 — CRUD véhicules & clients (Semaine 2)
**Objectif : gérer le parc + la clientèle**

- [ ] API + UI Véhicules : liste (grille/tableau), détail, créer, modifier, supprimer
- [ ] Upload photos Cloudinary (drag-and-drop multi, magic bytes check)
- [ ] Galerie véhicule avec réorganisation ordre
- [ ] API + UI Clients : liste (search), fiche détail, créer, modifier, supprimer
- [ ] Upload CIN recto/verso + permis recto/verso (Cloudinary)
- [ ] Système blacklist (modal avec motif obligatoire)
- [ ] Dashboard : KPIs de base (compteurs + skeleton loaders)
- [ ] Alertes maintenance : modèle alerts sur Vehicle + détection automatique

### Phase 3 — Flux de location complet (Semaine 3)
**Objectif : le cœur métier — de la réservation à la clôture**

- [ ] API + UI Réservations : CRUD + accept/reject/start/cancel
- [ ] Calcul prix automatique (paliers 1-14j / 15-29j / 30j+)
- [ ] Vérification chevauchement de dates (guard 409)
- [ ] Vérification blacklist (guard 403)
- [ ] Démarrage location : crée Location + EtatDesLieux avant
- [ ] API + UI Locations : liste, paiements rapides, caution (3 types), prolongation
- [ ] Modal caution : chèque (N° obligatoire) / carte empreinte (4 derniers chiffres) / cash
- [ ] Restitution caution partielle/totale
- [ ] Termination : garde état des lieux après obligatoire + saisie km retour
- [ ] EtatDesLieux : schéma SVG interactif + points de dommage + photos + signature canvas
- [ ] Génération PDF contrat (react-pdf, en-tête agence, infos client/véhicule, tarifs, caution)
- [ ] AuditLog sur toutes les mutations

### Phase 4 — Finances & Maintenance (Semaine 4)
**Objectif : pilotage financier + suivi technique**

- [ ] API + UI Paiements : historique paginé + modal détail + quick-pay + export CSV
- [ ] **⚠️ Finance : filtrage caution systématique sur TOUTES les requêtes stats**
- [ ] API + UI Dépenses : CRUD + catégories + upload facture
- [ ] Page Finances : rapport période, graphiques recharts (or/rouge), tableau rentabilité par véhicule, export XLSX
- [ ] Planning : FullCalendar timeline par véhicule (react-big-calendar)
- [ ] Maintenance : alertes cliquables → modal (effectué + prochaine échéance + coût)
- [ ] Facturation : PDF facture (numéro auto-incrémenté, lignes, total MAD)

### Phase 5 — Site public (Semaine 5)
**Objectif : vitrine et réservations en ligne (SANS paiement)**

- [ ] Layout public : nav sticky blur + footer (thème futuriste or)
- [ ] Page Hero : texte dégradé or, particules animées, CTA dégradé or
- [ ] Catalogue : grille véhicules avec filtres, cards style luxe futuriste
- [ ] Fiche véhicule : galerie, tableau tarifs, formulaire réservation sticky
- [ ] DateRangePicker : jours indisponibles grisés, calcul prix temps réel
- [ ] Formulaire : NOM / PRÉNOM / TEL (format +212) / EMAIL — **PAS de CB**
- [ ] Message clair : "Paiement en agence lors de la remise des clés"
- [ ] Guard anti-spam : honeypot + rate limit 5 req/10min/IP
- [ ] Page confirmation : checkmark doré animé, récap, "Nous vous contactons sous 30 min"
- [ ] SEO : meta, og:image, sitemap.xml, robots.txt
- [ ] Responsive parfait (mobile first)

### Phase 6 — Notifications & Paramètres (Semaine 5-6)
**Objectif : communication automatisée + config agence**

- [ ] Resend : email de confirmation/rejet réservation (template HTML noir & or)
- [ ] Twilio : SMS/WhatsApp confirmation + rappel J-1 + alerte retard
- [ ] Page Paramètres agence : logo, ICE, RC, adresse, conditions générales PDF, types caution acceptés
- [ ] Gestion Utilisateurs : agents + rôles (admin/agent/comptable) + invitation email
- [ ] Page Audit : journal paginé avec filtres + export CSV

### Phase 7 — Qualité & Production (Semaine 6-7)
**Objectif : zéro bug, prêt pour la mise en ligne**

- [ ] Tests Vitest : calcul prix, caution exclue des stats, validation Zod, concurrence dates
- [ ] Tests Playwright E2E : flux complet réservation → location → clôture
- [ ] CI GitHub Actions : lint → typecheck → test → build → smoke
- [ ] Script smoke.mjs : 16 scénarios API critiques
- [ ] Performance audit : Lighthouse > 85, bundle < 200kB gzippé/page
- [ ] Sécurité : CSRF sur toutes mutations, rate limit Redis, headers sécurité next.config
- [ ] README.md : setup complet, variables env, commandes
- [ ] Déploiement Vercel (ou Docker) + MongoDB Atlas prod

---

## 9. MODÈLES MONGOOSE COMPLETS

### Vehicle
```ts
{
  marque: String (required),
  modele: String (required),
  annee: Number,
  carburant: 'diesel' | 'essence' | 'hybride' | 'electrique',
  boite: 'manuelle' | 'automatique',
  places: Number (default: 5),
  couleur: String,
  categorie: 'economique' | 'berline' | 'suv' | 'premium' | 'utilitaire',
  immatriculation: String (required, unique),
  kilometrage: Number (default: 0),
  options: String[],            // ['GPS','siege_bebe','climatisation',...]
  slug: String (unique),        // URL publique
  statut: 'disponible' | 'loue' | 'reserve' | 'maintenance',
  photos: String[],             // URLs Cloudinary
  backgroundPhoto: String,
  description: String,          // visible sur site public
  tarifParJour: Number,
  tarifParJour15Plus: Number,
  tarifParJour30Plus: Number,
  cautionDefaut: Number,
  isPublic: Boolean (default: true),
  alerts: {
    vidangeAtKm: Number,
    assuranceExpireLe: Date,
    vignetteExpireLe: Date,
    controleTechniqueExpireLe: Date,
    visiteAssuranceExpireLe: Date,
  },
  timestamps: true
}
```

### Client
```ts
{
  type: 'particulier' | 'entreprise',
  nom: String (required),
  prenom: String,
  email: String,
  telephone: String (required, index),
  whatsapp: String,
  adresse: String,
  ville: String,
  dateNaissance: Date,
  nationalite: String,
  documentType: 'cin' | 'passeport' | 'titre_sejour',
  documentNumber: String,
  documentExpireLe: Date,
  cinRectoUrl: String, cinVersoUrl: String,
  permisNumero: String,
  permisExpireLe: Date,
  permisRectoUrl: String, permisVersoUrl: String,
  notesInternes: String,
  vip: Boolean (default: false),
  remiseHabituel: Number (default: 0),    // % remise auto
  blacklist: {
    actif: Boolean (default: false),
    motif: String,
    dateBlacklist: Date,
    blacklistedBy: ObjectId ref User,
  },
  timestamps: true
}
```

### Payment
```ts
{
  location: ObjectId ref Location,
  reservation: ObjectId ref Reservation,
  type: 'especes' | 'carte' | 'virement' | 'cheque',  // PAS 'stripe'
  montant: Number,             // négatif pour restitutions caution
  statut: 'effectue' | 'en_attente' | 'annule',
  reference: String,
  notes: String,
  // CRITIQUE : 'caution' et 'caution_restitution' sont EXCLUS des stats financières
  categorie: 'location' | 'supplement' | 'remise' | 'caution' | 'caution_restitution' | 'autre',
  createdBy: ObjectId ref User,
  timestamps: true
}
```

### Location
```ts
{
  reservation: ObjectId ref Reservation (required),
  vehicle: ObjectId ref Vehicle (required),
  client: ObjectId ref Client (required),
  statut: 'en_cours' | 'terminee' | 'annulee',
  debutAt: Date, finPrevueAt: Date, finReelleAt: Date,
  kmDepart: Number, kmRetour: Number,
  prolongations: [{ nouvelleFin: Date, montantSup: Number, raison: String, date: Date }],
  montantTotal: Number,
  montantPaye: Number (default: 0),
  montantRestant: Number (default: 0),
  paiementStatut: 'paye' | 'partiel' | 'en_attente',
  caution: {
    montant: Number,
    typePrise: 'cheque' | 'carte_empreinte' | 'cash',
    referenceDoc: String,       // N° chèque ou 4 derniers chiffres carte
    statut: 'en_attente' | 'prise' | 'restituee_partiel' | 'restituee_total',
  },
  paiements: ObjectId[] ref Payment,
  contratPdfUrl: String,
  etatDesLieuxAvantId: ObjectId ref EtatDesLieux,
  etatDesLieuxApresId: ObjectId ref EtatDesLieux,
  timestamps: true
}
```

### Agence (singleton)
```ts
{
  nom: String (required),
  logoUrl: String,
  adresse: String, ville: String, pays: String (default: 'Maroc'),
  telephone: String, email: String, siteWeb: String,
  ice: String,             // Identifiant Commun Entreprise Maroc
  rc: String,              // Registre du Commerce
  parametres: {
    devise: String (default: 'MAD'),
    timezone: String (default: 'Africa/Casablanca'),
    kmInclus: Number (default: 0),
    fraisKmSupp: Number (default: 0),
    cautionObligatoire: Boolean (default: true),
    typesCautionAcceptes: String[] (default: ['cheque','carte_empreinte','cash']),
    conditionsGenerales: String,
  },
  timestamps: true
  // ⚠️ Jamais plus d'un document dans cette collection
}
```

---

## 10. POINTS DE CONTRÔLE QUALITÉ

Avant chaque commit ou livraison, vérifier :

```
□ npm run build           → 0 erreur TypeScript
□ npm run lint            → 0 warning ESLint
□ npm run test            → tous les tests verts
□ caution absente des KPIs dashboard          (vérifier API /api/dashboard)
□ caution absente de la page Finances         (vérifier query filter $nin)
□ caution absente de l'export CSV/Excel       (vérifier service financeService)
□ 3 types caution dans le modal               (chèque / carte_empreinte / cash)
□ Formulaire public sans aucun champ CB       (vérifier BookingForm)
□ Message "paiement en agence" visible public (vérifier BookingFormPanel)
□ Thème noir & or appliqué dashboard          (bg #0A0A0A, accents #C9A84C)
□ Thème futuriste or appliqué public          (dégradé radial, cards luxe)
□ Responsive mobile : sidebar collapse, cards 1 colonne
□ Lighthouse public >= 85                     (npm run lighthouse)
```

---

*Yourent — Fichier de contexte v1.0 — 6 mars 2026*
*Ce fichier doit être conservé à la racine du projet et mis à jour à chaque décision importante.*
