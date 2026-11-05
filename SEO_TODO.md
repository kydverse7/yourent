# SEO Task List - Yourent

Objectif: executer un plan SEO complet front-end + back-end, sans casser le style actuel du site.

## Regle design obligatoire (a respecter pour toute nouvelle page)

- Toute nouvelle page publique doit garder le meme design que landing + catalogue.
- Reutiliser en priorite les patterns UI existants:
  - classes: lux-container, lux-page-head, lux-eyebrow, lux-title-sm, lux-subtitle, lux-panel, lux-filter-bar
  - composants de la zone publique deja en place
- Garder la palette actuelle (gold/noir/cream), les memes bordures, ombres, rayons, et spacing.
- Garder le meme comportement responsive mobile/desktop.
- Garder la compatibilite RTL deja en place.
- Interdit: creer un nouveau theme visuel pour une page SEO.

## Regles redaction SEO obligatoires (a respecter pour chaque texte)

- Ecrire pour l utilisateur d abord, puis pour Google: texte utile, clair, concret.
- Definir 1 mot-cle principal par page + 3 a 6 mots-cles secondaires lies a l intention de recherche.
- Placer le mot-cle principal dans: H1, introduction, au moins un H2, meta title, meta description, URL.
- Utiliser des mots de transition dans le texte (objectif: 25%+ des phrases):
  - de plus, en revanche, cependant, ainsi, donc, en effet, par exemple, enfin, d abord, ensuite
- Respecter la ponctuation et la lisibilite:
  - phrases courtes a moyennes (idealement 12 a 22 mots)
  - virgules pour aerer la lecture
  - point-virgule pour relier deux idees proches sans phrase trop longue
- Eviter le bourrage de mots-cles (keyword stuffing) et les repetitions inutiles.
- Garder une orthographe/grammaire irreprochables (relecture obligatoire avant publication).
- Utiliser une voix active, un ton professionnel, et des formulations naturelles.
- Structurer chaque page avec une logique editoriale propre:
  - intro orientee intention de recherche
  - sections utiles (conditions, avantages, process, FAQ)
  - conclusion + CTA clair (reserver, whatsapp, appel)
- Verifier l unicite du contenu (pas de duplication entre pages SEO proches).
- Ajouter des references locales quand pertinent (Casablanca, aeroport Mohammed V, Maroc).

## Sprint 1 - Fondations SEO techniques (priorite haute)

- [x] Mettre en place les routes i18n par URL: /fr, /en, /ar (au lieu du cookie seul).
- [x] Ajouter les alternates hreflang sur toutes les pages publiques principales.
- [x] Verifier et normaliser les canonical par page (home, catalogue, fiche modele, pages locales).
- [ ] Gerer noindex pour toutes les pages de confirmation, pages privees et pages sans valeur SEO.
- [x] Ajouter generateStaticParams sur les pages dynamiques SEO (modeles, pages locales) quand possible.
- [ ] Verifier revalidate/ISR pour avoir un TTFB stable sans perdre la fraicheur des prix/dispo.

## Sprint 2 - Pages SEO a creer (meme design landing/catalogue)

- [ ] Creer page SEO: location voiture aeroport casablanca.
- [ ] Creer page SEO: location voiture pas cher casablanca.
- [ ] Creer page SEO: location SUV casablanca.
- [ ] Creer page SEO: location voiture luxe casablanca.
- [ ] Creer page SEO: location voiture longue duree casablanca.
- [ ] Pour chaque page: 1 H1 unique + sections H2/H3 + FAQ + CTA reserve/whatsapp.
- [ ] Pour chaque page: metadata complete (title, description, OG, canonical, hreflang).
- [ ] Pour chaque page: JSON-LD adapte (LocalBusiness/Service/FAQ/Breadcrumb selon le cas).

## Sprint 3 - Optimisation des pages catalogue et fiches modeles

- [ ] Enrichir chaque fiche modele avec un bloc texte unique (120-220 mots) pour eviter contenu trop court.
- [ ] Ajouter maillage interne entre modeles proches (meme marque, meme categorie, meme budget).
- [ ] Ajouter section FAQ courte sur chaque fiche modele (2 a 4 questions utiles).
- [ ] Verifier que chaque image a un alt descriptif cible SEO (marque + modele + ville).
- [ ] Harmoniser les noms de fichiers images (slug SEO propre, sans espaces ni noms generiques).

