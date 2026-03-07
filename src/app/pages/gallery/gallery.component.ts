import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GalleryItem {
  title: string;
  category: string;
  date: string;
  image: string;
  fallbackImage?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  /** Gallery items matching portail.dgrad.cd/galerie. Uses real portal image URLs with Unsplash fallback. */
  items: GalleryItem[] = [
    {
      title: 'Formation LOGIRAD - Haut-Katanga',
      category: 'Formation LOGIRAD',
      date: 'Septembre 2025',
      image: 'https://portail.dgrad.cd/wp-content/uploads/2025/09/formation-haut-katanga.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Formation LOGIRAD - Lualaba',
      category: 'Formation LOGIRAD',
      date: 'Octobre 2025',
      image: 'https://portail.dgrad.cd/wp-content/uploads/2025/10/formation-lualaba.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Formation LOGIRAD - Kongo Central',
      category: 'Formation LOGIRAD',
      date: 'Novembre 2025',
      image: 'https://portail.dgrad.cd/wp-content/uploads/2025/11/formation-kongo-central.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Formation LOGIRAD - Kinshasa',
      category: 'Formation LOGIRAD',
      date: 'Décembre 2025',
      image: 'https://portail.dgrad.cd/wp-content/uploads/2025/12/formation-kinshasa.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&auto=format&fit=crop&q=80'
    }
  ];

  ngOnInit(): void {
    // #region agent log
    fetch('http://127.0.0.1:7583/ingest/3a311829-b201-4c07-b0e4-4336e54d377d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'be4d2a'},body:JSON.stringify({sessionId:'be4d2a',location:'gallery.component.ts:ngOnInit',message:'GalleryComponent init',data:{itemsLength:this.items.length,firstTitle:this.items[0]?.title},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  }

  onImageError(item: GalleryItem): void {
    if (item.fallbackImage) {
      item.image = item.fallbackImage;
    }
  }
}

