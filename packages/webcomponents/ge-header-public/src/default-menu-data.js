/**
 * Default menu data for ge.ch navigation.
 * Structure: quickAccess (pill links) + sections (thematic columns).
 * URLs sourced from www.ge.ch menu.
 */
export const DEFAULT_MENU_DATA = {
  quickAccess: [
    { label: "Démarches", url: "https://www.ge.ch/demarches", variant: "filled" },
    { label: "Offres d'emploi", url: "https://www.ge.ch/old/offres-emploi-etat-geneve/liste-offres" },
    { label: "Vacances scolaires", url: "https://www.ge.ch/c/vacances-scolaires" },
  ],
  sections: [
    {
      title: "A la une",
      links: [
        { label: "Actualités", url: "https://www.ge.ch/publication?type=460" },
        { label: "Décisions du Conseil d'État", url: "https://www.ge.ch/publication?All=&organisation=497" },
        { label: "Dossiers", url: "https://www.ge.ch/dossier" },
        { label: "Evénements", url: "https://www.ge.ch/evenement" },
        { label: "Teasers", url: "https://www.ge.ch/teaser" },
        { label: "Blogs", url: "https://www.ge.ch/blog" },
        { label: "Newsletters", url: "https://www.ge.ch/publication?type=498" },
      ],
    },
    {
      title: "Démarches",
      links: [
        { label: "Aides financières, argent et impôts", url: "https://www.ge.ch/demarches/aides-financieres-argent-impots" },
        { label: "Arriver, s'installer, partir", url: "https://www.ge.ch/demarches/arriver-installer-partir" },
        { label: "Construire et se loger", url: "https://www.ge.ch/demarches/construire-se-loger" },
        { label: "Ecoles et formations", url: "https://www.ge.ch/demarches/ecoles-formations" },
        { label: "Emploi, travail, chômage", url: "https://www.ge.ch/demarches/emploi-travail-chomage" },
        { label: "Entreprises", url: "https://www.ge.ch/demarches/entreprises" },
        { label: "Etat civil et droits civiques", url: "https://www.ge.ch/demarches/etat-civil-droits-civiques" },
        { label: "Permis de conduire et véhicules", url: "https://www.ge.ch/demarches/permis-conduire-vehicules" },
        { label: "Police, sécurité et règlement des conflits", url: "https://www.ge.ch/demarches/police-securite-reglement-conflits" },
        { label: "Santé, soins et handicaps", url: "https://www.ge.ch/demarches/sante-soins-handicaps" },
        { label: "Territoire et environnement", url: "https://www.ge.ch/demarches/territoire-environnement" },
        { label: "Vivre dans le canton", url: "https://www.ge.ch/demarches/vivre-dans-canton" },
      ],
    },
    {
      title: "Organisation et documents",
      links: [
        { label: "Autorités", url: "https://www.ge.ch/organisation" },
        { label: "Annuaire", url: "https://ge.ch/annuaire" },
        { label: "Publications", url: "https://www.ge.ch/publication" },
        { label: "Statistiques", url: "https://www.ge.ch/document/statistiques-cantonales" },
        { label: "Législation", url: "https://silgeneve.ch/legis/index.aspx" },
        { label: "Feuille d'avis officielle", url: "https://fao.ge.ch" },
        { label: "Offres d'emploi", url: "https://www.ge.ch/offres-emploi-etat-geneve/liste-offres" },
      ],
    },
  ],
};
