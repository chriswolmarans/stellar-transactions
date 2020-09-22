import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const transactions = [
      {
        account: 'Free Checking(4692)',
        amount: 245.42,
        beneficiary: 'Media Kings',
        date: new Date(2020, 9, 21, 15, 31),
        id: Date.now() + Math.random(),
        type: 'Online Transfer'
      },
      {
        account: 'Free Checking(4692)',
        amount: 445.98,
        beneficiary: 'Amazon Online Store',
        date: new Date(2020, 9, 20, 10, 1),
        id: Date.now() + Math.random(),
        type: 'Online Transfer'
      },
      {
        account: 'Free Checking(4692)',
        amount: 46.25,
        beneficiary: '7-Eleven',
        date: new Date(2020, 10, 18, 19, 21),
        id: Date.now() + Math.random(),
        type: 'Card Payment'
      },
      {
        account: 'Free Checking(4692)',
        amount: 142.95,
        beneficiary: 'H&M Online Store',
        date: new Date(2020, 10, 17, 1, 21),
        id: Date.now() + Math.random(),
        type: 'Online Transfer'
      },
      {
        account: 'Free Checking(4692)',
        amount: 75.93,
        beneficiary: 'Whole Foods',
        date: new Date(2020, 10, 15, 20, 20),
        id: Date.now() + Math.random(),
        type: 'Card Payment'
      },
    ];
    return {transactions};
  }
}
