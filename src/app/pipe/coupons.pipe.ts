import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coupons'
})
export class CouponsPipe implements PipeTransform {

  transform(value: any): any {
    console.log(value)

    value.forEach(element => {
      if (element.coupons_status == 1) {
        element.coupons_status = "Active";
      } else if (element.coupons_status == 2) {
        element.coupons_status = "In Active";
      }
    });
    return value;
  }

}
