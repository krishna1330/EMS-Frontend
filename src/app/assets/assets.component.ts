import { Component, OnInit } from '@angular/core';
import { IAssets } from './assets';
import { AssetsService } from '../assets.service';
import { error } from 'jquery';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  providers: [AssetsService],
})
export class AssetsComponent implements OnInit {
  assets: IAssets[] = [];
  showModal: boolean = false;
  forEdit: boolean = false;
  forAdd: boolean = false;

  assetId: number = 0;
  assetName: string = '';
  assetDescription: string = '';
  assetCostPerDay: number = 0;
  assetStockAvailability: number = 0;

  constructor(private _assetsService: AssetsService) { }

  ngOnInit(): void {
    this._assetsService.getAssets().subscribe(
      (assetsData) => {
        this.assets = assetsData;
      },
      (error) => {
        console.error('Error retrieving assets:', error);
      }
    );
  }

  onAdd(): void {
    this.assetId = 0;
    this.assetName = '';
    this.assetDescription = '';
    this.assetCostPerDay = 0;
    this.assetStockAvailability = 0;
    this.forEdit = false;
    this.forAdd = true;
    this.showModal = true;
  }

  onEdit(asset: IAssets): void {
    this.assetId = asset.assetId;
    this.assetName = asset.assetName;
    this.assetDescription = asset.assetDescription;
    this.assetCostPerDay = asset.assetCostPerDay;
    this.assetStockAvailability = asset.assetStockAvailability;

    this.showModal = true;
    this.forAdd = false;
    this.forEdit = true;
  }

  editAsset(): void {
    const asset: IAssets = {
      assetId: this.assetId,
      assetName: this.assetName,
      assetDescription: this.assetDescription,
      assetCostPerDay: this.assetCostPerDay,
      assetStockAvailability: this.assetStockAvailability
    };

    this._assetsService.editAsset(asset).subscribe(
      (response) => {
        this.closeModal();
        alert(JSON.parse(response).message);
        window.location.reload();
      },
      (error) => {
        console.log('Error posting data:', error);
      }
    );
  }

  addAsset(): void {
    const asset: IAssets = {
      assetId: 0,
      assetName: this.assetName,
      assetDescription: this.assetDescription,
      assetCostPerDay: this.assetCostPerDay,
      assetStockAvailability: this.assetStockAvailability
    };

    this._assetsService.addAsset(asset).subscribe(
      (response) => {
        this.closeModal();
        alert(JSON.parse(response).message);
        window.location.reload();
      },
      (error) => {
        console.log('Error: ' + error);
      }
    )
  }

  deleteAsset(assetId: number): void {
    var confirmToDelete = confirm("Do you want to delete?");
    if (confirmToDelete) {
      this._assetsService.deleteAsset(assetId).subscribe(
        (response) => {
          this.closeModal();
          alert(JSON.parse(response).message);
          window.location.reload();
        },
        (error) => {
          console.log('Error: ' + error);
        }
      )
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
