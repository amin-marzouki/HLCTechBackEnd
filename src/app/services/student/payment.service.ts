import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Payment} from "../../models/studentPayment/payment.model";

const pUrl = 'http://localhost:8080/api/listPayment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http :HttpClient) { }

  getAll(id:any){
    return this.http.get<Payment[]>(`${pUrl}/${id}`);

  }
  add(payment:Payment){
    return this.http.post<Payment>(`${pUrl}/add`,payment);
  }
}
