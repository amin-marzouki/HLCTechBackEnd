import {Component, OnInit,AfterViewInit } from '@angular/core';
import {StudentService} from "../services/student.service";
import {Student} from "../models/student/student.model";
import {FormControl, Validators} from "@angular/forms";

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from '../dialogs/notification/notification.component';
//import { MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.scss',

})
export class ListStudentComponent implements AfterViewInit {
  /**
   * The constructor for the student list component.
   *
   * @param modalService a dependency injection (DI) for NgbModal
   */
  constructor (private studentService :StudentService,private modalService: NgbModal){

  }
  @Output() isStudentDetail = new EventEmitter<any>();
  onDetailClick(student:Student) {
    const data1= true
    this.isStudentDetail.emit({data1,student});
  }

  filtredStudentList:Student[]=[];
  student?: Student[];
  currentStudent: Student={};
  currentIndex= -1;
  selectedStudents: Set<Student> = new Set<Student>();
  editStudentId = -1;
  students: Student[] = [];
  expandedStudents: Set<number> = new Set<number>();
  isProcessing = true;
  isAdding=false;
  columnsToDisplay: string[] = ['select', 'expandRow', 'studentId', 'Name', 'famillyName', 'email', 'editDelete'];
  selection = new SelectionModel<Student>(true, []);


  firstNameFormControl = new FormControl('',[Validators.required]);
  studentIdFormControl = new FormControl('',[Validators.required]);
  famillyNameFormControl = new FormControl('',[Validators.required]);
  cinFormControl = new FormControl('',[Validators.required]);
  phoneNumberFormControl = new FormControl(0,[Validators.required]);
  emailFormControl = new FormControl('',[Validators.required]);
  classFormControl=new FormControl('',[Validators.required]);
  adresseFormControl=new FormControl('',[Validators.required]);


  filterResults(text: string) {

    if (!text) {
      this.filtredStudentList = this.students;
      return;
    }

    this.filtredStudentList = this.students.filter(
     st =>
         st?.email?.toLowerCase().includes(text.toLowerCase()),

   //st?.Cin?.toLowerCase().includes(text.toLowerCase())
      //  const filterByfamilly=st?.famillyName?.toLowerCase().includes(text.toLowerCase());
       // const filterByemail=st?.email?.toLowerCase().includes(text.toLowerCase());
//console.log(filterByName)
       // return filterByName && filterBycin && filterByfamilly && filterByemail;

     // }
    );
  }
  /**
   * show detail component and hide list student component
   *
   * */
  /**
   * Returns true if the student is currently being edited.
   *
   * @param studentId the studentId
   */
  isEditingStudent(studentId: number): boolean {
    return this.editStudentId === studentId;
  }
  adding(){
    return this.isAdding;
  }
  isAddDisabled(){
    if(this.firstNameFormControl.invalid || this.famillyNameFormControl || this.emailFormControl.invalid || this.cinFormControl.invalid || this.classFormControl.invalid || this.adresseFormControl.invalid){
      return true;
    }
    return false;
  }
  ngAfterViewInit(){
 this.isProcessing=true;
    this.studentService.getAll()
      .subscribe(
        {
          next:(data)=>{
            this.isProcessing=false;
            this.filtredStudentList=data;
            this.students=data;


          }
          ,
          error:(e)=>console.error(e)
        });


  }
  isStudentExpanded(studentId: number): boolean {
    return this.expandedStudents.has(studentId);
  }
  /**
   * Returns the class for the add header row based on whether or not the table is in add mode.
   */
  getAddHeaderRowClass(): string {
    if (this.isAdding) {
      return 'adding';
    }

    return 'not-adding';
  }
  /**
   * Returns the class to apply to the table row based on whether or not it is expanded.
   *
   * @param studentId the studentId
   */
  getStudentDetailClass(studentId: number): string {
    if (this.isStudentExpanded(studentId)) {
      return 'detail-row-expanded';
    }

    return 'detail-row-collapsed';
  }

  /**
   * Called when add student icon is clicked. Enters add mode.
   */
  onAddStudentClick(): void {
    this.isAdding = true;
    this.editStudentId = -1; // exit edit mode (if necessary)
   this.cinFormControl.setValue('');
   this.phoneNumberFormControl.setValue(0);

   this.adresseFormControl.setValue('');
    this.studentIdFormControl.setValue('');
    this.firstNameFormControl.setValue('');
    this.famillyNameFormControl.setValue('');
    this.emailFormControl.setValue('');
  }

