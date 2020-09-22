import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  // temp placeholder
  transaction: Transaction = {
    account: 'Free Checking(4692)',
    amount: 845.42,
    beneficiary: 'LA Kings',
    date: Date.now(),
    id: Date.now() + Math.random(),
    type: 'Online Transfer'
  };

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

}
