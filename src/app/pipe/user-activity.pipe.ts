import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userActivity'
})
export class UserActivityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    value.forEach(element => {
      console.log(element)
      console.log(element.user_activity_status)
      if (element.user_activity_status == 1) {
        element.user_activity_status = "Active";
      }
      console.log(element.user_activity_status)
    });
    return value;
  }

}
