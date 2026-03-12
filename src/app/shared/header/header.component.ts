import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private router = inject(Router);
  isMenuOpen = false;

  navLinks = [
    { path: '/', label: 'Welcome', exact: true },
    { path: '/a-propos', label: 'À propos', exact: false },
    { path: '/missions-services', label: 'Missions', exact: false },
    { path: '/documentation', label: 'Documentation', exact: false },
    { path: '/galerie', label: 'Gallery', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  isActive(path: string): boolean {
    return this.router.url === path || (path !== '/' && this.router.url.startsWith(path));
  }
}
