import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { IBookings } from './bookings';
import { error } from 'jquery';
import { VenueService } from '../venue.service';
import { IVenue } from '../venue/venue';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {
  venueDetails: IVenue[] = [];
  bookings: IBookings[] = [];
  showModal: boolean = false;
  forEdit: boolean = false;
  forAdd: boolean = false;

  eventBookingId: number = 0;
  customerName: string = '';
  mobileNumber: string = '';
  bookedHours: number = 0;
  eventDateTime: string = '';
  venueId: number = 0;

  constructor(private _bookingsService: BookingsService, private _venueService: VenueService) { }

  ngOnInit(): void {
    this.getBookingsDetails();
  }

  getBookingsDetails(): void {
    this._bookingsService.getBookingsDetails().subscribe(
      (bookingsData) => {
        this.bookings = bookingsData;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    )
  }

  onAdd(): void {
    this.eventBookingId = 0;
    this.customerName = '';
    this.mobileNumber = '';
    this.bookedHours = 0;
    this.forEdit = false;
    this.getVenueData();
    this.forAdd = true;


    this.showModal = true;
  }

  addBooking() {
    const book: IBookings = {
      customerName: this.customerName,
      mobileNumber: this.mobileNumber,
      venueId: this.venueId,
      eventDateTime: this.eventDateTime,
      bookedHours: this.bookedHours,
      eventBookingId: 0,
      venueName: ''
    };
    console.log(book);
    this._bookingsService.addBooking(book).subscribe(
      (response) => {
        alert(JSON.parse(response).message);  
        this.closeModal();
        this.getBookingsDetails();     
      },
      (error) => {
        console.log('Error: ' + error);
      }
    )
  }

  getVenueData(): void {
    this._venueService.getVenueDetails().subscribe(
      (venueData) => {
        this.venueDetails = venueData
      },
      (error) => {
        console.error('Error retrieving assets:', error);
      }
    )
  }

  closeModal() {
    this.showModal = false;
  }
}
