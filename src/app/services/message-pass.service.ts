import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessagePassService {
  private subject = new Subject<any>();
  private ctsSubject = new Subject<any>();

  constructor(private router: Router) {
  }

  getNotificationCountData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendNotificationCountData(data: any) {
    this.subject.next(<any>data);
  }

  getResyncCTScoreData(): Observable<any> {
    return this.ctsSubject.asObservable();
  }

  sendResyncCTScoreData(data: any) {
    this.ctsSubject.next(<any>data);
  }
}
