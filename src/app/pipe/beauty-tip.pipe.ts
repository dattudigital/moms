import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautyTip'
})
export class BeautyTipPipe implements PipeTransform {

  transform(value: any): any {


    value.forEach(element => {
      if (element.tip_type == 1) {
        element.tip_type = "Beauty Tip";
      } else if (element.tip_type == 2) {
        element.tip_type = "Hot Deal";
      }
    });
    return value;
  }

}
