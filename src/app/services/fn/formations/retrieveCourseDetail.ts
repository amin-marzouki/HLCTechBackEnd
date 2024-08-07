import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {CourseRequestParams} from "../../../models/formation/courseRequest$Params";
import {RequestBuilder} from "../../RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../StrictHttpResponse";
import {courseDetail$Response} from "../../../models/formation/courseDetail$response";


export  function retrieveCourseDetail(http: HttpClient, rootUrl: string, params?: CourseRequestParams, context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, retrieveCourseDetail.PATH, 'get');
  if (params) {
    rb.path('formation_id', params.formation_id, {});

  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<courseDetail$Response[]>;
    })
  );
}




retrieveCourseDetail.PATH = '/formation/courseDetail/{formation_id}';
