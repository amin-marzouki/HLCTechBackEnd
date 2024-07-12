import {StrictHttpResponse} from "../../StrictHttpResponse";
import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {filter, map} from "rxjs/operators";

import {RequestBuilder} from "../../RequestBuilder";
import {PaymentResponse} from "../../../models/studentPayment/paymentResponse";

export interface FindStudentPaymentList$Params {
  student_id?: number;

}
export function findStudentPaymentList(http: HttpClient, rootUrl: string, params?: FindStudentPaymentList$Params, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, findStudentPaymentList.PATH, 'get');
  if (params) {
    rb.path('student_id', params.student_id, {});
 ;
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaymentResponse[]>;
    })
  );
}
findStudentPaymentList.PATH = '/student/payment/{student_id}';
