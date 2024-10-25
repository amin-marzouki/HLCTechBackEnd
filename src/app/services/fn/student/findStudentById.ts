import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {RequestBuilder} from "../../http/RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../http/StrictHttpResponse";

import {student$Response} from "../../../models/student/student$Response";

export interface findStudentById$Params {
  student_id?: number;

}
export function findStudentById(http: HttpClient, rootUrl: string, params?: findStudentById$Params, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, findStudentById.PATH, 'get');
  if (params) {
    rb.path('student_id', params.student_id, {});

  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<student$Response>;
    })
  );
}
findStudentById.PATH = '/student/{student_id}';
