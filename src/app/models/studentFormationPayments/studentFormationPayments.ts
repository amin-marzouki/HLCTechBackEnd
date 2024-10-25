import {student$Response} from "../student/student$Response";
import {Formation} from "../formation/formation.model";
import {PaymentResponse} from "../studentPayment/paymentResponse";
import {formationActive$Response} from "../formation/formationActive$Response";

export interface studentFormationPayments$params{

formation?:formationActive$Response;
payments?:PaymentResponse[];

}
