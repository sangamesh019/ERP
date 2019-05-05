import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'collegeERP';

  profileForm: FormGroup;
  userStatus: string;
  showError: boolean;
  loginUser: boolean;
  role: boolean;
  showModal: boolean;
  whoLogged: string;

  // fb: FormBuilder;

  constructor(public fb: FormBuilder, public service: LoginService, public route: Router, public cdr: ChangeDetectorRef) {

  }
  ngOnInit() {
    
    if(localStorage.getItem('who')){
      
      this.loginUser = true;
      this.whoLogged = localStorage.getItem('who');
    }else {
      this.loginUser = false;
    }
    this.showError = false;
    this.profileForm = this.fb.group({
      who: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterContentChecked(){
    this.cdr.detectChanges;
    if(localStorage.getItem('who')){
      
      this.loginUser = true;
      this.whoLogged = localStorage.getItem('who');
    }else {
      this.loginUser = false;
    }
  }
  login() {
    if (this.profileForm.valid) {
      if(this.profileForm.controls['who'].value !== 'transAdmin'){
      this.service.loginUser({ "usn": this.profileForm.controls['userName'].value, "password": this.profileForm.controls['password'].value, 'role': this.profileForm.controls['who'].value }).subscribe(result => {
        if (result) {
          alert('user present')
          localStorage.setItem('who' , this.profileForm.controls['who'].value);
          localStorage.setItem('id' , this.profileForm.controls['userName'].value);
          this.loginUser = true;
          this.route.navigateByUrl('/home');
          document.getElementById("modalLoginForm").click();
        } else {
          this.userStatus = 'The usn and password doesnt match';
        }
      
      });
    } else {

      if(this.profileForm.controls['userName'].value === "TransAdmin" && this.profileForm.controls['password'].value === "admin"){
        alert('user present')
          localStorage.setItem('who' , this.profileForm.controls['who'].value);
          localStorage.setItem('id' , this.profileForm.controls['userName'].value);
          this.loginUser = true;
          this.route.navigateByUrl('/home');
          document.getElementById("modalLoginForm").click();
      } else {
        
        this.userStatus = 'The usn and password doesnt match';
      }
    }
    } else {
      alert("invalid form data");
    }
  }

  changeRole(){
    if(this.profileForm.controls['who'].value === 'Student'){
      this.role = true;
    } else {
      this.role = false;
    }
  }

  logOut(){
    localStorage.removeItem('who');
    localStorage.removeItem('id');
    this.loginUser = false;
    this.showModal = false;
    document.getElementById("modalLoginForm").click();
    this.route.navigateByUrl('/home');
  }
  logInModal(){
    this.showModal = true;
  }

  signUpStudent(){
    document.getElementById("modalLoginForm").click();
  }

  
  signUpFac(){
    document.getElementById("modalLoginForm").click();
  }
  get userName() { return this.profileForm.get('userName'); }
  get password() { return this.profileForm.get('password'); }
}
