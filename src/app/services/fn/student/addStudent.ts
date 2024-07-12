import {PaymentRequest$Params} from "../../../models/studentPayment/paymentRequest$Params";
import {studentRequest$Params} from "../../../models/student/studentRequest$Params";
import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {RequestBuilder} from "../../RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../StrictHttpResponse";
import {addStudentPayment$Params} from "./addStudentPayment";

export interface addStudent$Params{
  body:studentRequest$Params;
}
export function addStudent(http: HttpClient, rootUrl: string, params?: addStudent$Params, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl,addStudent.PATH , 'post');
  if (params) {
    rb.body(params.body, 'application/json');
    ;
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<number>;
    })
  );
}
addStudent.PATH = '/student/addStudent';
