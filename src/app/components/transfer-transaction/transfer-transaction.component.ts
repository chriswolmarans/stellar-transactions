import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-transfer-transaction',
  templateUrl: './transfer-transaction.component.html',
  styleUrls: ['./transfer-transaction.component.scss']
})
export class TransferTransactionComponent implements OnInit {

  // temp placeholder - get from service
  accountTotal = 5824.76;

  form: FormGroup;
  account: FormControl;
  amount: FormControl;
  beneficiary: FormControl;
  date: FormControl;
  id: FormControl;
  type: FormControl;

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.add(this.form.value);
      this.saveDataToLocalStorage(this.form.value);
      this.form.reset();
      this.createFormControls();
      this.createForm();
    }
  }

  add(transaction: Transaction): void {
    this.transactionService.addTransaction(transaction).subscribe();
  }

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.account = new FormControl({
      value: `Free Checking(4692) ${this.accountTotal}`,
      disabled: true,
    });
    this.amount = new FormControl('', Validators.required);
    this.beneficiary = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.date = new FormControl(Date.now(), Validators.required);
    this.id = new FormControl(`${Date.now()}${this.accountTotal}`, Validators.required);
    this.type = new FormControl('Online Transfer', Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      account: this.account,
      amount: this.amount,
      beneficiary: this.beneficiary,
      date: this.date,
      id: this.id,
      type: this.type,
    });
  }

  saveDataToLocalStorage(data) {
    let a = [];
    // Parse the serialized data back into an array of objects
    a = JSON.parse(localStorage.getItem('transactions')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    console.log(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('transactions', JSON.stringify(a));
  }

}
