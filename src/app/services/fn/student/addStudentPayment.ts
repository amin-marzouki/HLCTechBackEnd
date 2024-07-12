import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {RequestBuilder} from "../../RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../StrictHttpResponse";
import {PaymentRequest$Params} from "../../../models/studentPayment/paymentRequest$Params";



export interface addStudentPayment$Params{
  body:PaymentRequest$Params;
}
export function addStudentPayment(http: HttpClient, rootUrl: string, params?: addStudentPayment$Params, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl,addStudentPayment.PATH , 'post');
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
addStudentPayment.PATH = '/student/addPayment';

