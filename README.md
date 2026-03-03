## DGRAD / LOGIRAD Portal (Angular 21)

This project is a modern Angular 21 prototype of the DGRAD / LOGIRAD portal inspired by the official French user manuals for:

- **Tax assessors and ordonnateurs** (`Manuel d’utilisateur - taxateur`)
- **Controllers and receivers** (`Manuel d’utilisateur - contrôleurs et receveurs`)
- **LOGIRAD software v2.0 (2024)** (`Manuel d’utilisateur - logiciel`)

It provides an end‑to‑end, English‑language simulation of the LOGIRAD chain: taxpayer onboarding, declarations, dossiers, taxations, ordonnancement, payments, controls, recovery and contentieux.

### Tech stack

- **Framework**: Angular 21 (standalone components, `bootstrapApplication`)
- **Language**: TypeScript targeting ES2022
- **Build**: Angular CLI (`@angular-devkit/build-angular`)
- **Styling**: Global SCSS with a custom DGRAD visual theme

### Running the app

From the project root:

```bash
npm install
npm start
```

Then open `http://localhost:4200` in your browser.

Useful scripts:

- **`npm start`**: Run the Angular dev server (`ng serve`).
- **`npm run build`**: Production build to `dist/dgrad-portal`.

### Main features (mapped to manuals)

- **Landing page (public portal)**: Explains DGRAD / LOGIRAD and the full digital chain in English.
- **Dashboard**: High‑level KPIs and explanation of roles: administrator, taxateur / chef‑taxateur, ordonnateur, contrôleur, receveur, consultation.
- **Taxpayers (`Gestion des assujettis`)**: Simulated register of taxpayers (NIF, type, province / city, contact details).
- **Declarations (`Gestion des déclarations`)**: Periodic obligations, defaulters and potential defaulters.
- **Dossiers (`Gestion des dossiers`)**: Taxpayer requests with attachments (e.g. instalment plans, exemptions).
- **Taxations (`Gestion des taxations`)**: Ordinary taxations, on declarations, taxations d’office and regularisations with principal, penalties and totals.
- **Ordonnancements**: Notes de perception and bons à payer derived from validated taxations.
- **Payments & apurement**: Simulated payments, linkage to ordonnancements and acquits libératoires.
- **Controls**: Conceptual controller view of ordonnancements to validate or flag issues.
- **Recovery (`Recouvrement`)**: Narrative of restes à recouvrer, roles, last warnings, constraints, commandements and instalment plans.
- **Contentieux**: High‑level flows for taxation and recovery disputes and juridictional tracking.

All business flows are modelled as **mock data and UI flows only** (no connection to production DGRAD / LOGIRAD systems). This makes the app suitable for design exploration, training and integration prototyping.
