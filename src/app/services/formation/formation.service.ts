import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../../models/student/student.model";
import {Formation} from "../../models/formation/formation.model";
import {CourseRequestParams} from "../../models/formation/courseRequest$Params";
import {PaymentResponse} from "../../models/studentPayment/paymentResponse";
import {courseDetail$Response} from "../../models/formation/courseDetail$response";
import {StrictHttpResponse} from "../http/StrictHttpResponse";
import {map} from "rxjs/operators";
import {retrieveCourseDetail} from "../fn/formations/retrieveCourseDetail";
import {ActivatedRoute} from "@angular/router";
import {BaseService} from "../auth/base.service";
import {ApiConfiguration} from "../http/ApiConfiguration";
import {courseSkills$Response} from "../../models/formation/courseSkills$Response";
import {retrieveCourseSkills} from "../fn/formations/retrieveCourseSkills";
import {retrieveActiveFormation} from "../fn/formations/retrieveActiveFormation";
import {formationActive$Response} from "../../models/formation/formationActive$Response";
import {retrieveTotalFormations} from "../fn/formations/retrieveTotalFormtions";
import {formationStats$Response} from "../../models/formation/formationStats$Response";
import {retrieveFormationStats} from "../fn/formations/retrieveFormationStats";
import {activeFormationDetail$Response} from "../../models/formation/activeFormationDetail$Response";
import {retrieveFormationDetailById} from "../fn/formations/retrieveFormationDetailById$Response";

const baseUrl = 'http://localhost:8080/api/listFormation';
@Injectable({
  providedIn: 'root'
})
export class FormationService extends BaseService {

  constructor(config:ApiConfiguration, http :HttpClient) {
    super(config,http)
  } ;

  getAll(): Observable<Formation[]> {
    return this.http.get<Formation[]>(baseUrl);
  }

  get(id: any): Observable<Formation> {
    return this.http.get<Formation>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${baseUrl}?title=${title}`);
  }

  retrieveCourseDetail$Response(params:CourseRequestParams,context?: HttpContext):Observable<StrictHttpResponse<courseDetail$Response[]>>{
    return retrieveCourseDetail(this.http,this.rootUrl,params,context);
  }
  retrieveCourseDetail(params:CourseRequestParams,context?: HttpContext): Observable<courseDetail$Response[]>{
return this.retrieveCourseDetail$Response(params,context).pipe(
  map((r: StrictHttpResponse<courseDetail$Response[]>): courseDetail$Response[] => r.body));

  }
  retrieveCourseSkills$Response(params:CourseRequestParams,context?: HttpContext):Observable<StrictHttpResponse<courseSkills$Response[]>>{
    return retrieveCourseSkills(this.http,this.rootUrl,params,context);
  }

  retrieveCourseSkills(params:CourseRequestParams,context?: HttpContext): Observable<courseSkills$Response[]>{
    return this.retrieveCourseSkills$Response(params,context).pipe(
      map((r: StrictHttpResponse<courseSkills$Response[]>): courseSkills$Response[] => r.body));

  }
  retrieveActiveFormation$Response(context?: HttpContext):Observable<StrictHttpResponse<formationActive$Response[]>>{
    return retrieveActiveFormation(this.http,this.rootUrl,context);

  }
  retrieveActiveFormation(context?:HttpContext):Observable<formationActive$Response[]>{
    return this.retrieveActiveFormation$Response(context).pipe(
      map((r:StrictHttpResponse<formationActive$Response[]>):formationActive$Response[]=>r.body)
    );

  }

  retrieveTotalFormations$Response(context?: HttpContext):Observable<StrictHttpResponse<formationActive$Response[]>>{
    return retrieveTotalFormations(this.http,this.rootUrl,context);

  }

  retrieveTotalFormations(context?:HttpContext):Observable<formationActive$Response[]>{
    return this.retrieveTotalFormations$Response(context).pipe(
      map((r:StrictHttpResponse<formationActive$Response[]>):formationActive$Response[]=>r.body)
    );

  }

  retrieveFormationStats$Response(context?:HttpContext):Observable<StrictHttpResponse<formationStats$Response>>{
    return retrieveFormationStats(this.http,this.rootUrl,context);
  }

  retrieveFormationStats(context?:HttpContext):Observable<formationStats$Response>{
    return this.retrieveFormationStats$Response(context).pipe(
      map((r:StrictHttpResponse<formationStats$Response>):formationStats$Response=>r.body)
    )
  }
  retrieveFormationDetailById$Response(params?:CourseRequestParams,context?:HttpContext){
    return retrieveFormationDetailById(this.http,this.rootUrl,params,context);

  }

  retrieveFormationDetailById(params?:CourseRequestParams,context?:HttpContext):Observable<activeFormationDetail$Response>{
return this.retrieveFormationDetailById$Response(params,context).pipe(
  map((r:StrictHttpResponse<activeFormationDetail$Response>):activeFormationDetail$Response=>r.body)
)
  }

}
