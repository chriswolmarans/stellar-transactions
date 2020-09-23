import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {TransactionService} from '../../services/transaction.service';
import {ModalService} from '../../services/modal.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-transfer-transaction',
  templateUrl: './transfer-transaction.component.html',
  styleUrls: ['./transfer-transaction.component.scss']
})
export class TransferTransactionComponent implements OnInit {
  accountBalance;
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
      this.accountService.holdFormData(this.form.getRawValue());
      this.open(this.form.getRawValue());
      this.accountBalance = this.accountService.getAccountTotal();
      this.form.reset();
      this.createFormControls();
      this.createForm();
    }
  }

  open(data) {
    this.modalService.open(true, data);
  }

  constructor(private transactionService: TransactionService,
              private modalService: ModalService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountBalance = this.accountService.getAccountTotal();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.account = new FormControl({
      value: `Free Checking(4692) - ${this.accountBalance}`,
      disabled: true,
    });
    this.amount = new FormControl('', Validators.required);
    this.beneficiary = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.date = new FormControl(Date.now(), Validators.required);
    this.id = new FormControl(`${Date.now()}`, Validators.required);
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

}
