import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private display: BehaviorSubject<'open' | 'close'> =
    new BehaviorSubject('close');

  private showConfirmation: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  private modalData = new Subject<Transaction>();

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  watchConfirmation(): Observable<boolean> {
    return this.showConfirmation.asObservable();
  }

  watchModalData(): Observable<Transaction> {
    return this.modalData.asObservable();
  }

  open(showConfirmation, data?) {
    if (data) {
      this.modalData.next(data);
    }
    this.showConfirmation.next(showConfirmation);
    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }
}
