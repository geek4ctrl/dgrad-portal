import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil – DGRAD' },
  { path: 'a-propos', component: AboutComponent, title: 'À propos – DGRAD' },
  { path: 'missions-services', component: ServicesComponent, title: 'Missions & Services – DGRAD' },
  { path: 'documentation', component: DocumentationComponent, title: 'Documentation – DGRAD' },
  { path: 'galerie', component: GalleryComponent, title: 'Galerie – DGRAD' },
  { path: 'gallery', redirectTo: 'galerie', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, title: 'Contact – DGRAD' },
  { path: '**', redirectTo: '' }
];
