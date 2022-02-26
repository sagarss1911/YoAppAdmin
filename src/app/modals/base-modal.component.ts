import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

export class BaseModalComponent {
  public onHide: Subject<any> = new Subject<any>();

  constructor(private bsModalRef: BsModalRef) {}

  close(data: any = null): void {
    this.onHide.next(data);
    this.bsModalRef.hide();
  }
}