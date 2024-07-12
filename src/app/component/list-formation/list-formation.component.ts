import {AfterViewInit, Component, EventEmitter, Output, output} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Formation} from "../../models/formation/formation.model";
import {FormationService} from "../../services/formation/formation.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrl: './list-formation.component.scss'
})
export class ListFormationComponent implements AfterViewInit{
  constructor (private formationService :FormationService ,private router: Router){

  }
  @Output() isFormationName = new EventEmitter<any>();

  inscription(formationName: string | undefined,formation_id:number){
    if (formationName) {

      this.router.navigate(['inscription', formationName,formation_id]);
    }


  }

formation? :Formation[];
  ngAfterViewInit(){

    // Activate tooltip
    this.retrieveFormation();

  }
  retrieveFormation():void{
    this.formationService.getAll()
      .subscribe(
        {
          next:(data)=>{
            this.formation=data;
            console.log(this.formation);
          }
          ,
          error:(e)=>console.error(e)
        });
  }
}
