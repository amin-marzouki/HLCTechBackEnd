import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Student} from "../models/student/student.model";
import {HttpClient} from "@angular/common/http";

const baseUrl = 'http://localhost:8080/api';
const liststudenturl = 'http://localhost:8080/api/listStudents';
const Url = 'http://localhost:8080/api/updateStudent';
const addurl='addStudent'
@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private http :HttpClient) { }
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

}
