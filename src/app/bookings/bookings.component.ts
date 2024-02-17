import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { IBookings } from './bookings';
import { error } from 'jquery';
import { VenueService } from '../venue.service';
import { IVenue } from '../venue/venue';
import { AssetsService } from '../assets.service';
import { IEventAssets } from './eventAssets';
import { IAssets } from '../assets/assets';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {
  venueDetails: IVenue[] = [];
  bookings: IBookings[] = [];
  eventAssets: IEventAssets[] = [];
  assets: IAssets[] = [];
  showModal: boolean = false;
  showAssetModal: boolean = false;
  assetId: number = 0;
  quantity: number = 0;
  assetName: string = '';
  forEdit: boolean = false;
  forAdd: boolean = false;

  eventBookingId: number = 0;
  customerName: string = '';
  mobileNumber: string = '';
  bookedHours: number = 0;
  eventDateTime: string = '';
  venueId: number = 0;

  constructor(private _bookingsService: BookingsService, private _venueService: VenueService, private _assetsService: AssetsService) { }

  ngOnInit(): void {
    this.getBookingsDetails();
  }

  onAddBtnAsset(booking: IBookings): void {
    this.quantity = 0;
    this.assetId = 0;
    this.eventBookingId = booking.eventBookingId;
    this._assetsService.getAssets().subscribe(
      (assetsData) => {
        this.assets = assetsData;
      },
      (error) => {
        console.error('Error retrieving assets:', error);
      }
    );
    this.showAssetModal = true;
  }

  addAsset(): void {
    const asset: IEventAssets = {
      eventBookingId: this.eventBookingId,
      assetId: this.assetId,
      quantity: this.quantity,
      eventAssetId: 0
    };
    console.log(asset);
    this._bookingsService.addEventAsset(asset).subscribe(
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
    this.showAssetModal = false;
  }
}
