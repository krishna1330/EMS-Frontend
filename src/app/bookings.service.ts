import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { IBookings } from './bookings/bookings';
import { Observable } from 'rxjs';
import { IEventAssets } from './bookings/eventAssets';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private _http: HttpClient) { }

  private baseUrl = 'http://localhost:5251/api/Bookings/';

  getBookingsDetails(): Observable<IBookings[]> {
    return this._http.get<IBookings[]>(this.baseUrl + 'GetBookingsDetails');
  }

  addBooking(data: IBookings): Observable<any> {
    return this._http.post(this.baseUrl + 'AddBooking', data, { responseType: "text" });
  }

  addEventAsset(data: IEventAssets): Observable<any> {
    return this._http.post(this.baseUrl + 'AddEventAsset', data, { responseType: "text" });
  }
}