  /**
   * Called when the edit icon is clicked for the student. Places the student in edit mode.
   *
   * @param studentId the studentId
   */
  onEditClick(studentId: number): void {
    this.isAdding = false; // exit add mode (if necessary)

    // Set the id of the student that is being edited
    this.editStudentId = studentId;

    // Get the student that is being edited
    const student: Student  = this.students.find(s => s.studentId === studentId)!;

    // For some reason, updating a row that's expanded messes up the detail row display
    // so we'll collapse rows that we're editing
    this.collapseStudent(studentId);


    this.firstNameFormControl.setValue(student.name?? '');
    this.famillyNameFormControl.setValue(student.famillyName?? '');
    this.emailFormControl.setValue(student.email?? '');
    this.famillyNameFormControl.setValue(student.famillyName??'');
    this.classFormControl.setValue(student.classe??'');
    this.cinFormControl.setValue(student.Cin??'');
    const phoneNumberValue: number | null = typeof student.phoneNumber === 'number' ? student.phoneNumber : null;
    this.phoneNumberFormControl.setValue(phoneNumberValue);
    this.adresseFormControl.setValue(student.adresse ?? '');
    this.studentIdFormControl.setValue(student.studentId??'');


  }
  /**
   * Called when the delete student icon is clicked for a student. Deletes the student and refreshes the table.
   *
   * @param studentId the studentId
   */
  onDeleteClick(studentId: number): void {
    const modalRef = this.modalService.open(ConfirmDialogComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.message = 'Are you sure you want to delete this student?';

    modalRef.result.then((confirmedDelete: boolean) => {
      if (confirmedDelete) {
        this.isProcessing = true;
        this.studentService.delete(studentId)
          .subscribe(rsp => {
            this.isProcessing = false;
            if (rsp.success) {
              // Reload the students passing in a post load function that sets editStudentId = -1
              // so the row will exit edit mode
              const postLoadFunction = (): void => { this.editStudentId = -1; };
              this.reloadStudents(postLoadFunction);
            } else {
              const modalRefError = this.modalService.open(NotificationComponent, { size: 'sm', centered: true });
              modalRefError.componentInstance.title = 'Error';
              modalRefError.componentInstance.message = rsp.error;
            }
          });
      }
    });
  }
  /**
   * Returns true if update is disabled due to one or more form controls having an invalid value.
   */
  isUpdateDisabled(): boolean {
    // If any of the form controls are invalid, return true so the Update icon will be disabled
    if (this.studentIdFormControl.invalid || this.firstNameFormControl.invalid ||
      this.famillyNameFormControl.invalid || this.emailFormControl.invalid) {
      return true;
    }

    return false;
  }
  /**
   * Called when cancel icon is clicked while a student is being edited. Cancels edit mode.
   *
   * @param studentId the studentId
   */
  onCancelEditClick(): void {
    // Set editStudentId = -1 so the row will exit edit mode
    this.editStudentId = -1;
  }
  /**
   * Removes the student from the set of expanded students.
   *
   * @param studentId the studentId to remove from the set of expanded students
   */
  collapseStudent(studentId: number): void {
    this.expandedStudents.delete(studentId);
  }










  /**
   * If the form control has an error, returns the error message.
   *
   * @param formControl the form control
   */
  getErrorMessage(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    if (formControl.hasError('email')) {
      return 'Not a valid email';
    }

    if (formControl.hasError('invalidSchoolId')) {
      return formControl.getError('invalidSchoolId').errorMsg;
    }

    return '';
  }
  /**
   * Called to reload the students after events like filtering, add student, delete student, etc.
   *
   * @param postLoadFunction the function to call after the students are reloaded
   */
  reloadStudents(postLoadFunction: () => void): void {
    this.isProcessing = true;
    this.studentService.getAll().subscribe(students => {
      this.student=students;
      this.students = students;
      this.isProcessing = false;
      postLoadFunction();
    });
  }

  /**
   * Toggles a student between selected and not selected.
   *
   * @param student the student to select/unselect
   */
  studentToggle(student: Student): void {
    if (this.selectedStudents.has(student)) {
      this.selectedStudents.delete(student);
    } else {
      this.selectedStudents.add(student);
    }
  }
  onUpdateClick(){
    this.isAdding=false;
    const student: Student = {
      studentId: `${this.studentIdFormControl.value}`,
      name: `${this.firstNameFormControl.value}`,
      famillyName: `${this.famillyNameFormControl.value}`,
      Cin: `${this.cinFormControl.value}`,
      phoneNumber: this.phoneNumberFormControl.value,
      classe:`${this.classFormControl.value}`,
      email:`${this.emailFormControl.value}`,
      adresse:`${this.adresseFormControl.value}`,

      formation_id:1,
    };
    this.isProcessing = true;
    console.log(student);
    this.studentService.update(student)
      .subscribe({ next: (res) =>  {
        this.isProcessing = false;
        const postLoadFunction = (): void => { this.editStudentId = -1; };
        this.reloadStudents(postLoadFunction);
   console.log(res)
      },
    error: (e) => console.error(e)
      });
  }

  /**
   * Called when cancel icon is clicked while a student is being added. Cancels add mode.
   *
   * @param studentId the studentId
   */
  onCancelAddClick(): void {
    // Set isAdding = -1 false the add header row will be hidden
    this.isAdding = false;
  }
  /**
   * Called when the add student icon is clicked for a student. Adds the student and refreshes the table.
   */
  onAddClick(): void {
    // Add the student
    const student: Student = {
      studentId: `${this.studentIdFormControl.value}`,
      name: `${this.firstNameFormControl.value}`,
      famillyName: `${this.famillyNameFormControl.value}`,
      email: `${this.emailFormControl.value}`,
      phoneNumber: this.phoneNumberFormControl.value,
      adresse: `${this.adresseFormControl.value}`,
      Cin: `${this.cinFormControl.value}`,
      classe:`${this.classFormControl.value}`,
      formation_id:1,



    };

    this.isProcessing = true;
    this.studentService.create(student)
      .subscribe({
        next: (res) => {
          console.log(res);

        },
        error: (e) => console.error(e)
      });
  }

}

