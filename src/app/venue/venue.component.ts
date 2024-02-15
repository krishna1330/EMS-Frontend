import { Component, OnInit } from '@angular/core';
import { VenueService } from '../venue.service';
import { IVenue } from './venue';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  venueDetails: IVenue[] = [];
  showModalv: boolean = false;
  forEdit: boolean = false;
  forAdd: boolean = false;

  venueId: number = 0;
  venueName: string = '';
  venueDescription: string = '';
  venueCostPerHour: number = 0;

  constructor(private _venueService: VenueService, private _route: Router) { }

  ngOnInit(): void {
    this.getVenueData();
  }

  getVenueData():void{
    this._venueService.getVenueDetails().subscribe(
      (venueData) => {
        this.venueDetails = venueData
      },
      (error) => {
        console.error('Error retrieving assets:', error);
      }
    )
  }

  onAdd(): void {
    this.venueId = 0;
    this.venueName = '';
    this.venueDescription = '';
    this.venueCostPerHour = 0;
    this.forEdit = false;
    this.forAdd = true;
    this.showModalv = true;
  }

  onEdit(venue: IVenue): void {
    this.venueId = venue.venueId;
    this.venueName = venue.venueName;
    this.venueDescription = venue.venueDescription;
    this.venueCostPerHour = venue.venueCostPerHour;

    this.showModalv = true;
    this.forAdd = false;
    this.forEdit = true;
  }


  addVenue(): void {
    const venue: IVenue = {
      venueId: 0,
      venueName: this.venueName,
      venueDescription: this.venueDescription,
      venueCostPerHour: this.venueCostPerHour
    };

    this._venueService.addVenue(venue).subscribe(
      (response) => {
        this.closeModal();
        alert(JSON.parse(response).message);
        this.getVenueData();
      },
      (error) => {
        console.log('Error: ' + error);
      }
    )
  }

  editVenue(): void {
    const venue: IVenue = {
      venueId: this.venueId,
      venueName: this.venueName,
      venueDescription: this.venueDescription,
      venueCostPerHour: this.venueCostPerHour
    };

    this._venueService.editVenue(venue).subscribe(
      (response) => {
        this.closeModal();
        alert(JSON.parse(response).message);
        this.getVenueData();
      },
      (error) => {
        console.log('Error posting data:', error);
      }
    );
  }

  deleteVenue(venueId: number): void {
    var confirmToDelete = confirm("Do you want to delete?");
    if (confirmToDelete) {
      this._venueService.deleteVenue(venueId).subscribe(
        (response) => {
          this.closeModal();
          alert(JSON.parse(response).message);
          this.getVenueData();
        },
        (error) => {
          console.log('Error: ' + error);
        }
      )
    }
  }
  closeModal() {
    this.showModalv = false;
  }
}
