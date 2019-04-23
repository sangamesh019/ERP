import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanactiveFacultyService implements CanActivate{

  canActivate(){
    let who = localStorage.getItem('who');
    if(who === 'faculty' || who === 'Admin'){
        return true;
    } else {
        return false;
    }
}
}
