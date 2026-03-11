import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollInDirective } from '../../shared/scroll-in.directive';

export interface GalleryItem {
  id:        number;
  image:     string;
  title:     string;
  category:  string;
  date:      string;
  location?: string;
  desc?:     string;
  wide?:     boolean;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, CommonModule, ScrollInDirective],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  // ── Hero stats ──────────────────────────────────────────
  heroStats = [
    { value: '516+',  label: 'Agents formés en 2024' },
    { value: '26',    label: 'Provinces couvertes' },
    { value: '1 300+', label: 'Utilisateurs ciblés' }
  ];

  // ── Gallery data (sourced from manuals) ─────────────────
  // Replace image paths with your real assets; placeholders use a consistent
  // pattern so the error handler can fall back to a solid-colour tile.
  items: GalleryItem[] = [
    {
      id: 1,
      image: 'assets/gallery/formation-kinshasa-1.jpg',
      title: 'Session de formation LOGIRAD — Kinshasa',
      category: 'Formation',
      date: 'Jan 2023',
      location: 'Kinshasa',
      desc: 'Première session de formation dans le cadre du démarrage de la procédure dématérialisée pour les 5 services d\'assiette pilotes.',
      wide: true
    },
    {
      id: 2,
      image: 'assets/gallery/formation-mbuji-mayi.jpg',
      title: 'Formation des agents — Mbuji-Mayi',
      category: 'Formation',
      date: 'Juil 2024',
      location: 'Mbuji-Mayi — Kasaï Oriental',
      desc: '157 agents formés pour les provinces du Kasaï Oriental, Lomami et Sankuru lors de la Phase 2 du déploiement.'
    },
    {
      id: 3,
      image: 'assets/gallery/deploiement-lubumbashi.jpg',
      title: 'Déploiement Haut-Katanga — Lubumbashi',
      category: 'Déploiement',
      date: 'Jan 2023',
      location: 'Lubumbashi — Haut-Katanga',
      desc: 'Mise en production de LOGIRAD dans les services d\'assiette de la province du Haut-Katanga.'
    },
    {
      id: 4,
      image: 'assets/gallery/formation-taxateurs.jpg',
      title: 'Atelier Taxateurs & Ordonnateurs',
      category: 'Formation',
      date: 'Juin 2022',
      location: 'Kinshasa',
      desc: 'Formation des profils taxateurs et ordonnateurs sur les modules de taxation, ordonnancement et gestion des assujettis.'
    },
    {
      id: 5,
      image: 'assets/gallery/formation-controleurs.jpg',
      title: 'Formation des contrôleurs DGRAD',
      category: 'Formation',
      date: 'Fév 2023',
      location: 'Kinshasa',
      desc: 'Formation spécifique pour les profils contrôleurs : vérification des dossiers, contrôle sur pièces et gestion des exonérations.'
    },
    {
      id: 6,
      image: 'assets/gallery/deploiement-kisangani.jpg',
      title: 'Déploiement Tshopo — Kisangani',
      category: 'Déploiement',
      date: 'Jan 2023',
      location: 'Kisangani — Tshopo',
      desc: 'Basculement à la procédure dématérialisée dans les services de la province de la Tshopo.'
    },
    {
      id: 7,
      image: 'assets/gallery/isys-regies-formation.jpg',
      title: 'Formation ISYS-Régies — interopérabilité bancaire',
      category: 'ISYS-Régies',
      date: 'Jan 2022',
      location: 'Kinshasa',
      desc: 'Plus de 6 000 utilisateurs du secteur privé et public formés sur ISYS-Régies, opérationnel depuis janvier 2022.',
      wide: true
    },
    {
      id: 8,
      image: 'assets/gallery/formation-kongo-central.jpg',
      title: 'Session de formation — Kongo Central',
      category: 'Formation',
      date: 'Mar 2023',
      location: 'Matadi — Kongo Central'
    },
    {
      id: 9,
      image: 'assets/gallery/deploiement-haut-uele.jpg',
      title: 'Déploiement Haut-Uélé & Bas-Uélé',
      category: 'Déploiement',
      date: 'Avr 2023',
      location: 'Isiro — Haut-Uélé'
    },
    {
      id: 10,
      image: 'assets/gallery/formation-receveurs.jpg',
      title: 'Atelier profil Receveur — recouvrement et poursuites',
      category: 'Formation',
      date: 'Sep 2022',
      location: 'Kinshasa'
    },
    {
      id: 11,
      image: 'assets/gallery/deploiement-tanganyika.jpg',
      title: 'Déploiement province du Tanganyika',
      category: 'Déploiement',
      date: 'Juin 2023',
      location: 'Kalemie — Tanganyika'
    },
    {
      id: 12,
      image: 'assets/gallery/formation-kasai-2024.jpg',
      title: 'Phase 2 — Formation Kasaï 2024',
      category: 'Formation',
      date: 'Juil 2024',
      location: 'Kananga — Kasaï Central',
      desc: 'Déploiement de la Phase 2 couvrant les provinces du Kasaï, Kasaï Central, Kasaï Oriental, Lomami, Sankuru, Maniema et Sud-Kivu.',
      wide: true
    }
  ];

  // ── Filter state ────────────────────────────────────────
  categories: string[] = [];
  activeCategory = 'Tous';
  filteredItems: GalleryItem[] = [];

  // ── Lightbox state ──────────────────────────────────────
  lightboxItem: GalleryItem | null = null;
  lightboxIndex = 0;

  ngOnInit(): void {
    // Build unique category list
    const cats = ['Tous', ...new Set(this.items.map(i => i.category))];
    this.categories = cats;
    this.applyFilter();
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
    this.applyFilter();
  }

  private applyFilter(): void {
    this.filteredItems = this.activeCategory === 'Tous'
      ? [...this.items]
      : this.items.filter(i => i.category === this.activeCategory);
  }

  openLightbox(item: GalleryItem): void {
    this.lightboxIndex = this.filteredItems.indexOf(item);
    this.lightboxItem = item;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxItem = null;
    document.body.style.overflow = '';
  }

  prevItem(): void {
    if (this.lightboxIndex > 0) {
      this.lightboxIndex--;
      this.lightboxItem = this.filteredItems[this.lightboxIndex];
    }
  }

  nextItem(): void {
    if (this.lightboxIndex < this.filteredItems.length - 1) {
      this.lightboxIndex++;
      this.lightboxItem = this.filteredItems[this.lightboxIndex];
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const wrap = img.closest('.gallery-image') as HTMLElement;
    if (wrap) wrap.classList.add('gallery-image--placeholder');
  }

  // Close lightbox on Escape key
  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeLightbox(); }

  @HostListener('document:keydown.arrowLeft')
  onLeft(): void { if (this.lightboxItem) this.prevItem(); }

  @HostListener('document:keydown.arrowRight')
  onRight(): void { if (this.lightboxItem) this.nextItem(); }
}