import { Component, OnInit } from '@angular/core';
import { IAssets } from './assets';
import { AssetsService } from '../assets.service';

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

  postData(): void {
    const asset: IAssets = {
      assetId: this.assetId,
      assetName: this.assetName,
      assetDescription: this.assetDescription,
      assetCostPerDay: this.assetCostPerDay,
      assetStockAvailability: this.assetStockAvailability
    };
    console.log(asset);
    this._assetsService.postData(asset).subscribe(
      (response) => {
        this.closeModal();
        console.log(response);
        alert('Asset Updated Successfully');
        window.location.reload();
      },
      (error) => {
        console.log('Error posting data:', error);
      }
    );
  }


  closeModal() {
    console.log("---");
    this.showModal = false;
  }
}
