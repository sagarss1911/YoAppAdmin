import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastMessageService } from '../services/toast-message.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-common-helper',
  template: '``'
})

export class CommonHelper {

    constructor(public router:Router,public _toastMessageService: ToastMessageService,
       private sanitizer: DomSanitizer) {
    }

    showError(err) {
        let errorMsg = "internal server error or check your internet connection";
        try {
            if(err.error && err.error.error) {
              errorMsg = err.error.error;
            } else if(err.error && err.error.message) {
              errorMsg = err.error.message;
            }

            this._toastMessageService.alert("error",errorMsg);
        } catch(e) {
          this._toastMessageService.alert("error",errorMsg);
        }
    }




    dataURLToBlob(dataURL) {
        return new Promise((resolve,reject) => {

        })
    }


    downloadSampleFile(data, filename='data',headers) {
      let csvData = this.ConvertToCSVWithourSRNO(data, headers);
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
  }

  ConvertToCSVWithourSRNO(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i+1)+'';
        for (let index in headerList) {
           let head = headerList[index];

            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
  }


  downloadFile(data, filename='data',headers) {
      let csvData = this.ConvertToCSV(data, headers);
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
  }
  titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  ConvertToCSV(objArray, headerList) {
       let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
       let str = '';
       let row = 'S.No,';

       for (let index in headerList) {
           row += this.titleCase(headerList[index]) + ',';
       }
       row = row.slice(0, -1);
       str += row + '\r\n';
       for (let i = 0; i < array.length; i++) {
           let line = (i+1)+'';
           for (let index in headerList) {
              let head = headerList[index];
              line += ',' + (array[i][head] ? array[i][head] : "");
           }
           str += line + '\r\n';
       }
       return str;
   }

   getUniqueTimeStamp(padding) {
        padding = padding && !isNaN(padding) ? padding : 2;
        var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
        do {
            var ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                idstr += String.fromCharCode(ascicode);
            }
        } while (idstr.length < padding);
        return (idstr);
    }

    capitalCase(str) {
      if(!str) {
        return str;
      } else {
        return str[0].toUpperCase() + str.substr(1);
      }
    }
}
