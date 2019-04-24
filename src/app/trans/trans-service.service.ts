import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransServiceService {

  constructor(public http: HttpClient) {

  }
  public httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    })
  };

  registerNewV(newVehicle): Observable<any> {
    return this.http.post('http://localhost:8080/college/updateVehicleDetails', newVehicle);
  }
  saveLog(log): Observable<any> {
    return this.http.post('http://localhost:8080/college/updateVehicleLog', log);
  }
  
  listVehicleDetails(): Observable<any> {
    return this.http.get('http://localhost:8080/college/listVehicleDetails');
  }

  getVehicleLogData(): Observable<any> {
    return this.http.get('http://localhost:8080/college/getVehicleLogDetails');
  }
  
}
