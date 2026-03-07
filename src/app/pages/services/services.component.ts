import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  mainServices = [
    {
      icon: '💰',
      title: 'Mobilisation des recettes non fiscales',
      description:
        'Perception des droits, taxes et redevances dus à l’État par les services publics sur l’ensemble du territoire national.',
      image:
        'https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=900&auto=format&fit=crop&q=80'
    },
    {
      icon: '🏛️',
      title: "Gestion des actifs de l'État",
      description:
        "Gestion des recettes liées aux biens domaniaux, au patrimoine immobilier public et aux participations de l'État.",
      image:
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=900&auto=format&fit=crop&q=80'
    },
    {
      icon: '📜',
      title: 'Cadre légal et réglementaire',
      description:
        "Participation à l'élaboration des lois, ordonnances, décrets et circulaires encadrant les recettes non fiscales et leur recouvrement.",
      image:
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80'
    },
    {
      icon: '✅',
      title: 'Contrôle et audit',
      description:
        'Contrôle de la liquidation et du recouvrement en aval afin de garantir la conformité, la transparence et la traçabilité.',
      image:
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&auto=format&fit=crop&q=80'
    }
  ];

  assietteServices = ['Mines', 'Hydrocarbures', 'Affaires foncières', 'Environnement', 'PTNTIC & DGM'];

  provincesPhase1 =
    'Kinshasa, Kongo Central, Tshopo, Haut-Uélé, Bas-Uélé, Tanganyika, Haut-Katanga, Haut-Lomami, Lualaba';
  provincesPhase2 =
    'Kasaï, Kasaï Central, Kasaï Oriental, Lomami, Sankuru, Maniema, Sud-Kivu';
}

