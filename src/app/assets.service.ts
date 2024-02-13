import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssets } from './assets/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private _http: HttpClient) { }

  private apiUrl = 'http://localhost:5251/api/Assets';

  getAssets(): Observable<IAssets[]> {
    //console.log('Sending HTTP GET request to:', this.apiUrl);
    return this._http.get<IAssets[]>(this.apiUrl);
  }
}
