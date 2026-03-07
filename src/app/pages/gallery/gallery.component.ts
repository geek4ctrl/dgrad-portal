import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  items = [
    {
      title: 'Formation LOGIRAD - Haut-Katanga',
      category: 'Formation LOGIRAD',
      date: 'Septembre 2025',
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Formation LOGIRAD - Lualaba',
      category: 'Formation LOGIRAD',
      date: 'Octobre 2025',
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Formation LOGIRAD - Kongo Central',
      category: 'Formation LOGIRAD',
      date: 'Novembre 2025',
      image:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&auto=format&fit=crop&q=80'
    },
    {
      title: 'Formation LOGIRAD - Kinshasa',
      category: 'Formation LOGIRAD',
      date: 'Décembre 2025',
      image:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&auto=format&fit=crop&q=80'
    }
  ];
}

