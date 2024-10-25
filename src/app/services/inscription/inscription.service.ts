import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {addStudentPayment$Params} from "../fn/student/addStudentPayment";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../http/StrictHttpResponse";
import {map} from "rxjs/operators";
import {addStudent, addStudent$Params} from "../fn/student/addStudent";
import {BaseService} from "../auth/base.service";
import {ApiConfiguration} from "../http/ApiConfiguration";

const baseUrl = 'http://localhost:8080/api/payment';
@Injectable({
  providedIn: 'root'
})
export class InscriptionService extends BaseService{

  constructor(config:ApiConfiguration,http :HttpClient) {
    super(config, http);
  }


  addStudent$Response(params?:addStudent$Params,context?:HttpContext):Observable<StrictHttpResponse<number>>{
return addStudent(this.http,this.rootUrl,params,context);
  }

  addStudent(params?:addStudent$Params,context?:HttpContext):Observable<number>{
    return this.addStudent$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    )

  }

}
