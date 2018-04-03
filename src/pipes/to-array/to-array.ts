import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ToArrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
   return Object.keys(value).map(key => value[key]);
 }

}