## Sprint 4 - Back-end SEO et indexation

- [ ] Ajouter un job/ping de reindexation sitemap quand un vehicule public est cree/modifie.
- [ ] Verifier que le sitemap inclut toutes les nouvelles pages SEO et toutes les fiches indexables.
- [x] Ajouter date lastModified fiable depuis la DB pour les URLs dynamiques.
- [x] Verifier robots pour autoriser uniquement le crawl utile et bloquer bruit technique.
- [ ] Ajouter logs simples cote serveur pour suivre les bots (Googlebot/Bingbot) sur pages SEO.

## Sprint 5 - Qualite, tracking et validation

- [ ] Connecter Google Search Console + Bing Webmaster (si pas deja fait).
- [ ] Soumettre sitemap et verifier couverture d indexation.
- [ ] Definir tableau de suivi mots-cles cibles (hebdo):
  - location voiture casablanca
  - location voiture aeroport casablanca
  - location voiture luxe casablanca
  - car rental casablanca
- [x] Instrumenter KPI conversion SEO (clic whatsapp, clic appel, reservation envoyee).
- [ ] Lancer un mini audit technique tous les 15 jours (404, canonical, metadata, schema).

## Ordre de demarrage recommande (pratique)

1. Sprint 1 (routes i18n + hreflang + canonical)
2. Creer 2 pages SEO locales (aeroport + pas cher) avec le design catalogue
3. Relier ces pages depuis home/catalogue/footer
4. Mettre a jour sitemap + Search Console
5. Mesurer pendant 2 a 4 semaines avant d etendre aux autres pages

## Definition of done (par page SEO creee)

- [ ] Design conforme au style landing/catalogue
- [ ] H1/H2/H3 propres et contenu unique
- [ ] Metadata complete + canonical + hreflang
- [ ] JSON-LD valide
- [ ] Ajout dans sitemap
- [ ] Liens internes depuis au moins 2 pages existantes
- [ ] Page testee sur mobile et desktop
- [ ] Texte valide selon les regles redaction SEO (mots de transition, ponctuation, orthographe, style pro)

## Notes de mise en oeuvre (verifie dans le code)

- generateStaticParams : present sur [seoSlug] et blog/[slug] ; les fiches modele sont rendues a la demande avec revalidate = 300.
- KPI : composant Analytics (whatsapp_click, phone_click, reservation_submitted) en place ; il n'envoie rien tant que NEXT_PUBLIC_GA_ID n'est pas defini et que GA4 n'est pas configure. Aucune conversion Google Ads n'est creee (identifiant de libelle inconnu).
- Sitemap, llms.txt et IndexNow (npm run indexnow) sont prets ; le sitemap ne liste que les pages SEO dont le contenu est enregistre dans src/content/pages. Les cases du Sprint 2 restent ouvertes tant que les pages ne sont pas relues et publiees.

## Actions du proprietaire

- [ ] Vercel : ajouter le domaine yourent.ma (apex) avec une redirection 308 vers www.yourent.ma, et garder www.yourent.ma comme domaine principal.
- [ ] Vercel : definir la variable NEXT_PUBLIC_GA_ID (identifiant GA4, de forme G-XXXXXXXXXX), puis redeployer.
- [ ] Vercel : definir NEXT_PUBLIC_GSC_VERIFICATION (jeton de la balise meta Google Search Console) puis redeployer.
- [ ] Vercel : definir NEXT_PUBLIC_BING_VERIFICATION (jeton de la balise meta Bing Webmaster Tools) puis redeployer.
- [ ] Google Search Console : ajouter la propriete https://www.yourent.ma, verifier la propriete, soumettre https://www.yourent.ma/sitemap.xml.
- [ ] Bing Webmaster Tools : ajouter le site, verifier la propriete, soumettre le sitemap.
- [ ] Creer l'evenement cle et la conversion Google Ads (libelle de conversion a fournir) apres collecte des premiers evenements GA4.
- [ ] Apres publication : lancer npm run indexnow (verifier d'abord avec npm run indexnow -- --dry-run).
