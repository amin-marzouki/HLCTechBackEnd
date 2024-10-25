import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../services/formation/formation.service";
import {activeFormationDetail$Response} from "../../models/formation/activeFormationDetail$Response";
import {student$Response} from "../../models/student/student$Response";
import {PaymentResponse} from "../../models/studentPayment/paymentResponse";
import {StudentAndPaymentResponse} from "../../models/student/studentAndPayment$Response";


@Component({
  selector: 'app-formation-active-detail',
  templateUrl: './formation-active-detail.component.html',
  styleUrl: './formation-active-detail.component.scss'
})
export class FormationActiveDetailComponent implements OnInit{
  foramtionDetail?: activeFormationDetail$Response ;
  filtreStudent:StudentAndPaymentResponse[]=[];
  studentList:StudentAndPaymentResponse[]=[];
  paymentList:PaymentResponse[]=[];
  filterPayment:PaymentResponse[]=[];

  constructor(private route:ActivatedRoute,private fomrationServ:FormationService) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
this.retrieveFormationDetailById(Number(params.get('activeFormationId')))

    })
  }
  retrieveFormationDetailById(id:number){
    this.fomrationServ.retrieveFormationDetailById({formation_id:id}).subscribe(
      {
      next:(detail)=>{
        this.foramtionDetail=detail;
        this.studentList=detail.students || [];
        this.filtreStudent=detail.students || [];


        console.log(this.foramtionDetail)
      }
      }
    )
  }


  filterResults(text: string) {

    if (!text) {
      this.filtreStudent = this.studentList;
      return;
    }

    this.filtreStudent = this.studentList.filter(
      st =>
        st?.email?.toLowerCase().includes(text.toLowerCase()),

      //st?.Cin?.toLowerCase().includes(text.toLowerCase())
      //  const filterByfamilly=st?.famillyName?.toLowerCase().includes(text.toLowerCase());
      // const filterByemail=st?.email?.toLowerCase().includes(text.toLowerCase());
//console.log(filterByName)
      // return filterByName && filterBycin && filterByfamilly && filterByemail;

      // }
    ) ;
  }

  expandedIndex: number | null = null;

  togglePayments(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }


}
