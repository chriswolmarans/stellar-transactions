import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction';
import {Observable} from 'rxjs';

import {ModalService} from '../../services/modal.service';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  display$: Observable<'open' | 'close'>;
  modalData$: Transaction;
  showConfirmation$: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.modalService.watchModalData().subscribe(data => this.modalData$ = data);
    this.showConfirmation$ = this.modalService.watchConfirmation();
  }

  close() {
    this.modalService.close();
  }

  confirm() {
    this.accountService.confirm();
    this.modalService.close();
  }
}
