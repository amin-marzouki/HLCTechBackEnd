import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {CourseRequestParams} from "../../../models/formation/courseRequest$Params";
import {RequestBuilder} from "../../http/RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../http/StrictHttpResponse";

import {courseSkills$Response} from "../../../models/formation/courseSkills$Response";

export  function retrieveCourseSkills(http: HttpClient, rootUrl: string, params?: CourseRequestParams, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, retrieveCourseSkills.PATH, 'get');
  if (params) {
    rb.path('formation_id', params.formation_id, {});

  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<courseSkills$Response[]>;
    })
  );
}




retrieveCourseSkills.PATH = '/formation/courseSkills/{formation_id}';
