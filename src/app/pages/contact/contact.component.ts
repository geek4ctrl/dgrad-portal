import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollInDirective } from '../../shared/scroll-in.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollInDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm: FormGroup;
  submitted   = false;
  messageSent = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name:         ['', [Validators.required, Validators.minLength(2)]],
      organisation: [''],
      email:        ['', [Validators.required, Validators.email]],
      phone:        [''],
      subject:      ['', Validators.required],
      province:     [''],
      message:      ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  sendMessage(): void {
    this.submitted = true;
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;
    console.log('Message sent:', this.contactForm.getRawValue());
    // TODO: wire up to your API / email service
    this.messageSent = true;
    this.contactForm.reset();
    this.submitted = false;
  }

  resetForm(): void {
    this.messageSent = false;
    this.submitted   = false;
    this.contactForm.reset();
  }

  subjectOptions = [
    { value: 'acces',       label: "Problème d'accès à la plateforme" },
    { value: 'formation',   label: 'Demande de formation LOGIRAD' },
    { value: 'deploiement', label: 'Déploiement dans ma province' },
    { value: 'technique',   label: 'Support technique (bug / erreur)' },
    { value: 'mdp',         label: 'Réinitialisation de mot de passe' },
    { value: 'compte',      label: 'Création / gestion de compte utilisateur' },
    { value: 'taxation',    label: 'Question sur la taxation / ordonnancement' },
    { value: 'isys',        label: 'Interopérabilité ISYS-Régies' },
    { value: 'autre',       label: 'Autre demande' }
  ];

  provinces = [
    'Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe',
    'Kasaï', 'Kasaï Central', 'Kasaï Oriental', 'Lomami', 'Sankuru',
    'Maniema', 'Sud-Kivu', 'Nord-Kivu', 'Ituri', 'Haut-Uélé',
    'Tshopo', 'Bas-Uélé', 'Nord-Ubangi', 'Mongala', 'Sud-Ubangi',
    'Équateur', 'Tshuapa', 'Tanganyika', 'Haut-Lomami',
    'Haut-Katanga', 'Lualaba'
  ];
}