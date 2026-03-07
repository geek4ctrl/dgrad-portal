import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  highlights = [
    {
      title: 'Service public spécialisé',
      text: 'La DGRAD est un service public de l’administration centrale chargé de l’assiette, du suivi et du recouvrement des recettes non fiscales.',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Tutelle du Ministère des Finances',
      text: 'Elle fonctionne sous la tutelle du Ministère des Finances et intervient en aval pour le compte du Trésor public.',
      image:
        'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Couverture nationale',
      text: 'La DGRAD est présente sur l’ensemble du territoire national pour accompagner les services d’assiette et les administrations sectorielles.',
      image:
        'https://images.unsplash.com/photo-1526401485004-2fa806b5aa47?w=900&auto=format&fit=crop&q=80'
    }
  ];
}

