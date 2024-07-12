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
import {authGuard} from "./services/guard/auth.guard";
import {PaymentComponent} from "./component/payment/payment.component";



const routes: Routes = [
  { path: '', redirectTo: 'Formation', pathMatch: 'full' },
  { path: 'Student', component: StudentManageComponent ,canActivate: [authGuard]},
  { path: 'Formation', component: ListFormationComponent  },
  { path: 'navbar', component: NavbarComponent ,canActivate: [authGuard] },
  {path: 'inscription/:formationName/:formationId',component:InscriptionComponent },
  {path:'register',component:RegisterComponent} ,
  {path:'user-dashboard',component: ListFormationComponent ,canActivate: [authGuard]},
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {path:'login',component:LoginComponent},
  {path:'payment',component:PaymentComponent},
  {path:'listStudent',component:ListStudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
