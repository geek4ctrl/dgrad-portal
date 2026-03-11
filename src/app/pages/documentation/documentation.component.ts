import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollInDirective } from '../../shared/scroll-in.directive';

interface DownloadDoc {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  href?: string;
}

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [RouterLink, CommonModule, ScrollInDirective],
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  // ── Tab / sticky nav ──────────────────────────────────
  tabsSticky = false;
  activeTab = 'portal-access';
  openModule: string | null = 'subjects';

  tabs = [
    { id: 'portal-access', icon: '🔑', label: 'Accès au portail' },
    { id: 'register',      icon: '📝', label: 'Enregistrement' },
    { id: 'processes',     icon: '⚙️',  label: 'Processus métier' },
    { id: 'modules',       icon: '📦', label: 'Modules' },
    { id: 'downloads',     icon: '📥', label: 'Téléchargements' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    const tabsEl = document.querySelector('.doc-tabs-wrap') as HTMLElement | null;
    if (tabsEl) {
      this.tabsSticky = window.scrollY > tabsEl.offsetTop - 10;
    }
  }

  setTab(id: string): void {
    this.activeTab = id;
    this.scrollTo(id);
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleModule(id: string): void {
    this.openModule = this.openModule === id ? null : id;
  }

  // ── Portal Access Steps ──────────────────────────────
  accessSteps = [
    {
      step: '01',
      title: 'Ouvrir votre navigateur',
      desc: 'Utilisez Google Chrome, Mozilla Firefox ou Microsoft Edge (version récente recommandée). Évitez Internet Explorer.'
    },
    {
      step: '02',
      title: "Saisir l'URL du portail",
      desc: "Entrez l'adresse officielle du portail LOGIRAD dans la barre d'adresse : logirad.dgrad.gouv.cd"
    },
    {
      step: '03',
      title: 'Saisir vos identifiants',
      desc: 'Entrez votre identifiant (NIF ou matricule) et votre mot de passe fournis par votre administrateur DGRAD.'
    },
    {
      step: '04',
      title: "Choisir votre service d'assiette",
      desc: "À la première connexion, sélectionnez votre service d'assiette de rattachement (Mines, Hydrocarbures, Affaires foncières, etc.)."
    },
    {
      step: '05',
      title: 'Accéder au tableau de bord',
      desc: 'Une fois authentifié, vous accédez au tableau de bord personnalisé selon votre profil utilisateur.'
    }
  ];

  // ── Registration Steps ───────────────────────────────
  registrationSteps = [
    {
      step: 1,
      icon: '🧭',
      title: 'Naviguer vers le module Sujets',
      desc: "Dans le menu principal de LOGIRAD, cliquez sur « Sujets » pour accéder à l'annuaire des assujettis.",
      fields: [] as string[]
    },
    {
      step: 2,
      icon: '➕',
      title: 'Créer un nouvel assujetti',
      desc: "Cliquez sur « Nouveau sujet » et sélectionnez le type : Personne physique, Personne morale ou ONG.",
      fields: ['Personne physique', 'Personne morale', 'ONG']
    },
    {
      step: 3,
      icon: '📋',
      title: "Saisir les informations d'identification",
      desc: 'Remplissez les champs obligatoires du formulaire.',
      fields: ['NIF / TIN', 'Nom ou raison sociale', 'Adresse complète', 'Téléphone', 'Email']
    },
    {
      step: 4,
      icon: '📎',
      title: 'Joindre les pièces justificatives',
      desc: "Chargez les documents requis selon le type d'assujetti.",
      fields: ['Carte nationale', 'RCCM', 'Statuts (ONG)']
    },
    {
      step: 5,
      icon: '✅',
      title: 'Valider et enregistrer',
      desc: 'Vérifiez les informations saisies puis cliquez sur « Enregistrer ». Le système génère un numéro de dossier unique.',
      fields: [] as string[]
    },
    {
      step: 6,
      icon: '🔗',
      title: 'Lier aux taxes périodiques',
      desc: "Associez l'assujetti aux taxes et articles budgétaires via le sous-module Déclarations.",
      fields: [] as string[]
    }
  ];

  // ── Business Processes ────────────────────────────────
  businessProcesses = [
    {
      step: '01',
      icon: '👤',
      color: 'blue',
      title: "Identification de l'assujetti",
      desc: "Création ou recherche du sujet dans l'annuaire LOGIRAD (NIF/TIN, nom, adresse).",
      items: [
        'Recherche par nom ou NIF dans l\'annuaire',
        'Création du dossier assujetti si nouveau',
        'Vérification des données de contact'
      ]
    },
    {
      step: '02',
      icon: '📝',
      color: 'gold',
      title: 'Déclaration & assiette',
      desc: "L'assujetti déclare ses activités et le service d'assiette détermine la base imposable.",
      items: [
        'Dépôt de la déclaration périodique',
        'Rattachement à l\'article budgétaire',
        'Calcul de la base imposable et de l\'acte générateur'
      ]
    },
    {
      step: '03',
      icon: '💰',
      color: 'green',
      title: 'Taxation',
      desc: 'Le Chef taxateur établit la note d\'imposition sur base des déclarations ou d\'office.',
      items: [
        'Taxation ordinaire, d\'office ou de régularisation',
        'Validation de la note d\'imposition',
        'Attachement des pièces justificatives'
      ]
    },
    {
      step: '04',
      icon: '📋',
      color: 'purple',
      title: 'Ordonnancement',
      desc: "L'ordonnateur autorise et émet l'avis de paiement officiel.",
      items: [
        "Autorisation de la note d'imposition",
        "Édition de l'avis de paiement (AP)",
        'Registre des AP émis, rejetés ou annulés'
      ]
    },
    {
      step: '05',
      icon: '🏦',
      color: 'navy',
      title: 'Recouvrement',
      desc: "L'assujetti effectue le paiement via les canaux bancaires agréés.",
      items: [
        'Paiement en banque ou via mobile money',
        'Génération du bordereau de versement',
        'Enregistrement dans ISYS-Régies'
      ]
    },
    {
      step: '06',
      icon: '🔍',
      color: 'orange',
      title: 'Contrôle & exonérations',
      desc: 'Le service de contrôle vérifie les paiements et gère les dossiers d\'exonération.',
      items: [
        'Vérification des encaissements vs émissions',
        "Traitement des demandes d'exonération",
        'Suivi des soldes en souffrance'
      ]
    },
    {
      step: '07',
      icon: '⚖️',
      color: 'red',
      title: 'Contentieux',
      desc: 'Gestion des litiges, réclamations et procédures de recouvrement forcé.',
      items: [
        'Ouverture du dossier contentieux',
        'Suivi des réclamations et décisions',
        'Mise en demeure et recouvrement forcé'
      ]
    },
    {
      step: '08',
      icon: '📊',
      color: 'teal',
      title: 'Clearance & tableaux de bord',
      desc: 'Consolidation finale des recettes et production des rapports de gestion.',
      items: [
        'Clearance et transfert vers la trésorerie',
        'Tableaux de bord de performance',
        'Statistiques et rapports mensuels DGRAD'
      ]
    }
  ];

  // ── Functional Modules (accordion) ───────────────────
  functionalModules = [
    {
      id: 'subjects',
      icon: '👤',
      title: "Module Sujets — Gestion des assujettis",
      overview: "Ce module permet la création et la gestion complète des assujettis (personnes physiques, morales, ONG) dans l'annuaire LOGIRAD.",
      features: [
        { icon: '🔍', label: 'Recherche avancée', desc: 'Recherche par NIF/TIN, nom, adresse ou service d\'assiette de rattachement.' },
        { icon: '➕', label: 'Création de dossier', desc: 'Enregistrement complet avec coordonnées, type d\'assujetti et pièces justificatives.' },
        { icon: '✏️', label: 'Mise à jour', desc: 'Modification contrôlée des données avec traçabilité des changements.' },
        { icon: '🔗', label: 'Liaison aux taxes', desc: "Association de l'assujetti à ses obligations fiscales périodiques." }
      ]
    },
    {
      id: 'declarations',
      icon: '📆',
      title: 'Module Déclarations — Suivi périodique',
      overview: 'Gestion du cycle complet des déclarations périodiques, du dépôt par l\'assujetti à la détection des défaillants.',
      features: [
        { icon: '📥', label: 'Dépôt de déclaration', desc: 'Saisie ou import des déclarations par période et article budgétaire.' },
        { icon: '⚠️', label: 'Suivi des défaillants', desc: "Identification automatique des assujettis n'ayant pas déposé leur déclaration." },
        { icon: '🔎', label: 'Filtrage multicritère', desc: 'Recherche par service, période, article budgétaire ou statut de déclaration.' },
        { icon: '📈', label: 'Statistiques', desc: 'Taux de conformité et tableaux de bord des déclarations par période.' }
      ]
    },
    {
      id: 'taxation',
      icon: '💰',
      title: "Module Taxation — Notes d'imposition",
      overview: "Établissement des notes d'imposition par le Chef taxateur selon différents régimes : ordinaire, d'office, sur déclaration ou de régularisation.",
      features: [
        { icon: '📄', label: "Note d'imposition ordinaire", desc: 'Taxation sur base de la déclaration déposée par l\'assujetti.' },
        { icon: '🚨', label: "Taxation d'office", desc: "Émission d'une note d'imposition en cas de défaillance déclarative." },
        { icon: '🔄', label: 'Régularisation', desc: 'Correction et ajustement des taxations antérieures.' },
        { icon: '✔️', label: 'Validation chef taxateur', desc: "Circuit d'approbation avec signature électronique du chef taxateur." }
      ]
    },
    {
      id: 'ordonnancement',
      icon: '📋',
      title: 'Module Ordonnancement — Avis de paiement',
      overview: "L'ordonnateur autorise les notes d'imposition validées et émet les avis de paiement officiels transmis aux assujettis.",
      features: [
        { icon: '✅', label: 'Autorisation des NI', desc: "Validation des notes d'imposition par l'ordonnateur compétent." },
        { icon: '🖨️', label: 'Édition des AP', desc: 'Génération et impression des avis de paiement et ordres de recettes.' },
        { icon: '📒', label: 'Registre des AP', desc: 'Suivi complet des avis émis, en attente, rejetés ou annulés.' },
        { icon: '🔐', label: 'Autorisations spéciales', desc: "Gestion des régimes particuliers et autorisations d'office." }
      ]
    },
    {
      id: 'recouvrement',
      icon: '🏦',
      title: 'Module Recouvrement — Encaissements',
      overview: 'Suivi des paiements effectués par les assujettis via les banques agréées et ISYS-Régies, avec réconciliation automatique.',
      features: [
        { icon: '💳', label: 'Enregistrement paiements', desc: 'Saisie des bordereaux de versement bancaire et récépissés de paiement.' },
        { icon: '🔗', label: 'Interfaçage ISYS-Régies', desc: 'Synchronisation automatique des encaissements avec la chaîne de trésorerie.' },
        { icon: '📊', label: 'Suivi des soldes', desc: 'Tableau de bord des encaissements vs émissions par période et service.' },
        { icon: '🚩', label: 'Alertes impayés', desc: "Signalement automatique des avis de paiement en souffrance au-delà de l'échéance." }
      ]
    },
    {
      id: 'controle',
      icon: '🔍',
      title: 'Module Contrôle & Exonérations',
      overview: "Le service de contrôle vérifie la cohérence entre les émissions et les encaissements, et instruit les demandes d'exonération.",
      features: [
        { icon: '🔎', label: 'Vérification croisée', desc: "Contrôle de cohérence entre les notes d'imposition émises et les paiements reçus." },
        { icon: '📜', label: "Demandes d'exonération", desc: 'Instruction et suivi des dossiers d\'exonération partielle ou totale.' },
        { icon: '📁', label: 'Dossiers de contrôle', desc: 'Constitution et archivage des dossiers de vérification sur pièces.' },
        { icon: '📈', label: 'Rapport de contrôle', desc: 'Synthèse des résultats de contrôle par service et par période.' }
      ]
    },
    {
      id: 'contentieux',
      icon: '⚖️',
      title: 'Module Contentieux',
      overview: 'Gestion des litiges fiscaux, réclamations des assujettis, mises en demeure et procédures de recouvrement forcé.',
      features: [
        { icon: '📂', label: 'Ouverture dossier', desc: "Création du dossier contentieux avec référence aux notes d'imposition contestées." },
        { icon: '📩', label: 'Suivi des réclamations', desc: 'Gestion du cycle complet : réception, instruction, décision et notification.' },
        { icon: '📮', label: 'Mise en demeure', desc: 'Génération et suivi des mises en demeure envoyées aux assujettis défaillants.' },
        { icon: '⚖️', label: 'Recouvrement forcé', desc: 'Déclenchement des procédures de recouvrement amiable et judiciaire.' }
      ]
    }
  ];

  // ── Downloads ─────────────────────────────────────────
  downloadItems: DownloadDoc[] = [
    {
      icon: '📘',
      tag: 'Manuel principal',
      title: 'Manuel utilisateur LOGIRAD v2.0',
      desc: 'Guide complet couvrant tous les modules : sujets, déclarations, taxation, ordonnancement, recouvrement, contrôle et contentieux.',
      href: 'assets/docs/Manuel_LOGIRAD_v2.pdf'
    },
    {
      icon: '📗',
      tag: 'Manuel contrôleurs',
      title: 'Manuel utilisateur — Contrôleurs',
      desc: 'Guide spécifique au profil contrôleur : vérification des dossiers, contrôle sur pièces, exonérations et rapports.',
      href: 'assets/docs/Manuel_controleurs.pdf'
    },
    {
      icon: '📋',
      tag: 'Procédure',
      title: 'Procédure de dématérialisation',
      desc: 'Note de procédure officielle sur la dématérialisation des recettes non fiscales — circulaire DGRAD.',
      href: 'assets/docs/Procedure_dematerialisation.pdf'
    },
    {
      icon: '🗺️',
      tag: 'Déploiement',
      title: 'Plan de déploiement national',
      desc: 'Calendrier et périmètre des phases de déploiement LOGIRAD dans les 26 provinces de la RDC.',
      href: 'assets/docs/Plan_deploiement.pdf'
    }
  ];

  ngOnInit(): void {}
}