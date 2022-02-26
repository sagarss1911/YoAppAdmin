import { Pipe, NgModule } from "@angular/core";

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNum: any, filter: any) {
    if(!rawNum) {
      return rawNum;
    }

    let backspace = rawNum.indexOf("(") != -1 && rawNum.indexOf(")") == -1;
    let newVal = rawNum.replace(/\D/g, '');
    if(filter == "+91"){
      return newVal;
    }

    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    return newVal;
  }
}

@NgModule({
    imports: [],
    declarations: [PhonePipe],
    exports: [PhonePipe]
})
export class PhonePipeModule { }
