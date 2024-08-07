import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './component/add-student/add-student.component';
import { ListStudentComponent } from './component/list-student/list-student.component';

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './mainComponent/navbar/navbar.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from './dialogs/notification/notification.component';
import { ListFormationComponent } from './component/list-formation/list-formation.component';
import { RegisterComponent } from './authcomponent/register/register.component';
import { CrudformationComponent } from './component/crudformation/crudformation.component';
import { ListFormerComponent } from './component/list-former/list-former.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { AutocompletePipe } from './autocomplete.pipe';
import { StudentManageComponent } from './component/student-manage/student-manage.component';
import { InscriptionComponent } from './component/inscription/inscription.component';
import { ActivateAccountComponent } from './component/activate-account/activate-account.component';
import {CodeInputModule} from 'angular-code-input';
import { LoginComponent } from './authcomponent/login/login.component';
import {RedirectService} from "./services/redirection";
import {PaymentComponent} from "./component/payment/payment.component";
import {StudentDetailComponent} from "./component/student-detail/student-detail.component";
import { CourseDetailComponent } from './component/course-detail/course-detail.component';
import { NewLineToBreakPipe } from './pip/new-line-to-break.pipe';
import { FooterComponent } from './mainComponent/footer/footer/footer.component';
import {MatNestedTreeNode, MatTree} from "@angular/material/tree";
import {FormationStatsComponent} from "./component/formation-stats/formation-stats.component";







@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    ListStudentComponent,
    StudentDetailComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    NotificationComponent,
    ListFormationComponent,
    RegisterComponent,
    CrudformationComponent,
    ListFormerComponent,
    AutocompletePipe,
    StudentManageComponent,
    InscriptionComponent,
    ActivateAccountComponent,
    LoginComponent,
    PaymentComponent,
    CourseDetailComponent,
    NewLineToBreakPipe,
    FooterComponent,
    FormationStatsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatProgressSpinner,
    CodeInputModule,
    MatTree,
    MatNestedTreeNode


  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
