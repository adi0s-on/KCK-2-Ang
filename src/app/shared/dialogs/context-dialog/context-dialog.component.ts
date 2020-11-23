import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monster} from '../../models/monster.model';
import {ModalPosition} from '../../utils/modal-position.enum';
import {ModalType} from '../../utils/modal-type.enum';
import {LoaderService} from '../../services/loader/loader.service';

@Component({
  selector: 'app-context-dialog',
  templateUrl: './context-dialog.component.html',
  styleUrls: ['./context-dialog.component.scss']
})
export class ContextDialogComponent implements OnInit {

  @Input() displayModal = false;

  @Input() monster: Monster;

  @Input() modalType: ModalType;

  @Output() modalClosed = new EventEmitter<boolean>();

  ModalPosition = ModalPosition;

  ModalType = ModalType;

  titleMap = new Map([
    [ModalType.EDITING, 'Edit'],
    [ModalType.ADDING, 'Add'],
    [ModalType.REMOVING, 'Remove']
  ]);

  classMap = new Map([
    [ModalType.EDITING, 'p-warning'],
    [ModalType.ADDING, 'p-success'],
    [ModalType.REMOVING, 'p-danger']
  ]);

  loading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.loading$.subscribe((status: boolean) => {
      this.loading = status;
    });
  }

  ngOnInit(): void {
  }

  closeModal(event: any): void {
    this.modalClosed.emit(false);
  }

  isTypeOf(typeName: ModalType): boolean {
    return typeName === this.modalType;
  }
}
