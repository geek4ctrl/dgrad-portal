import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ScrollInDirective } from '../../shared/scroll-in.directive';

@Pipe({ name: 'stripHtml', standalone: true })
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value?.replace(/<[^>]*>/g, '') ?? '';
  }
}

interface Slide { date: string; title: string; sub: string; image: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, StripHtmlPipe, ScrollInDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // ── Hero Slides ────────────────────────────────────────
  slides: Slide[] = [
    {
      date: 'Depuis 2003',
      title: '<em>DGRAD</em> — Direction Générale des Recettes Administratives, Judiciaires, Domaniales et de Participations',
      sub: 'Service public chargé de l\'assiette, de la liquidation, de l\'ordonnancement et du recouvrement des recettes non fiscales de la République Démocratique du Congo.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    },
    {
      date: 'Décret n°0058 du 27 décembre 1995',
      title: 'Mobiliser les <em>recettes non fiscales</em> pour le développement de la RDC',
      sub: 'La DGRAD assure la constatation, la liquidation et le recouvrement de toutes les recettes non fiscales dues au Trésor public, en collaboration avec les services d\'assiette et les intervenants financiers.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'
    },
    {
      date: 'Déploiement national',
      title: '<em>LOGIRAD</em> : la plateforme numérique au service de la transparence',
      sub: 'Outil informatique de gestion des recettes rendu obligatoire par le décret n°22/18 du 4 mai 2022, déployé progressivement dans les 26 provinces avec plus de 6 000 utilisateurs formés.',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  activeIndex = 0;
  slideChanging = false;
  get activeSlide(): Slide { return this.slides[this.activeIndex]; }
  private timer: ReturnType<typeof setInterval> | null = null;

  setSlide(index: number): void {
    if (index === this.activeIndex) return;
    this.slideChanging = true;
    setTimeout(() => (this.slideChanging = false), 400);
    this.activeIndex = index;
    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.slideChanging = true;
      setTimeout(() => (this.slideChanging = false), 400);
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    }, 5000);
  }

  // ── Stats Bar ──────────────────────────────────────────
  stats = [
    { value: '1 300+', label: 'Utilisateurs ciblés — 1ère phase' },
    { value: '5 / 51', label: 'Services d\'assiette au démarrage' },
    { value: '26',     label: 'Provinces progressivement couvertes' },
    { value: '100 %',  label: 'Chaîne de recouvrement dématérialisée' }
  ];

  // ── What LOGIRAD Offers (4 pillars from manual §1.2) ──
  offerCards = [
    {
      icon: '💻',
      title: 'Application web intégrée',
      description: 'Accessible via navigateur (Chrome, Firefox, Edge, Safari) sur tout ordinateur disposant d\'une connexion internet. Aucune installation requise.'
    },
    {
      icon: '🔄',
      title: 'Modules interconnectés',
      description: 'Administration, Utilisateur, Pré-production, Formation et API — cinq modules liés qui couvrent l\'intégralité du cycle des recettes non fiscales.'
    },
    {
      icon: '📊',
      title: 'Tableaux de bord personnalisés',
      description: 'Chaque profil dispose d\'un tableau de bord adapté affichant les statistiques de son activité, son service d\'assiette et son centre d\'ordonnancement.'
    },
    {
      icon: '🔗',
      title: 'Interopérabilité ISYS‑Régies',
      description: 'Interface avec la BCC (ISYS-Régies), la DGI (DGIREP) et les banques commerciales pour la dématérialisation de la chaîne d\'encaissement et d\'apurement.'
    }
  ];

  // ── 5 Application Modules (manual §1.2) ───────────────
  appModules = [
    {
      num: '01',
      icon: '⚙️',
      title: 'Module Administration',
      desc: 'Paramétrage de l\'application : actes générateurs, tarifs, secteurs, services, règles de gestion, pénalités. Création des utilisateurs et réinitialisation des mots de passe.',
      partners: [] as string[]
    },
    {
      num: '02',
      icon: '🖥️',
      title: 'Module Utilisateur',
      desc: 'Module principal pour les intrants (assujettis, déclarations, dossiers), le traitement (tableau de bord, taxation, ordonnancement, recouvrement) et la production des extrants (NI, AP, bons à payer).',
      partners: [] as string[]
    },
    {
      num: '03',
      icon: '🧪',
      title: 'Module Pré-production',
      desc: 'Environnement dédié aux tests et à la validation des nouvelles fonctionnalités avant leur déploiement dans le module utilisateur principal.',
      partners: [] as string[]
    },
    {
      num: '04',
      icon: '🎓',
      title: 'Module Formation',
      desc: 'Environnement isolé pour la formation des agents sur les nouvelles évolutions du logiciel sans risque d\'impact sur les données de production.',
      partners: [] as string[]
    },
    {
      num: '05',
      icon: '🔌',
      title: 'Module API — Échanges de données',
      desc: 'Interface d\'interopérabilité avec les systèmes partenaires pour la synchronisation automatique des flux de recettes.',
      partners: ['BCC / ISYS-Régies', 'DGI / DGIREP', 'Banques commerciales', 'Services taxateurs']
    }
  ];

  // ── Dashboard / Interface panels (manual §1.6) ────────
  dashboardPanels = [
    {
      icon: '☰',
      title: 'Menu vertical (principal)',
      desc: 'Situé à droite de l\'écran, personnalisé selon le profil. Accès au tableau de bord, registre assujettis, déclarations, taxation, ordonnancement, etc.'
    },
    {
      icon: '🔧',
      title: 'Menu horizontal (barre d\'accueil)',
      desc: 'En haut de l\'écran. Gestion du profil utilisateur, activation de l\'assistant « Aide » et déconnexion de l\'application.'
    },
    {
      icon: '❓',
      title: 'Assistant « Aide utilisateur »',
      desc: 'Fonctionnalité intégrée s\'affichant après chaque connexion pour guider l\'utilisateur pas à pas dans l\'accomplissement de son travail.'
    },
    {
      icon: '📊',
      title: 'Tableau de bord central',
      desc: 'Synthèse des données statistiques de l\'activité de l\'utilisateur et de son service. Mis à jour au fil des évolutions du logiciel.'
    }
  ];

  // ── User Profiles (manual §1.3) ───────────────────────
  userProfiles = [
    {
      icon: '⚙️',
      name: 'Administrateur',
      badge: 'Système',
      description: 'Création des utilisateurs, réinitialisation des mots de passe, paramétrage des référentiels (actes générateurs, tarifs, règles de gestion, pénalités).'
    },
    {
      icon: '🧾',
      name: 'Taxateur',
      badge: 'Assiette',
      description: 'Identification et gestion du répertoire des assujettis, enregistrement des déclarations et création des notes de taxation.'
    },
    {
      icon: '✅',
      name: 'Chef-taxateur',
      badge: 'Validation',
      description: 'Valide ou rejette les notes de taxation de son service. Peut désactiver et réactiver un assujetti.'
    },
    {
      icon: '🔍',
      name: 'Contrôleur',
      badge: 'Contrôle',
      description: 'Contrôle des ordonnancements, validation ou signalement de problème, consultation des registres (taxation, ordonnancement, paiement).'
    },
    {
      icon: '📋',
      name: 'Ordonnateur',
      badge: 'Ordonnancement',
      description: 'Ordonnancement des notes de taxation, impression des notes de perception (bons à payer), consultation des registres.'
    },
    {
      icon: '💳',
      name: 'Receveur',
      badge: 'Recouvrement',
      description: 'Recouvrement, poursuites et consultation des registres de taxation, ordonnancement et paiement.'
    },
    {
      icon: '👁️',
      name: 'Consultation',
      badge: 'Lecture seule',
      description: 'Accès limité en lecture seule aux registres de taxation, ordonnancement et paiement, sans possibilité de modification.'
    }
  ];

  // ── Functional Service Cards (4 per row) ──────────────
  serviceCards = [
    {
      icon: '🧾',
      title: 'Gestion des assujettis',
      items: [
        'Enregistrement en 3 étapes : infos de base, adresses, confirmation',
        'Personnes physiques, morales et ONG (NIF obligatoire)',
        'Recherche simple (nom / NIF) ou avancée (service, type)',
        'Modification du téléphone, email et adresses physiques'
      ]
    },
    {
      icon: '📆',
      title: 'Gestion des déclarations',
      items: [
        'Nouvel assujettissement simple ou multiple',
        'Articles budgétaires, périodicité, tarifs et échéances',
        'Listes : déclarations effectuées, défaillants, potentiels défaillants',
        'Recherche avancée par service, article budgétaire, année et mois'
      ]
    },
    {
      icon: '💰',
      title: 'Gestion des taxations',
      items: [
        '4 types : ordinaire, sur déclaration, d\'office, régularisation',
        'Formulaire en 4 étapes : assujetti → acte → pièces → enregistrement',
        'Recherche par assujetti, note de taxation ou article budgétaire',
        'Validation / rejet par le Chef-taxateur avec observation'
      ]
    },
    {
      icon: '📋',
      title: 'Gestion des ordonnancements',
      items: [
        'Création d\'une note de perception en 3 étapes',
        'Registre des notes de perception et bons à payer',
        'Registre des notes rejetées et annulées après ordonnancement',
        'Impression de la note de perception et ordonnancement final'
      ]
    }
  ];

  // ── Taxation Types (manual §5) ─────────────────────────
  taxationTypes = [
    {
      tag: 'Ordinaire',
      icon: '📄',
      color: '#2563eb',
      label: 'Taxation ordinaire',
      desc: 'Taxation standard créée manuellement par le taxateur à partir d\'un acte générateur sélectionné dans le répertoire.'
    },
    {
      tag: 'Sur déclaration',
      icon: '📝',
      color: '#059669',
      label: 'Taxation sur assujettissement',
      desc: 'Créée depuis le registre des déclarations en sélectionnant l\'acte générateur sur les périodes non encore taxées.'
    },
    {
      tag: 'D\'office',
      icon: '🚨',
      color: '#ea580c',
      label: 'Taxation d\'office',
      desc: 'Appliquée aux débiteurs n\'ayant pas déposé leurs déclarations dans le délai légal. Accessible depuis le registre des défaillants.'
    },
    {
      tag: 'Régularisation',
      icon: '🔄',
      color: '#7c3aed',
      label: 'Taxation de régularisation',
      desc: 'Régularise les recettes perçues sans taxation préalable. Mêmes étapes que l\'ordinaire + case "Ceci est une taxation de régularisation".'
    }
  ];

  // ── Taxation 4-step workflow (manual §5.1) ─────────────
  taxationWorkflow = [
    { num: '1', label: 'Rechercher & sélectionner l\'assujetti' },
    { num: '2', label: 'Sélectionner l\'acte générateur (tarif / base taxable)' },
    { num: '3', label: 'Attacher les pièces justificatives' },
    { num: '4', label: 'Enregistrer la taxation' }
  ];

  // ── Ordonnancement 3 steps (manual §6.1) ──────────────
  ordonancementSteps = [
    {
      num: '1',
      icon: '🔎',
      title: 'Sélection de la note de taxation',
      desc: 'L\'ordonnateur consulte les nouvelles taxations validées de son centre en attente. Il sélectionne la note concernée et clique sur Suivant.'
    },
    {
      num: '2',
      icon: '✏️',
      title: 'Édition de la taxation',
      desc: 'L\'ordonnateur émet son avis : « Taxation conforme » ou « Taxation non conforme », puis motive sa décision dans le champ Observation.'
    },
    {
      num: '3',
      icon: '🖨️',
      title: 'Impression & ordonnancement',
      desc: 'Impression de la note de perception, puis clic sur « Ordonnancer la note » pour clôturer et générer le numéro d\'ordonnancement.'
    }
  ];

  // ── Ordonnancement Registres (manual §6.2–6.6) ────────
  ordonancementRegistres = [
    {
      icon: '📑',
      label: 'Notes de perception',
      desc: 'Statistiques du jour et de l\'année, liste des derniers ordonnancements. Recherche par assujetti, NP ou article budgétaire.'
    },
    {
      icon: '📂',
      label: 'Autres notes de perception',
      desc: 'Notes de pénalités et notes échelonnées générées dans LOGIRAD.'
    },
    {
      icon: '✅',
      label: 'Bons à payer',
      desc: 'Consultation et recherche de tous les bons à payer générés, avec recherche avancée par province, direction, division et centre.'
    },
    {
      icon: '❌',
      label: 'Notes de taxation rejetées',
      desc: 'Notes de taxation rejetées à l\'ordonnancement. Recherche par assujetti, note de taxation ou article budgétaire.'
    },
    {
      icon: '🚫',
      label: 'Notes de perception annulées',
      desc: 'Notes de perception annulées après ordonnancement. Recherche avancée par service, centre et dates d\'ordonnancement.'
    }
  ];

  // ── Security Rules (manual §1.4) ──────────────────────
  securityRules = [
    {
      icon: '🔒',
      title: 'Identifiants confidentiels',
      desc: 'Ne jamais partager votre adresse e-mail ni votre mot de passe. Ces informations vous sont fournies par l\'administrateur LOGIRAD à la DGRAD.'
    },
    {
      icon: '🛡️',
      title: 'Mot de passe complexe',
      desc: 'Utilisez un mot de passe complexe et protégé. Changez-le régulièrement depuis votre profil utilisateur.'
    },
    {
      icon: '🌐',
      title: 'Connexion internet sécurisée',
      desc: 'Assurez-vous de disposer d\'un ordinateur et d\'une connexion internet sécurisée avant d\'accéder à l\'application.'
    },
    {
      icon: '📝',
      title: 'Données valides uniquement',
      desc: 'Saisir uniquement les données valides et autorisées conformément aux procédures de la DGRAD et du Ministère des Finances.'
    }
  ];

  // ── ISYS-Régies flow (manual §1.2 — Encadré 1) ────────
  isysFlow = [
    { icon: '🏢', label: 'Assujetti effectue le paiement' },
    { icon: '🏦', label: 'Encaissement par la banque / établissement de crédit' },
    { icon: '📡', label: 'ISYS-Régies capte les flux en temps réel' },
    { icon: '🏛️', label: 'Reversement à la Banque Centrale du Congo' },
    { icon: '📒', label: 'Comptabilisation au compte général du Trésor' },
    { icon: '✅', label: 'Apurement dématérialisé dans LOGIRAD' }
  ];

  // ── National deployment ───────────────────────────────
  assietteServices = ['Mines', 'Hydrocarbures', 'Affaires foncières', 'Environnement', 'PTNTIC & DGM'];

  phases = [
    {
      label: 'Phase 1 — 1er janvier 2023',
      provinces: 'Kinshasa, Kongo Central, Tshopo, Haut-Uélé, Bas-Uélé, Tanganyika, Haut-Katanga, Haut-Lomami, Lualaba'
    },
    {
      label: 'Phase 2 — 1er juillet 2024',
      provinces: 'Kasaï, Kasaï Central, Kasaï Oriental, Lomami, Sankuru, Maniema, Sud-Kivu'
    }
  ];

  // ── Newsletter ────────────────────────────────────────
  newsItems = [
    {
      icon: '📰',
      bg: 'linear-gradient(135deg,#1a2d4a,#0d1b2e)',
      type: 'Mise à jour LOGIRAD',
      date: 'Mars 2024',
      title: 'Publication du manuel utilisateur LOGIRAD version 2.0'
    },
    {
      icon: '📋',
      bg: 'linear-gradient(135deg,#1e2a3a,#111d2e)',
      type: 'Manuel Taxateurs',
      date: 'Juin 2022',
      title: 'Manuel Taxateurs & Ordonnateurs v1.0 — Procédures de taxation et d\'ordonnancement'
    },
    {
      icon: '🌐',
      bg: 'linear-gradient(135deg,#1c3040,#0d1b2e)',
      type: 'Procédure dématérialisée',
      date: 'Jan 2023',
      title: 'Démarrage officiel de la procédure dématérialisée — Décret n°22/18 du 4 mai 2022'
    },
    {
      icon: '🤝',
      bg: 'linear-gradient(135deg,#2a1a1a,#1a0d0d)',
      type: 'Interopérabilité',
      date: 'Jan 2022',
      title: 'Intégration d\'ISYS‑Régies : chaîne automatisée de l\'encaissement à la trésorerie'
    }
  ];

  ngOnInit(): void { this.resetTimer(); }
  ngOnDestroy(): void { if (this.timer) clearInterval(this.timer); }
}