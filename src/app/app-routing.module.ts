import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StudentComponent } from "./student/student.component";
import { FacultyComponent } from "./faculty/faculty.component";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { StudentSignupComponent } from "./student-signup/student-signup.component";
import { FacultySignupComponent } from "./faculty-signup/faculty-signup.component";
import { CanActiveStudentService } from './can-active-student.service';
import { CanactiveFacultyService } from './canactive-faculty.service';
import { FacultyprofileComponent } from './faculty/facultyprofile/facultyprofile.component';
import { TransComponent } from './trans/trans.component';

const appRoutes: Routes = [
  /*{ path: "student", component: StudentComponent},
  { path: "faculty", component: FacultyComponent },
  { path: "admin", component: AdminComponent},
  { path: "studentSignup", component: StudentSignupComponent},
  { path: "facultySignup", component: FacultySignupComponent},
  */
  {
    path: "student", component: StudentComponent,
    canActivate: [CanActiveStudentService]
  },
  {
    path: "faculty", component: FacultyComponent,
    canActivate: [CanactiveFacultyService]
  },
  {
    path: "admin", component: AdminComponent,
    canActivate: [CanactiveFacultyService]
  },
  {
    path: "studentSignup", component: StudentSignupComponent
    // canActivate: [CanActiveStudentService]
  },
  {
    path: "facultySignup", component: FacultySignupComponent
    // canActivate: [CanActiveStudentService]
  },
  {
    path: "facultyEdit", component: FacultyprofileComponent
    // canActivate: [CanActiveStudentService]
  },
  {
    path: "trans", component: TransComponent
    // canActivate: [CanActiveStudentService]
  },
  // { path: "login", component: LoginComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
