import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DocItem {
  title: string;
  description?: string;
  content?: string;
  publishedYear?: number;
  href?: string;
  /** Optional: URL for preview (e.g. PDF). If set, preview can open in new tab or iframe. */
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
  selectedCategoryIndex = 0;
  selectedDocIndex = 0;
  /** Current category (synced from docCategories) – avoids getter in template. */
  currentCategory: DocCategory | null = null;
  /** Current document for preview (synced from currentCategory.documents). */
  currentDocument: DocItem | null = null;

  docCategories: DocCategory[] = [
    {
      id: 'user-manual',
      name: 'User manual',
      count: 3,
      documents: [
        {
          title: 'User Manual - Controllers and Receivers - LOGIRAD v29-06-2022',
          description: 'Guide for controllers and receivers: control, verification, recovery and clearance procedures.',
          content: 'This user manual describes the procedures for controllers and receivers in LOGIRAD: conformity checks, non-conformity reports, recovery, clearance, discharge certificates and enforcement. It covers access to taxation, authorisation and payment registers.',
          publishedYear: 2022,
          href: '#'
        },
        {
          title: 'User Manual - Tax Authorizers and Authorizers - LOGIRAD v29-06-2022',
          description: 'Guide for tax authorizers and authorizing officers: payment notices and orders.',
          content: 'This manual covers the issuance and management of payment notices and payment orders, consultation of related registers, and special or ex-officio authorisations for LOGIRAD users.',
          publishedYear: 2022,
          href: '#'
        },
        {
          title: 'User Manual - LOGIRAD v2.0.1.02',
          description: 'Documentation fonctionnelle sur l\'outil informatique utilisé pour la gestion des recettes non fiscales.',
          content: 'Functional documentation of the LOGIRAD software: modules (subjects, declarations, files, taxation, authorizations, control, recovery, litigation), user profiles, security and key business processes. Official resources and documents of LOGIRAD.',
          publishedYear: 2024,
          href: '#'
        }
      ]
    },
    {
      id: 'orders',
      name: 'Orders',
      count: 1,
      documents: [
        {
          title: 'Order No. 003 of September 20, 2018, concerning the internal regulations of the Court of Cassation',
          description: 'Internal regulations of the Court of Cassation.',
          content: 'This order sets out the internal regulations of the Court of Cassation. It defines the organization, operation and rules applicable to the Court.',
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
          content: 'This ordinance-law reforms the procedures for assessment, control and recovery of non-tax revenues. It establishes the framework for DGRAD and LOGIRAD operations.',
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
          content: 'This circular provides guidelines for the extension of the LOGIRAD paperless procedure across the provinces, in line with government directives.',
          publishedYear: 2023,
          href: '#'
        },
        {
          title: 'Circular on user access and security',
          description: 'Security and access rules for LOGIRAD users.',
          content: 'This circular defines security, warnings and precautions for all authorized LOGIRAD users, including credentials and data integrity.',
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

  docs = [
    {
      category: 'Guides utilisateurs',
      items: [
        {
          title: "Manuel d’utilisateur – Taxateur",
          description:
            'Guide opérationnel pour les agents chargés de la taxation et de la liquidation des droits et redevances.',
          href: '#'
        },
        {
          title: "Manuel d’utilisateur – Contrôleurs",
          description:
            'Procédures de contrôle et de vérification des opérations de mobilisation des recettes non fiscales.',
          href: '#'
        },
        {
          title: "Manuel d’utilisateur – Logiciel",
          description:
            'Documentation fonctionnelle sur l’outil informatique utilisé pour la gestion des recettes non fiscales.',
          href: '#'
        }
      ]
    },
    {
      category: 'Textes réglementaires',
      items: [
        {
          title: 'Ordonnance-loi n°13/003 du 23 février 2013',
          description:
            'Réforme des procédures d’assiette, de contrôle et de recouvrement des recettes non fiscales.',
          href: 'https://dgrad.gouv.cd'
        },
        {
          title: 'Code Minier (2002, tel que modifié en 2018)',
          description:
            'Dispositions relatives au partage des recettes minières et au rôle de la DGRAD dans la quote-part de l’État.',
          href: 'https://dgrad.gouv.cd'
        }
      ]
    }
  ];

  profiles = [
    {
      name: 'Administrator',
      description:
        'Creates users, resets passwords and configures reference data such as generating acts, rates, sectors, services, management rules and penalties.'
    },
    {
      name: 'Assessor',
      description:
        'Manages the subject registry, records declarations and creates tax assessments for the assessment services.'
    },
    {
      name: 'Chief Assessor',
      description:
        'Validates or rejects tax assessment notes issued by assessors within the same assessment service.'
    },
    {
      name: 'Controller',
      description:
        'Controls authorisations and records conformity/non‑conformity reports, with access to taxation, authorisation and payment registers.'
    },
    {
      name: 'Authorising Officer',
      description:
        'Issues and manages payment notices and payment orders, and consults related registers, including special and ex‑officio authorisations.'
    },
    {
      name: 'Receiver',
      description:
        'Handles recovery, clearance, enforcement actions, discharge certificates and monitoring of outstanding balances and rolls.'
    },
    {
      name: 'Consultation',
      description:
        'Read‑only profile providing access to key registers such as taxation, authorisation and payment without the ability to modify data.'
    }
  ];

  securityPoints = [
    'Keep your LOGIRAD credentials (email address and password) strictly confidential and never share them.',
    'Use a strong, complex and regularly updated password to protect access to the application.',
    'Ensure you use a secure, trusted computer and internet connection when accessing LOGIRAD.',
    'Only enter valid and authorised data in accordance with the procedures of the DGRAD and the Ministry of Finance.'
  ];

  /** Cards for General information – integrated LOGIRAD services (subjects, declarations, files, taxation, authorizations, control, recovery, litigation) */
  moduleCards = [
    { icon: '👤', title: 'Subjects', items: ['Registry of natural persons, legal entities and NGOs', 'Addresses and identifiers for declarations and taxations'] },
    { icon: '📋', title: 'Declarations', items: ['Links subjects to periodic taxes', 'Records assessments and identifies filed declarations and defaulters'] },
    { icon: '📁', title: 'Files', items: ['Tracks requests and supporting documents', 'From reception to use for declarations or taxations'] },
    { icon: '💰', title: 'Taxation', items: ['Tax assessment notes (ordinary, ex‑officio, regularisation)', 'Attachments and validation'] },
    { icon: '✅', title: 'Authorizations', items: ['Payment notices and payment orders', 'Special and ex‑officio authorisations'] },
    { icon: '🔍', title: 'Control', items: ['Compliance of authorisations and tax assessments', 'Targeted control missions'] },
    { icon: '📥', title: 'Recovery', items: ['Uptake of authorised revenues', 'Clearance, discharge certificates, rolls, enforcement'] },
    { icon: '⚖️', title: 'Litigation', items: ['Administrative and judicial appeals', 'Effects of complaints and decisions on notices and amounts due'] }
  ];

  processes = [
    {
      title: 'Subject management',
      summary:
        'Registers and updates subjects (natural persons, legal entities and NGOs), with addresses and identifiers, which are the basis for declarations and taxations.'
    },
    {
      title: 'Declaration management',
      summary:
        'Links subjects to periodic taxes, records assessments (simple or multiple) and identifies filed declarations, defaulters and potential defaulters.'
    },
    {
      title: 'File management',
      summary:
        'Tracks subject requests and supporting documents through files, from reception and acknowledgement of receipt to their use for declarations or taxations.'
    },
    {
      title: 'Taxation management',
      summary:
        'Creates and manages tax assessment notes (ordinary, based on declarations, with sites, ex‑officio and regularisation), including attachments and validation.'
    },
    {
      title: 'Authorisation management',
      summary:
        'Produces and manages payment notices and payment orders, including rejected and cancelled notices, and special or ex‑officio authorisations.'
    },
    {
      title: 'Control management',
      summary:
        'Ensures that authorisations and tax assessments comply with legal and regulatory requirements through targeted control missions.'
    },
    {
      title: 'Recovery and clearance',
      summary:
        'Covers uptake of authorised revenues, confirmation of payments, clearance of payment notices, discharge certificates, rolls, final notices and enforcement.'
    },
    {
      title: 'Disputes management',
      summary:
        'Manages administrative and judicial appeals relating to taxations and recoveries, including the effects of complaints and decisions on notices and amounts due.'
    }
  ];

  constructor() {
    this.updateCurrentSelection();
  }

  ngOnInit(): void {
    this.updateCurrentSelection();
  }

  selectCategory(index: number): void {
    this.selectedCategoryIndex = index;
    this.selectedDocIndex = 0;
    this.updateCurrentSelection();
  }

  selectDocument(index: number): void {
    this.selectedDocIndex = index;
    this.updateCurrentSelection();
  }

  private updateCurrentSelection(): void {
    const cat = this.docCategories[this.selectedCategoryIndex] ?? this.docCategories[0] ?? null;
    this.currentCategory = cat;
    if (cat && cat.documents.length > 0) {
      const doc = cat.documents[this.selectedDocIndex] ?? cat.documents[0];
      this.currentDocument = doc;
    } else {
      this.currentDocument = null;
    }
  }

  /** Used in template so the list always comes from the array, not from async init. */
  get activeCategory(): DocCategory | null {
    return this.docCategories[this.selectedCategoryIndex] ?? this.docCategories[0] ?? null;
  }

  /** Active document for preview. */
  get activeDocument(): DocItem | null {
    const cat = this.activeCategory;
    if (!cat || cat.documents.length === 0) return null;
    return cat.documents[this.selectedDocIndex] ?? cat.documents[0] ?? null;
  }
}

