import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { 

  }
  public  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  loginUser(userDetails): Observable<any> {
    let form = new FormData();
    form.append('usn', userDetails.usn);
    form.append('password', userDetails.password);
    form.append('role', userDetails.role);

    return this.http.post("http://localhost:8080/college/loginUser", form, this.httpOptions);
  }
}
