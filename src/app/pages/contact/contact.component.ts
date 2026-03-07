import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form = {
    name: '',
    email: '',
    message: ''
  };

  sendMessage(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      alert('Please fill in all required fields.');
      return;
    }
    // TODO: wire up to your API / email service
    console.log('Message sent:', this.form);
    alert('Your message has been sent. We will get back to you shortly.');
    this.form = { name: '', email: '', message: '' };
  }
}