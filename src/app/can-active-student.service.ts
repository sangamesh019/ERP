import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router/src/utils/preactivation';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActiveStudentService implements CanActivate {

    // canActivate(){

    // }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot){
        let who = localStorage.getItem('who');
        if(who === 'Student'){
            return true;
        } else {
            return false;
        }
    }
}
