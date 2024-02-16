import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { IBookings } from './bookings/bookings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private _http: HttpClient) { }

  private baseUrl = 'http://localhost:5251/api/Bookings/';

  getBookingsDetails(): Observable<IBookings[]> {
    return this._http.get<IBookings[]>(this.baseUrl + 'GetBookingsDetails');
  }
}
