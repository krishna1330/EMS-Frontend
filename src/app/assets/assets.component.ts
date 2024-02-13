import { Component, OnInit } from '@angular/core';
import { IAssets } from './assets';
import { AssetsService } from '../assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  providers: [AssetsService]
})
export class AssetsComponent implements OnInit {
  assets: IAssets[] = [];

  constructor(private _assetsService: AssetsService) {

  }

  ngOnInit(): void {
    this._assetsService.getAssets().subscribe(
      (assetsData) => {
        this.assets = assetsData;
        // console.log('Received assets data:', this.assets);
        // console.log('Assets:', JSON.stringify(this.assets, null, 2));
      },
      (error) => {
        console.error('Error retrieving assets:', error);
      }
    );
    // console.log(this.assets);
  }
}
