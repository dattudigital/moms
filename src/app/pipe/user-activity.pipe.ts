import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userActivity'
})
export class UserActivityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    value.forEach(element => {
      if (element.user_activity_status == 1) {
        element.user_activity_status = "Active";
      }
      if (element.user_activity_status == 0) {
        element.user_activity_status = "InActive";
      }
    });
    return value;
  }

}
