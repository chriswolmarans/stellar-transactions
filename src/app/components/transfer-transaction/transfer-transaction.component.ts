import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-transfer-transaction',
  templateUrl: './transfer-transaction.component.html',
  styleUrls: ['./transfer-transaction.component.scss']
})
export class TransferTransactionComponent implements OnInit {

  // temp placeholder - get from service
  accountTotal = 5824.76;

  form = new FormGroup({
    account: new FormControl({
      value: '',
      disabled: true,
    }),
    amount: new FormControl(Validators.required),
    beneficiary: new FormControl('', [Validators.required, Validators.minLength(2)]),
    date: new FormControl(Date.now(), Validators.required),
    id: new FormControl(Date.now() + Math.random(), Validators.required),
    type: new FormControl('Online Transfer', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.form.patchValue({
      account: 'Free Checking(4692)',
    });
    console.log(this.form.value);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
