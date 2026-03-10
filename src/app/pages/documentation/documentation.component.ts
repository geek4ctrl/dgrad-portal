import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface DocItem {
  title: string;
  description?: string;
  publishedYear?: number;
  href?: string;
  previewUrl?: string;
}

interface DocCategory {
  id: string;
  name: string;
  count: number;
  documents: DocItem[];
}

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  /** Tracks which service card is active (highlighted gold) */
  activeCard = 0;

  selectedCategoryIndex = 0;
  selectedDocIndex      = 0;

  // ── Documentation categories ────────────────────────
  docCategories: DocCategory[] = [
    {
      id: 'user-manual',
      name: 'User manual',
      count: 4,
      documents: [
        {
          title: 'LOGIRAD User Manual (EN)',
          description: 'Official LOGIRAD user manual in English.',
          publishedYear: 2024,
          href: 'assets/documents/LOGIRAD_User_Manual_EN.pdf',
          previewUrl: 'assets/documents/LOGIRAD_User_Manual_EN.pdf'
        },
        {
          title: 'LOGIRAD User Manual EN (v2)',
          description: 'LOGIRAD user manual in English – second edition.',
          publishedYear: 2024,
          href: 'assets/documents/LOGIRAD_User_Manual_EN-2.pdf',
          previewUrl: 'assets/documents/LOGIRAD_User_Manual_EN-2.pdf'
        },
        {
          title: "Manuel d'utilisateur – Taxateur",
          description: 'Guide opérationnel pour les agents chargés de la taxation.',
          publishedYear: 2022,
          href: 'assets/documents/Manuel-utilisateur-taxateur.pdf',
          previewUrl: 'assets/documents/Manuel-utilisateur-taxateur.pdf'
        },
        {
          title: 'Organigramme DGRAD',
          description: 'Organisation chart of the DGRAD.',
          publishedYear: 2024,
          href: 'assets/documents/ORGANIGRAMME-DGRAD.pdf',
          previewUrl: 'assets/documents/ORGANIGRAMME-DGRAD.pdf'
        }
      ]
    },
    {
      id: 'orders',
      name: 'Orders',
      count: 1,
      documents: [
        {
          title: 'Order No. 003 of September 20, 2018',
          description: 'Internal regulations of the Court of Cassation.',
          publishedYear: 2018,
          href: '#'
        }
      ]
    },
    {
      id: 'decrees',
      name: 'Decrees',
      count: 1,
      documents: [
        {
          title: 'Ordonnance-loi n°13/003 du 23 février 2013',
          description: 'Réforme des procédures d\'assiette, de contrôle et de recouvrement des recettes non fiscales.',
          publishedYear: 2013,
          href: 'https://dgrad.gouv.cd'
        }
      ]
    },
    {
      id: 'circulars',
      name: 'Circulars',
      count: 2,
      documents: [
        {
          title: 'Circular on the application of LOGIRAD in the provinces',
          description: 'Guidelines for provincial deployment.',
          publishedYear: 2023,
          href: '#'
        },
        {
          title: 'Circular on user access and security',
          description: 'Security and access rules for LOGIRAD users.',
          publishedYear: 2023,
          href: '#'
        }
      ]
    },
    {
      id: 'others',
      name: 'Others',
      count: 0,
      documents: []
    }
  ];

  // ── User profiles ────────────────────────────────────
  profiles = [
    {
      name: 'Administrator',
      description: 'Creates users, resets passwords and configures reference data such as generating acts, rates, sectors, services, management rules and penalties.'
    },
    {
      name: 'Assessor (Taxateur)',
      description: 'Manages the subject registry, records declarations and creates tax assessments for the assessment services.'
    },
    {
      name: 'Chief Assessor',
      description: 'Validates or rejects tax assessment notes issued by assessors within the same assessment service.'
    },
    {
      name: 'Controller',
      description: 'Controls authorisations and records conformity or non-conformity reports, with access to taxation, authorisation and payment registers.'
    },
    {
      name: 'Ordering Officer',
      description: 'Issues and manages payment notices and payment orders, and consults related registers, including special and ex-officio authorisations.'
    },
    {
      name: 'Receiver',
      description: 'Handles recovery, clearance, enforcement actions, discharge certificates and monitoring of outstanding balances and rolls.'
    },
    {
      name: 'Consultation',
      description: 'Read-only profile providing access to key registers such as taxation, authorisation and payment without the ability to modify data.'
    }
  ];

  // ── Security bullet points ───────────────────────────
  securityPoints = [
    'Keep your LOGIRAD credentials (email address and password) strictly confidential and never share them.',
    'Use a strong, complex and regularly updated password to protect access to the application.',
    'Ensure you use a secure, trusted computer and internet connection when accessing LOGIRAD.',
    'Only enter valid and authorised data in accordance with DGRAD and Ministry of Finance procedures.'
  ];

  // ── Business processes ───────────────────────────────
  processes = [
    {
      title: 'Subject management',
      summary: 'Registers and updates subjects (natural persons, legal entities and NGOs), with addresses and identifiers, which are the basis for declarations and taxations.'
    },
    {
      title: 'Declaration management',
      summary: 'Links subjects to periodic taxes, records assessments (simple or multiple) and identifies filed declarations, defaulters and potential defaulters.'
    },
    {
      title: 'File management',
      summary: 'Tracks subject requests and supporting documents through files, from reception and acknowledgement of receipt to their use for declarations or taxations.'
    },
    {
      title: 'Taxation management',
      summary: 'Creates and manages tax assessment notes (ordinary, based on declarations, ex-officio and regularisation), including attachments and validation.'
    },
    {
      title: 'Authorisation management',
      summary: 'Produces and manages payment notices and payment orders, including rejected and cancelled notices, and special or ex-officio authorisations.'
    },
    {
      title: 'Control management',
      summary: 'Ensures that authorisations and tax assessments comply with legal and regulatory requirements through targeted control missions.'
    },
    {
      title: 'Recovery and clearance',
      summary: 'Covers uptake of authorised revenues, confirmation of payments, clearance of payment notices, discharge certificates, rolls, final notices and enforcement.'
    },
    {
      title: 'Disputes management',
      summary: 'Manages administrative and judicial appeals relating to taxations and recoveries, including the effects of complaints and decisions on notices and amounts due.'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  // ── Doc viewer ───────────────────────────────────────
  selectCategory(index: number): void {
    this.selectedCategoryIndex = index;
    this.selectedDocIndex = 0;
  }

  selectDocument(index: number): void {
    this.selectedDocIndex = index === this.selectedDocIndex ? -1 : index;
  }

  isPdfDocument(doc: DocItem): boolean {
    const url = doc.previewUrl || doc.href || '';
    return url.toLowerCase().endsWith('.pdf');
  }

  getPdfSafeUrl(doc: DocItem): SafeResourceUrl {
    const url = doc.previewUrl || doc.href || '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get activeCategory(): DocCategory | null {
    return this.docCategories[this.selectedCategoryIndex] ?? null;
  }
}