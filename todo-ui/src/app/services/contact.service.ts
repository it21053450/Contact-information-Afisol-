import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5135/api/contacts';
  private contacts = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contacts.asObservable();

  constructor(private http: HttpClient) {
    this.loadContacts();
  }

  // Map ContactID from backend to id for frontend
  private mapContact(contact: any): Contact {
    return {
      ...contact,
      id: contact.contactID
    };
  }

  private mapContacts(contacts: any[]): Contact[] {
    return contacts.map(c => this.mapContact(c));
  }

  loadContacts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Raw contacts from API:', data);
        const mappedContacts = this.mapContacts(data);
        console.log('Mapped contacts:', mappedContacts);
        this.contacts.next(mappedContacts);
      },
      error: (err) => console.error('Error loading contacts:', err)
    });
  }

  getContacts(): Observable<Contact[]> {
    return this.contacts$;
  }

  addContact(contact: Contact): Observable<Contact> {
    // Send contactID in request if updating
    const payload = {
      contactID: contact.contactID || 0,
      name: contact.name,
      address: contact.address || '',
      tel: contact.tel || '',
      mobile: contact.mobile,
      email: contact.email || '',
      country: contact.country
    };
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(response => this.mapContact(response))
    );
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    const payload = {
      contactID: id,
      name: contact.name,
      address: contact.address || '',
      tel: contact.tel || '',
      mobile: contact.mobile,
      email: contact.email || '',
      country: contact.country
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload).pipe(
      map(response => this.mapContact(response))
    );
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshContacts(): void {
    this.loadContacts();
  }
}
