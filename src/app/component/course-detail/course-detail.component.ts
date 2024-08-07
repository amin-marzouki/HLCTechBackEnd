import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../services/formation/formation.service";
import {courseDetail$Response} from "../../models/formation/courseDetail$response";
import {Formation} from "../../models/formation/formation.model";
import {courseSkills$Response} from "../../models/formation/courseSkills$Response";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  constructor(private route:ActivatedRoute,private formationServ:FormationService,private router: Router) {
  }
courseSkills:courseSkills$Response[]=[];
courseDetailsList:courseDetail$Response[]=[];
  formationName :string | null = null;
  formation_id : number| null = null;
  formation?:Formation;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formationName = params.get('formationName');
      this.formation_id=Number(params.get('formationId'));
      console.log(this.formation_id)
     this.retriveCourseDetail();
      this.retriveCourseSkills();
    });

  }
  retriveCourseDetail(){
    return this.formationServ.retrieveCourseDetail({formation_id:this.formation_id??1}).subscribe(
      {
        next: (details) => {
          console.log(details)
          this.courseDetailsList=details;
          console.log("hello"+this.courseDetailsList[0].nomChapter);
          this.formation=details[0].formation;
        }
      }
    )
  }
  retriveCourseSkills(){
    return this.formationServ.retrieveCourseSkills({formation_id:this.formation_id??1}).subscribe(
      {
        next:(skills)=>{
          this.courseSkills=skills;
          console.log(skills);
        }
      }
    )
  }

  inscription(formationName: string | undefined,formation_id:number){
    if (formationName) {

      this.router.navigate(['inscription', formationName,formation_id]);
    }


  }
}
