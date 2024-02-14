import { Component, OnInit } from '@angular/core';
import { VenueService } from '../venue.service';
import { IVenue } from './venue';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  venueDetails: IVenue[] = [];

  constructor(private _venueService: VenueService) { }

  ngOnInit(): void {
    this._venueService.getVenueDetails().subscribe(
      (venueData) => {
        this.venueDetails = venueData
      },
      (error) => {
        console.error('Error retrieving assets:', error);
      }
    )
  }
}
