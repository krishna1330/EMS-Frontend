import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssets } from './assets/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private _http: HttpClient) { }

  private baseUrl = 'http://localhost:5251/api/Assets/';

  getAssets(): Observable<IAssets[]> {
    return this._http.get<IAssets[]>(this.baseUrl + 'GetAssets');
  }

  editAsset(data: IAssets): Observable<any> {
    return this._http.post(this.baseUrl + 'EditAsset', data, { responseType: 'text' });
  }

  addAsset(data: IAssets): Observable<any> {
    return this._http.post(this.baseUrl + 'AddAsset', data, { responseType: 'text' });
  }

  deleteAsset(assetId: number): Observable<any> {
    return this._http.delete(this.baseUrl + 'DeleteAsset?assetId=' + assetId, { responseType: 'text' });
  }
}
