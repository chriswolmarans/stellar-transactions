import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction';
import {TransactionService} from './transaction.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  formData: Transaction;
  private accountTotal = 5824.76;
  // private accountTotal = new Subject<number>(); //5824.76
  //
  // watch(): Observable<number> {
  //   return this.accountTotal.asObservable();
  // }

  constructor(private transactionService: TransactionService) {
  }

  getAccountTotal() {
    return this.accountTotal;
  }
  setAccountTotal(val) {
    this.accountTotal = val;
  }
  confirm() {
    if (this.accountTotal - this.formData.amount > -500) {
      this.setAccountTotal(this.accountTotal - this.formData.amount);
      console.log(this.accountTotal); // TODO: fix account total not updating in form input
      this.add(this.formData);
    }
  }

  holdFormData(formData) {
    this.formData = formData;
  }

  add(transaction: Transaction): void {
    this.transactionService.addTransaction(transaction).subscribe();
    this.saveDataToLocalStorage(transaction);
  }

  saveDataToLocalStorage(data) {
    let a = [];
    // Parse the serialized data back into an array of objects
    a = JSON.parse(localStorage.getItem('transactions')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('transactions', JSON.stringify(a));
  }
}
