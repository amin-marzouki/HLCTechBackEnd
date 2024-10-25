import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Student} from "../../models/student/student.model";
import {HttpClient, HttpContext} from "@angular/common/http";
import {findStudentPaymentList, FindStudentPaymentList$Params} from "../fn/student/find-Student-Payment-List";
import {StrictHttpResponse} from "../http/StrictHttpResponse";
import {PaymentResponse} from "../../models/studentPayment/paymentResponse";
import {map} from "rxjs/operators";
import {BaseService} from "../auth/base.service";
import {ApiConfiguration} from "../http/ApiConfiguration";
import {studentFormationPayments$params} from "../../models/studentFormationPayments/studentFormationPayments";
import {
  findStudentFormationAndPamyents,
  studentFormationPayments$request
} from "../fn/student/findStudentFormationAndPamyents";
import {findStudentById, findStudentById$Params} from "../fn/student/findStudentById";
import {student$Response} from "../../models/student/student$Response";

const baseUrl = 'http://localhost:8080/api';
const liststudenturl = 'http://localhost:8080/api/listStudents';
const Url = 'http://localhost:8080/api/updateStudent';
const addurl='addStudent'
@Injectable({
  providedIn: 'root'
})
export class StudentService  extends BaseService {

  constructor(config:ApiConfiguration, http :HttpClient) {
    super(config,http)
  } ;



  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(liststudenturl);
  }

  get(id: any): Observable<Student> {
    return this.http.get<Student>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${addurl}`, data);
  }

  update(data: any): Observable<any> {
    return this.http.post(`${Url}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Student[]> {
    return this.http.get<Student[]>(`${baseUrl}?title=${title}`);
  }


  findStudentFormationAndPamyents$Response(params?: studentFormationPayments$request, context?: HttpContext): Observable<StrictHttpResponse<studentFormationPayments$params[]>> {
    return findStudentFormationAndPamyents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */

  findStudentFormationAndPamyents(params?: studentFormationPayments$request, context?: HttpContext): Observable<studentFormationPayments$params[]> {
    return this.findStudentFormationAndPamyents$Response(params, context).pipe(
      map((r: StrictHttpResponse<studentFormationPayments$params[]>): studentFormationPayments$params[] => r.body)
    );
  }

  findStudentById$Response(params?: findStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<student$Response>> {
    return findStudentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */

  findStudentById(params?: findStudentById$Params, context?: HttpContext): Observable<student$Response> {
    return this.findStudentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<student$Response>): student$Response => r.body)
    );
  }

}
