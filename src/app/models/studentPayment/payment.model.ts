import {Formation} from "../formation/formation.model";

export class Payment {
  Id?:any;
  Amount?:number| null=null;
  Date?:Date;
  Detail?:string;
  Student_id?:any;
  receiver?:string;
}
