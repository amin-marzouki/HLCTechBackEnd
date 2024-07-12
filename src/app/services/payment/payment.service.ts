import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient, HttpContext} from "@angular/common/http";

import {StrictHttpResponse} from "../StrictHttpResponse";
import {findStudentPaymentList, FindStudentPaymentList$Params} from "../fn/student/find-Student-Payment-List";
import {PaymentResponse} from "../../models/studentPayment/paymentResponse";
import {map} from "rxjs/operators";
import {BaseService} from "../auth/base.service";
import {ApiConfiguration} from "../ApiConfiguration";
import {addStudentPayment, addStudentPayment$Params} from "../fn/student/addStudentPayment";

const baseUrl = 'http://localhost:8080/api/payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  constructor(config:ApiConfiguration,http :HttpClient) {
    super(config, http);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  addStudentPaymenr$Response(params?:addStudentPayment$Params, context?: HttpContext):Observable<StrictHttpResponse<number>>{
return addStudentPayment(this.http,this.rootUrl,params,context);
  }
 addStudentPayment(params?: addStudentPayment$Params, context?: HttpContext): Observable<number>{
    return this.addStudentPaymenr$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    )
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  findStudentPayment$Response(params?: FindStudentPaymentList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaymentResponse[]>> {
    return findStudentPaymentList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findStudentPamyents(params?: FindStudentPaymentList$Params, context?: HttpContext): Observable<PaymentResponse[]> {
    return this.findStudentPayment$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaymentResponse[]>): PaymentResponse[] => r.body)
    );
  }


}
