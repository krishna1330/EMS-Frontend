import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { IBookings } from './bookings';
import { error } from 'jquery';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {

  bookings: IBookings[] = [];

  constructor(private _bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.getBookingsDetails();
  }

  getBookingsDetails(): void {
    this._bookingsService.getBookingsDetails().subscribe(
      (bookingsData) => {
        console.log(bookingsData);
        this.bookings = bookingsData;
        console.log(this.bookings);
      },

      (error) => {
        console.log('Error: ' + error);
      }
    )
  }

}
