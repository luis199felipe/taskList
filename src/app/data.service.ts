import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {
    console.error("Servicio funcionando");
  }

  getData(){
      return this.http.get('http://localhost/json/data.json');
  }
}
