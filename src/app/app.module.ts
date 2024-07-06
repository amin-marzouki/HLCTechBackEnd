import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from './dialogs/notification/notification.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { RegisterComponent } from './register/register.component';
import { CrudformationComponent } from './crudformation/crudformation.component';
import { ListFormerComponent } from './list-former/list-former.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { AutocompletePipe } from './autocomplete.pipe';
import { StudentManageComponent } from './student-manage/student-manage.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import {CodeInputModule} from 'angular-code-input';
import { LoginComponent } from './login/login.component';





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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatProgressSpinner,
    CodeInputModule


  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
