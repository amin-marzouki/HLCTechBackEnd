import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "./models/student/student.model";

@Pipe({
  name: 'autocomplete'
})
export class AutocompletePipe implements PipeTransform {

  transform(users: string[], value: string): unknown {
    return users.filter(user => user.toLowerCase().includes(value.toLowerCase()));
  }

}
