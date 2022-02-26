import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastMessage } from '../class/toast.class';

@Injectable()
export class ToastMessageService {
  private subject = new Subject<ToastMessage>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
  }

  getAlert(): Observable<ToastMessage> {
    return this.subject.asObservable();
  }

  alert(type: string, message: string) {
    this.subject.next(<ToastMessage>{ type: type, message: message });
  }

  clear() {
    this.subject.next();
  }
}
