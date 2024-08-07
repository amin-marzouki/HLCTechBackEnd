import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListStudentComponent} from "./component/list-student/list-student.component";
import {ListFormationComponent} from "./component/list-formation/list-formation.component";
import {NavbarComponent} from "./mainComponent/navbar/navbar.component";
import {StudentManageComponent} from "./component/student-manage/student-manage.component";
import {InscriptionComponent} from "./component/inscription/inscription.component";
import {RegisterComponent} from "./authcomponent/register/register.component";
import {ActivateAccountComponent} from "./component/activate-account/activate-account.component";
import {LoginComponent} from "./authcomponent/login/login.component";
import {authGuard, authManager} from "./services/guard/auth.guard";
import {PaymentComponent} from "./component/payment/payment.component";
import {CourseDetailComponent} from "./component/course-detail/course-detail.component";
import {FormationStatsComponent} from "./component/formation-stats/formation-stats.component";



const routes: Routes = [
  { path: '', redirectTo: 'Formation', pathMatch: 'full' },
  { path: 'Student', component: StudentManageComponent ,canActivate: [authManager]},
  { path: 'Formation', component: ListFormationComponent  },
  { path: 'navbar', component: NavbarComponent ,canActivate: [authManager] },
  {path: 'inscription/:formationName/:formationId',component:InscriptionComponent },
  {path:'register',component:RegisterComponent} ,
  {path:'user-dashboard',component: ListFormationComponent ,canActivate: [authGuard]},
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {path:'login',component:LoginComponent},
  {path:'payment/:student_id',component:PaymentComponent},
  {path:'listStudent',component:ListStudentComponent},
  {path:'coursDetail/:formationName/:formationId',component:CourseDetailComponent},
  {path:'formationsStat',component:FormationStatsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
