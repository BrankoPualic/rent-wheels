import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string = 'https://rent-wheels.000webhostapp.com/functions/';

  constructor(private http: HttpClient) {}

  getData(destinationUrl: string) {
    return this.http.get(this.baseUrl + destinationUrl);
  }

  postDataJson(data: any, destinationUrl: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(this.baseUrl + destinationUrl, data, { headers });
  }
  postDataForm(data: any, destinationUrl: string): Observable<any> {
    return this.http.post(this.baseUrl + destinationUrl, data);
  }
}
