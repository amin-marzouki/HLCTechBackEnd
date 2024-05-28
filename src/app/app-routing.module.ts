import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListStudentComponent} from "./list-student/list-student.component";
import {ListFormationComponent} from "./list-formation/list-formation.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {StudentManageComponent} from "./student-manage/student-manage.component";
import {InscriptionComponent} from "./inscription/inscription.component";



const routes: Routes = [
  { path: '', redirectTo: 'navbar', pathMatch: 'full' },
  { path: 'Student', component: StudentManageComponent },
  { path: 'Formation', component: ListFormationComponent },
  { path: 'navbar', component: NavbarComponent },
  {path: 'inscription',component:InscriptionComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
