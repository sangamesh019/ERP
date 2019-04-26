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
import { CanActiveStudentService } from './can-active-student.service';
import { TransComponent } from './trans/trans.component';
import { InsucranceComponent } from './trans/insucrance/insucrance.component';
import { RoadtaxComponent } from './trans/roadtax/roadtax.component';
import { FuelComponent } from './trans/fuel/fuel.component';
import { FitnessComponent } from './trans/fitness/fitness.component';

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
    FacultySignupComponent,
    TransComponent,
    InsucranceComponent,
    RoadtaxComponent,
    FuelComponent,
    FitnessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [StudentServieService, CanActiveStudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
