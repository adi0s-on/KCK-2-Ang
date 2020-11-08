import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monster} from '../../../models/monster.model';
import {ModalPosition} from '../../utils/modal-position.enum';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  @Input() displayModal = false;

  @Input() monster: Monster;

  @Output() modalClosed = new EventEmitter<boolean>();

  ModalPosition = ModalPosition;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(event: any): void {
    console.log(event)
    this.modalClosed.emit(false);
  }
}
