import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {RequestBuilder} from "../../http/RequestBuilder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../http/StrictHttpResponse";
import {formationActive$Response} from "../../../models/formation/formationActive$Response";

export  function retrieveTotalFormations(http: HttpClient, rootUrl: string,  context?: HttpContext){
  const rb = new RequestBuilder(rootUrl, retrieveTotalFormations.PATH, 'get');


  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<formationActive$Response[]>;
    })
  );
}




retrieveTotalFormations.PATH = '/formation/totalFormations';
