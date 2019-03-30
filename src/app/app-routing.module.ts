import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { FacultyComponent } from './faculty/faculty.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { FacultySignupComponent } from './faculty-signup/faculty-signup.component';

const appRoutes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'faculty',      component: FacultyComponent },
  { path: 'admin',      component: AdminComponent },
  { path: 'studentSignup',   component: StudentSignupComponent },
  { path: 'facultySignup',   component: FacultySignupComponent },
  // {
  //   path: 'student/:id',
  //   component: StudentComponent,
  // },
  // { path: '*',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
