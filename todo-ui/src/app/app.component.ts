import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact = this.createEmptyContact();
  validationErrors: { [key: string]: string } = {};
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  createEmptyContact(): Contact {
    return {
      name: '',
      address: '',
      tel: '',
      mobile: '',
      email: '',
      country: ''
    };
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.clearMessages();
      },
      error: (err) => {
        this.errorMessage = 'Error loading contacts: ' + (err.error?.message || err.message);
        console.error('Error loading contacts:', err);
      }
    });
  }

  newContact(): void {
    this.selectedContact = this.createEmptyContact();
    this.validationErrors = {};
    this.clearMessages();
  }

  validateFields(): boolean {
    this.validationErrors = {};

    if (!this.selectedContact.name || this.selectedContact.name.trim() === '') {
      this.validationErrors['name'] = 'Name field cannot be empty';
    }

    if (!this.selectedContact.mobile || this.selectedContact.mobile.trim() === '') {
      this.validationErrors['mobile'] = 'Mobile field cannot be empty';
    }

    if (!this.selectedContact.country || this.selectedContact.country.trim() === '') {
      this.validationErrors['country'] = 'Country field cannot be empty';
    }

    return Object.keys(this.validationErrors).length === 0;
  }

  save(): void {
    if (!this.validateFields()) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.contactService.addContact(this.selectedContact).subscribe({
      next: (newContact) => {
        console.log('Contact saved:', newContact);
        this.contactService.refreshContacts();
        this.newContact();
        this.successMessage = 'Contact saved successfully';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || err.message || 'Error saving contact';
        console.error('Error saving contact:', err);
      }
    });
  }

  selectContact(contact: Contact): void {
    this.selectedContact = { ...contact };
    this.validationErrors = {};
    this.clearMessages();
  }

  update(): void {
    if (!this.selectedContact.id) {
      this.errorMessage = 'No contact selected for update';
      return;
    }

    if (!this.validateFields()) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    this.contactService.updateContact(this.selectedContact.id, this.selectedContact).subscribe({
      next: (updatedContact) => {
        console.log('Contact updated:', updatedContact);
        this.contactService.refreshContacts();
        this.newContact();
        this.successMessage = 'Contact updated successfully';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || err.message || 'Error updating contact';
        console.error('Error updating contact:', err);
      }
    });
  }

  delete(): void {
    if (!this.selectedContact.id) {
      this.errorMessage = 'No contact selected for deletion';
      return;
    }

    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.selectedContact.id).subscribe({
        next: () => {
          console.log('Contact deleted');
          this.contactService.refreshContacts();
          this.newContact();
          this.successMessage = 'Contact deleted successfully';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || err.message || 'Error deleting contact';
          console.error('Error deleting contact:', err);
        }
      });
    }
  }

  clearMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}

