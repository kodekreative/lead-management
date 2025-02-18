import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = 'https://localhost:7111/api/leads';
  private leadsSubject = new BehaviorSubject<any[]>([]);
  leads$ = this.leadsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllLeads(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(leads => this.leadsSubject.next(leads)));
  }

  createLead(lead: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, lead).pipe(
      tap(newLead => {
        const updatedLeads = [...this.leadsSubject.getValue(), newLead];
        this.leadsSubject.next(updatedLeads); // Update the list with the new lead
      })
    );
  }

  getLeadById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
