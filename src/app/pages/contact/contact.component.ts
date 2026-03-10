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
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  sendMessage(): void {
    this.submitted = true;
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      return;
    }
    const value = this.contactForm.getRawValue();
    // TODO: wire up to your API / email service
    console.log('Message sent:', value);
    alert('Your message has been sent. We will get back to you shortly.');
    this.contactForm.reset();
    this.submitted = false;
  }
}