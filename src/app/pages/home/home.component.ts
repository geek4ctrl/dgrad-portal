import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

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
  imports: [RouterLink, StripHtmlPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  slides: Slide[] = [
    {
      date: 'Depuis 2019',
      title: 'LOGIRAD, la solution intégrée de gestion des recettes non fiscales',
      sub: 'Plateforme web nationale pilotée par la DGRAD pour digitaliser l’ensemble de la chaîne de mobilisation des recettes administratives, judiciaires, domaniales et de participations.',
      image: 'assets/images/slide1.svg'
    },
    {
      date: '1er janvier 2023',
      title: 'Mise en production progressive de <em>LOGIRAD</em> dans les services d’assiette',
      sub: 'Déploiement de la première phase de la procédure dématérialisée couvrant plusieurs services d’assiette à travers le territoire national.',
      image: 'assets/images/slide2.svg'
    },
    {
      date: 'Mars 2024',
      title: 'Version <em>2.0</em> de LOGIRAD : chaîne informatisée des recettes renforcée',
      sub: 'Nouvelle version du logiciel intégrant la taxation, l’ordonnancement, le recouvrement, le contrôle, les exonérations et la gestion du contentieux dans un environnement unifié.',
      image: 'assets/images/slide3.svg'
    }
  ];

  activeIndex = 0;
  get activeSlide(): Slide { return this.slides[this.activeIndex]; }

  private timer: ReturnType<typeof setInterval> | null = null;

  setSlide(index: number): void {
    this.activeIndex = index;
    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    }, 5000);
  }

  stats = [
    { value: '1 300+', label: 'Utilisateurs ciblés dans la première phase' },
    { value: '5',      label: 'Services d’assiette intégrés au démarrage' },
    { value: '26',     label: 'Provinces progressivement couvertes' },
    { value: '100 %',  label: 'Chaîne de recouvrement dématérialisée' }
  ];

  offerCards = [
    {
      icon: '💻',
      title: 'Plateforme web intégrée',
      description: 'Application accessible via navigateur permettant la gestion unifiée des assujettis, déclarations, dossiers, taxations, autorisations, recouvrements et contentieux.'
    },
    {
      icon: '📊',
      title: 'Traçabilité & tableaux de bord',
      description: 'Registres et statistiques en temps quasi réel pour suivre les notes d’imposition, les avis de paiement, les encaissements et les soldes en souffrance.'
    },
    {
      icon: '🛡️',
      title: 'Sécurisation des recettes',
      description: 'Procédures normalisées, profils utilisateurs dédiés et intégration avec ISYS‑Régies pour fiabiliser le circuit d’ordonnancement, de recouvrement et de clearance.'
    },
    {
      icon: '🎓',
      title: 'Formation & accompagnement',
      description: 'Modules de pré‑production et de formation pour tester les évolutions, former les équipes et accompagner le déploiement au sein des services d’assiette et de la DGRAD.'
    }
  ];

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
      title: 'Taxation & notes d’imposition',
      items: [
        'Taxations ordinaires et sur base de déclaration',
        'Taxations d’office et de régularisation',
        'Gestion des actes générateurs et bases imposables',
        'Pièces justificatives et validation par le Chef taxateur'
      ]
    },
    {
      icon: '🧾',
      title: 'Ordonnancement & autorisation',
      items: [
        'Édition des avis de paiement et ordres de paiement',
        'Registres des avis émis, rejetés ou annulés',
        'Autorisation des notes d’imposition par l’ordonnateur',
        'Gestion des autorisations spéciales et d’office'
      ]
    }
  ];

  assietteServices = ['Mines', 'Hydrocarbures', 'Affaires foncières', 'Environnement', 'PTNTIC & DGM'];

  phases = [
    {
      label: 'Phase 1',
      provinces: 'Kinshasa, Kongo Central, Tshopo, Haut-Uélé, Bas-Uélé, Tanganyika, Haut-Katanga, Haut-Lomami, Lualaba'
    },
    {
      label: 'Phase 2 — 01 juillet 2024',
      provinces: 'Kasaï, Kasaï Central, Kasaï Oriental, Lomami, Sankuru, Maniema, Sud-Kivu'
    }
  ];

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
      title: 'Intégration d’ISYS‑Régies pour la chaîne informatisée des recettes'
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