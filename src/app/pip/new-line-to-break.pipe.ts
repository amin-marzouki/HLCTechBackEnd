import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'newLineToBreak'
})
export class NewLineToBreakPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: String, ): SafeHtml  {
    if (!value) return value;
    const formattedValue = value.replace(/\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedValue);
  }

}
