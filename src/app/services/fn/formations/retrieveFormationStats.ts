import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {RequestBuilder} from "../../http/RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../http/StrictHttpResponse";

import {formationStats$Response} from "../../../models/formation/formationStats$Response";



export  function retrieveFormationStats(http: HttpClient, rootUrl: string,  context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, retrieveFormationStats.PATH, 'get');


  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<formationStats$Response>;
    })
  );
}




retrieveFormationStats.PATH = '/formation/totalFormationsStats';
