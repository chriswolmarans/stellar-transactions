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
  filteredTransactions: Transaction[];
  sortType: string;
  sortReverse = false;
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

  sortTransactions(property) {
    this.sortType = property;
    this.sortReverse = !this.sortReverse;
    this.transactions = this.transactions || [];
    this.filteredTransactions.sort(this.dynamicSort(property));
  }

  dynamicSort(property) {
    let sortOrder = -1;

    if (this.sortReverse) {
      sortOrder = 1;
    }

    return (a, b) => {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;

      return result * sortOrder;
    };
  }

  filterTransactions(searchTerms: string) {
    if (!searchTerms) {
      this.filteredTransactions = this.transactions;
      this.sortTransactions('date');
    }
    searchTerms = searchTerms.trim().toLocaleLowerCase();
    this.filteredTransactions = this.transactions
      .filter((item) => {
        // get short month e.g Nov with date[1]
        const date = new Date(item.date).toString().split(' ');
        return item.beneficiary.toLocaleLowerCase().indexOf(searchTerms) > -1
          || item.amount.toString().toLocaleLowerCase().indexOf(searchTerms) > -1
          || new Date(item.date).getDate().toString().toLocaleLowerCase().indexOf(searchTerms) > -1
          || date[1].toString().toLocaleLowerCase().indexOf(searchTerms) > -1
          ;
      });
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe((transactions) => {
        this.transactions = transactions;
        this.filteredTransactions = this.transactions;
        this.sortTransactions('date');
      });
  }

}
