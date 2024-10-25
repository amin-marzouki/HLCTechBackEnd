import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../services/formation/formation.service";
import {formationActive$Response} from "../../models/formation/formationActive$Response";
import {formationStats$Response} from "../../models/formation/formationStats$Response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-formation-stats',
  templateUrl: './formation-stats.component.html',
  styleUrl: './formation-stats.component.scss'
})
export class FormationStatsComponent implements OnInit{

  constructor(private foramtionServ: FormationService,private router:Router) {
  }

  formationsActive  :formationActive$Response[]=[];
  totalForamtions:formationActive$Response[]=[];
  filtreFormation:formationActive$Response[]=[];
  formationStats?:formationStats$Response;

  ngOnInit(): void {
    this.retrieveActiveFormations();
    this.retrieveTotalFormations();
    this.retrieveFormationStats();
  }


  retrieveActiveFormations(){
    this.foramtionServ.retrieveActiveFormation().subscribe(
      {
        next:(
          detail
        )=>{
          this.formationsActive=detail;
          console.log(detail);
        }
      }
    )

  }

  retrieveTotalFormations(){
    this.foramtionServ.retrieveTotalFormations().subscribe(
      {
        next: (
          response
        ) => {
          this.totalForamtions = response;
          this.filtreFormation=response;
          console.log(response)

      }

      }
    )
  }

  retrieveFormationStats(){
    this.foramtionServ.retrieveFormationStats().subscribe(
      {
        next: (detail)=>{
          this.formationStats=detail;
          console.log(this.formationStats);

        }
      }
    )


  }

  filterResults(text: string) {

    if (!text) {
      this.filtreFormation = this.totalForamtions;
      return;
    }

    this.filtreFormation = this.totalForamtions.filter(
      st =>
        st?.formationName?.toLowerCase().includes(text.toLowerCase()),

      //st?.Cin?.toLowerCase().includes(text.toLowerCase())
      //  const filterByfamilly=st?.famillyName?.toLowerCase().includes(text.toLowerCase());
      // const filterByemail=st?.email?.toLowerCase().includes(text.toLowerCase());
//console.log(filterByName)
      // return filterByName && filterBycin && filterByfamilly && filterByemail;

      // }
    );
  }

  formationDetail(id: number ){
    this.router.navigate(["activeFormationDetail",id]);


  }
}

