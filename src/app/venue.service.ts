import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVenue } from './venue/venue';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private _http: HttpClient) { }

  private baseUrl: string = 'http://localhost:5251/api/Venue/';

  getVenueDetails(): Observable<IVenue[]> {
    return this._http.get<IVenue[]>(this.baseUrl + 'GetAllVenueDetails');
  }

  addVenue(data: IVenue): Observable<any> {
    return this._http.post(this.baseUrl + 'AddVenue', data, { responseType: "text" });
  }

  editVenue(data: IVenue): Observable<any> {
    return this._http.post(this.baseUrl + 'EditVenue', data, { responseType: 'text' });
  }

  deleteVenue(venueId: number): Observable<any> {
    return this._http.delete(this.baseUrl + 'DeleteVenue?venueId=' + venueId, { responseType: 'text' });
  }
}
