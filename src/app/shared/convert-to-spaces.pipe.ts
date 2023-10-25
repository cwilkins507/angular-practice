import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name:"convertToSpaces"
})

//custom pipe, transform is the only method of pipetransform interface
export class ConvertToSpacesPipe implements PipeTransform{
  // takes a character and converts it to another (- to space in this example)
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }

}
