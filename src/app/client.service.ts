import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  getCovidData(){
    return this.http.get(`http://localhost:3000/covidData`).toPromise();
  }
}
