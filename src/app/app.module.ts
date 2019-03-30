import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { FacultyComponent } from './faculty/faculty.component';
import { AdminComponent } from './admin/admin.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { FacultyprofileComponent } from './faculty/facultyprofile/facultyprofile.component';
import { HodComponentComponent } from './faculty/hod-component/hod-component.component';
import { HomeComponent } from './home/home.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { FacultySignupComponent } from './faculty-signup/faculty-signup.component';
import { StudentServieService } from './student/student-servie.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    FacultyComponent,
    AdminComponent,
    StudentProfileComponent,
    FacultyprofileComponent,
    HodComponentComponent,
    HomeComponent,
    StudentSignupComponent,
    FacultySignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [StudentServieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
