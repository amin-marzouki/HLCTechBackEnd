import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {CourseRequestParams} from "../../../models/formation/courseRequest$Params";
import {RequestBuilder} from "../../http/RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../http/StrictHttpResponse";
import {activeFormationDetail$Response} from "../../../models/formation/activeFormationDetail$Response";

export function retrieveFormationDetailById(http: HttpClient, rootUrl: string, params?: CourseRequestParams, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, retrieveFormationDetailById.PATH, 'get');
  if (params) {
    rb.path('formation_id', params.formation_id, {});

  }
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<activeFormationDetail$Response>;
    })
  );

}







retrieveFormationDetailById.PATH = '/formation/activeFormationDetail/{formation_id}';
