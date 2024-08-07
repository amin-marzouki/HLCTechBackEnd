import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {CourseRequestParams} from "../../../models/formation/courseRequest$Params";
import {RequestBuilder} from "../../RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../StrictHttpResponse";
import {courseDetail$Response} from "../../../models/formation/courseDetail$response";
import {formationActive$Response} from "../../../models/formation/formationActive$Response";

export  function retrieveActiveFormation(http: HttpClient, rootUrl: string,  context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, retrieveActiveFormation.PATH, 'get');


  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<formationActive$Response[]>;
    })
  );
}




retrieveActiveFormation.PATH = '/formation/activeFormations';
