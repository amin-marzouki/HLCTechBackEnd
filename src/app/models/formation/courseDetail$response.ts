import {Formation} from "./formation.model";
import {courseSkills$Response} from "./courseSkills$Response";

export class courseDetail$Response{
  nomChapter?:string;
  numChapter?:number;/*use this cas to sort the chapter */
  chabterDetail?:string;
  numbereOfHours?:number;
  formation?:Formation;
  courseSkills?:courseSkills$Response[];
}
