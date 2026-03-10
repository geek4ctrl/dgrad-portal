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

interface Slide {
  date: string;
  title: string;
  sub: string;
  image: string;
}

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
      date: 'Depuis 2019',
      title: 'LOGIRAD, la solution intégrée de gestion des recettes non fiscales',
      sub: 'Plateforme web nationale pilotée par la DGRAD pour digitaliser l\'ensemble de la chaîne de mobilisation des recettes administratives, judiciaires, domaniales et de participations.',
      image: 'assets/images/slide1.svg'
    },
    {
      date: '1er janvier 2023',
      title: 'Mise en production progressive de <em>LOGIRAD</em> dans les services d\'assiette',
      sub: 'Déploiement de la première phase de la procédure dématérialisée couvrant plusieurs services d\'assiette à travers le territoire national.',
      image: 'assets/images/slide2.svg'
    },
    {
      date: 'Mars 2024',
      title: 'Version <em>2.0</em> de LOGIRAD : chaîne informatisée des recettes renforcée',
      sub: 'Nouvelle version du logiciel intégrant la taxation, l\'ordonnancement, le recouvrement, le contrôle, les exonérations et la gestion du contentieux dans un environnement unifié.',
      image: 'assets/images/slide3.svg'
    }
  ];

  activeIndex = 0;
  slideChanging = false;
  get activeSlide(): Slide { return this.slides[this.activeIndex]; }

  private timer: ReturnType<typeof setInterval> | null = null;

  setSlide(index: number): void {
    if (index === this.activeIndex) return;
    this.triggerSlideChange();
    this.activeIndex = index;
    this.resetTimer();
  }

  private triggerSlideChange(): void {
    this.slideChanging = true;
    setTimeout(() => (this.slideChanging = false), 400);
  }

  private resetTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.triggerSlideChange();
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    }, 5000);
  }

  // ── Stats Bar ──────────────────────────────────────────
  stats = [
    { value: '1 300+', label: 'Utilisateurs ciblés dans la première phase' },
    { value: '5',      label: 'Services d\'assiette intégrés au démarrage' },
    { value: '26',     label: 'Provinces progressivement couvertes' },
    { value: '100 %',  label: 'Chaîne de recouvrement dématérialisée' }
  ];

  // ── What We Offer ──────────────────────────────────────
  offerCards = [
    {
      icon: '💻',
      title: 'Plateforme web intégrée',
      description: 'Application accessible via navigateur permettant la gestion unifiée des assujettis, déclarations, dossiers, taxations, autorisations, recouvrements et contentieux.'
    },
    {
      icon: '📊',
      title: 'Traçabilité & tableaux de bord',
      description: 'Registres et statistiques en temps quasi réel pour suivre les notes d\'imposition, les avis de paiement, les encaissements et les soldes en souffrance.'
    },
    {
      icon: '🛡️',
      title: 'Sécurisation des recettes',
      description: 'Procédures normalisées, profils utilisateurs dédiés et intégration avec ISYS‑Régies pour fiabiliser le circuit d\'ordonnancement, de recouvrement et de clearance.'
    },
    {
      icon: '🎓',
      title: 'Formation & accompagnement',
      description: 'Modules de pré‑production et de formation pour tester les évolutions, former les équipes et accompagner le déploiement au sein des services d\'assiette et de la DGRAD.'
    }
  ];

  // ── User Profiles (from manual section 1.3) ────────────
  userProfiles = [
    {
      icon: '⚙️',
      name: 'Administrateur',
      badge: 'Système',
      description: 'Création des utilisateurs, réinitialisation des mots de passe et paramétrage des référentiels de base (actes générateurs, tarifs, règles de gestion, pénalités).'
    },
    {
      icon: '🧾',
      name: 'Taxateur',
      badge: 'Assiette',
      description: 'Identification et gestion des assujettis, saisie des déclarations et établissement des notes de taxation.'
    },
    {
      icon: '✅',
      name: 'Chef-taxateur',
      badge: 'Validation',
      description: 'Validation ou rejet des notes de taxation produites par les taxateurs de son service.'
    },
    {
      icon: '🔍',
      name: 'Contrôleur',
      badge: 'Contrôle',
      description: 'Contrôle des ordonnancements, validation ou signalement de problème, et consultation des registres.'
    },
    {
      icon: '📋',
      name: 'Ordonnateur',
      badge: 'Ordonnancement',
      description: 'Ordonnancement des notes de taxation, impression des notes de perception (bon à payer), et consultation des registres.'
    },
    {
      icon: '💳',
      name: 'Receveur',
      badge: 'Recouvrement',
      description: 'Recouvrement, gestion des paiements et apurements, édition des acquits libératoires, rôles et poursuites.'
    },
    {
      icon: '👁️',
      name: 'Consultation',
      badge: 'Lecture seule',
      description: 'Accès en lecture seule aux registres de taxation, d\'ordonnancement et de paiement sans modification possible.'
    }
  ];

  // ── Integrated Services (4 cards, 4-per-row) ──────────
  serviceCards = [
    {
      icon: '🧾',
      title: 'Gestion des sujets (assujettis)',
      items: [
        'Enregistrement des personnes physiques, morales et ONG',
        'Annuaire des assujettis avec coordonnées à jour',
        'Recherche simple et avancée par nom ou NIF/TIN',
        'Mise à jour contrôlée des données de contact'
      ]
    },
    {
      icon: '📆',
      title: 'Déclarations périodiques',
      items: [
        'Lien entre assujetti et taxes périodiques',
        'Gestion des assujettissements simples ou multiples',
        'Suivi des déclarations déposées et des défaillants',
        'Filtrage par service, article budgétaire, période'
      ]
    },
    {
      icon: '💰',
      title: 'Taxation & notes d\'imposition',
      items: [
        'Taxations ordinaires et sur base de déclaration',
        'Taxations d\'office et de régularisation',
        'Gestion des actes générateurs et bases imposables',
        'Validation par le Chef-taxateur du service'
      ]
    },
    {
      icon: '📋',
      title: 'Ordonnancement & autorisation',
      items: [
        'Édition des avis de paiement et ordres de paiement',
        'Registres des avis émis, rejetés ou annulés',
        'Autorisation des notes d\'imposition par l\'ordonnateur',
        'Gestion des autorisations spéciales et d\'office'
      ]
    }
  ];

  // ── Contrôleur tasks (manual ch.2) ────────────────────
  controleurTasks = [
    {
      icon: '🔎',
      label: 'Consulter les ordonnancements',
      desc: 'Recherche simple (assujetti, note de taxation, article budgétaire) ou avancée (période, province, centre).'
    },
    {
      icon: '✔️',
      label: 'Valider ou signaler un problème',
      desc: 'Le contrôleur émet un avis (Valider / Signaler un problème) et renseigne une observation si nécessaire.'
    },
    {
      icon: '📄',
      label: 'Consulter les registres',
      desc: 'Accès aux onglets : Détails de la taxation, Liste des documents liés, Détails des pénalités d\'assiette.'
    }
  ];

  // ── Receveur tasks (manual ch.3) ──────────────────────
  receveurTasks = [
    {
      icon: '💵',
      label: 'Éditer un paiement',
      desc: 'Sélection du titre de perception, saisie du bordereau, attestation de paiement et montant perçu.'
    },
    {
      icon: '✅',
      label: 'Apurer les paiements',
      desc: 'Constater et confirmer qu\'un paiement a bien été effectué au niveau de la banque.'
    },
    {
      icon: '🧾',
      label: 'Émettre l\'acquit libératoire',
      desc: 'Générer le Certificat de Paiement Informatisé (CPI) après apurement complet du montant dû.'
    },
    {
      icon: '📜',
      label: 'Gérer les rôles & poursuites',
      desc: 'Enrôlement des défaillants, extrait de rôle, dernier avertissement, contrainte et commandement.'
    }
  ];

  // ── Recovery process timeline ─────────────────────────
  recoverySteps = [
    { num: '1', label: 'Registre des restes à recouvrer', delay: 'Non payé' },
    { num: '2', label: 'Édition du rôle', delay: 'Projet' },
    { num: '3', label: 'Validation du rôle', delay: '2 niveaux' },
    { num: '4', label: 'Extrait de rôle remis à l\'assujetti', delay: 'J+0' },
    { num: '5', label: 'Dernier avertissement', delay: 'J+8 sans paiement' },
    { num: '6', label: 'Contrainte', delay: 'J+15 sans paiement' },
    { num: '7', label: 'Commandement', delay: 'Huissier assermenté' }
  ];

  // ── Security rules (manual section 1.4) ───────────────
  securityRules = [
    {
      icon: '🔒',
      title: 'Identifiants confidentiels',
      desc: 'Ne jamais partager votre adresse e-mail ni votre mot de passe avec qui que ce soit.'
    },
    {
      icon: '🛡️',
      title: 'Mot de passe complexe',
      desc: 'Utilisez un mot de passe fort et protégé. Changez-le régulièrement depuis votre profil.'
    },
    {
      icon: '🌐',
      title: 'Connexion sécurisée',
      desc: 'Assurez-vous d\'avoir une connexion internet sécurisée avant d\'accéder à l\'application.'
    },
    {
      icon: '📝',
      title: 'Données valides uniquement',
      desc: 'Saisissez uniquement des données valides et autorisées conformément aux procédures DGRAD.'
    }
  ];

  // ── ISYS-Régies flow ──────────────────────────────────
  isysFlow = [
    { icon: '🏢', label: 'Assujetti effectue le paiement' },
    { icon: '🏦', label: 'Encaissement par la banque commerciale' },
    { icon: '📡', label: 'ISYS-Régies capte les flux en temps réel' },
    { icon: '🏛️', label: 'Reversement à la Banque Centrale du Congo' },
    { icon: '📒', label: 'Comptabilisation au compte général du Trésor' },
    { icon: '✅', label: 'Apurement automatique dans LOGIRAD' }
  ];

  // ── National deployment ───────────────────────────────
  assietteServices = ['Mines', 'Hydrocarbures', 'Affaires foncières', 'Environnement', 'PTNTIC & DGM'];

  phases = [
    {
      label: 'Phase 1 — Janvier 2023',
      provinces: 'Kinshasa, Kongo Central, Tshopo, Haut-Uélé, Bas-Uélé, Tanganyika, Haut-Katanga, Haut-Lomami, Lualaba'
    },
    {
      label: 'Phase 2 — Juillet 2024',
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
      icon: '🌐',
      bg: 'linear-gradient(135deg,#1e2a3a,#111d2e)',
      type: 'Chaîne des recettes',
      date: 'Jan 2023',
      title: 'Démarrage de la procédure dématérialisée des recettes non fiscales'
    },
    {
      icon: '🤝',
      bg: 'linear-gradient(135deg,#1c3040,#0d1b2e)',
      type: 'Interopérabilité',
      date: 'Jan 2022',
      title: 'Intégration d\'ISYS‑Régies pour la chaîne informatisée des recettes'
    },
    {
      icon: '📥',
      bg: 'linear-gradient(135deg,#2a1a1a,#1a0d0d)',
      type: 'Documentation',
      date: 'En continu',
      title: 'Téléchargez la dernière documentation sur le portail DGRAD'
    }
  ];

  ngOnInit(): void { this.resetTimer(); }
  ngOnDestroy(): void { if (this.timer) clearInterval(this.timer); }
}