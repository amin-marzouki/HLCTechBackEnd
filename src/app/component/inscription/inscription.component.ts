import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Student} from "../../models/student/student.model";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../services/student.service";
import {InscriptionService} from "../../services/inscription/inscription.service";
import {addStudent$Params} from "../../services/fn/student/addStudent";
import {studentRequest$Params} from "../../models/student/studentRequest$Params";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit{

  formationName :string | null = null;
  formation_id : number| null = null;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private inscrServ :InscriptionService) {
    this.EtatForm = this.fb.group({
      Etat: ['Employer'] // default value
    });
    this.genderForm=this.fb.group(
      {
        gender: ['female'] // default value
      }
    )
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formationName = params.get('formationName');
      this.formation_id=Number(params.get('formation_id'));
      console.log(this.formationName)
    });
  }
  EtatForm: FormGroup;
  genderForm: FormGroup;
  firstNameFormControl = new FormControl('',[Validators.required]);
  studentIdFormControl = new FormControl('',[Validators.required]);
  famillyNameFormControl = new FormControl('',[Validators.required]);
  cinFormControl = new FormControl('',[Validators.required]);
  phoneNumberFormControl = new FormControl(null,[Validators.required]);
  emailFormControl = new FormControl('',[Validators.required]);
  adresseFormControl=new FormControl('',[Validators.required]);
  onInscriptionSubmit(){

    const student: studentRequest$Params = {
      studentId: this.studentIdFormControl.value,
      name: this.firstNameFormControl.value|| '',
      famillyName: this.famillyNameFormControl.value|| '',
      email: `${this.emailFormControl.value}`,
      phoneNumber: this.phoneNumberFormControl.value?? 0,
      adresse: `${this.adresseFormControl.value}`,
      Cin: `${this.cinFormControl.value}`,
      //classe:`${this.classFormControl.value}`,
      formation_id:this.formation_id,
      Etat:this.EtatForm.value,
      Gender:this.genderForm.value,




    };
    console.log(student)
    this.inscrServ.addStudent({body:student}).subscribe({
      next:(res)=>{
        console.log(res)
      },

      error:(e)=> console.error(e)
    });

  }
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
     //lasse:`${this.classFormControl.value}`,
      formation_id:1,



    };


  }

}
