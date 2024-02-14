import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAssets } from './assets/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private _http: HttpClient) { }

  private baseUrl = 'http://localhost:5251/api/Assets';

  getAssets(): Observable<IAssets[]> {
    return this._http.get<IAssets[]>(this.baseUrl);
  }

  postData(data: IAssets): Observable<any> {
    return this._http.post(this.baseUrl, data, { responseType: 'text' });
}

}
