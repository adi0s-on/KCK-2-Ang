import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Monster} from '../../models/monster.model';
import {ModalPosition} from '../../utils/modal-position.enum';
import {ModalType} from '../../utils/modal-type.enum';
import {MonsterService} from '../../services/monster/monster.service';

@Component({
  selector: 'app-context-dialog',
  templateUrl: './context-dialog.component.html',
  styleUrls: ['./context-dialog.component.css']
})
export class ContextDialogComponent implements OnInit {

  @Input() displayModal = false;

  @Input() monster: Monster;

  @Input() modalType: ModalType;

  @Output() modalClosed = new EventEmitter<boolean>();

  ModalPosition = ModalPosition;
  ModalType = ModalType;
  titleMap = new Map([
    ['editing', 'Edit'],
    ['adding', 'Add'],
    ['removing', 'Remove']
  ]);

  classMap = new Map([
    ['editing', 'p-warning'],
    ['removing', 'p-danger'],
    ['adding', 'p-success']
  ]);

  constructor(private monsterService: MonsterService) { }

  ngOnInit(): void {
  }

  closeModal(event: any): void {
    this.modalClosed.emit(false);
  }

  isTypeOf(typeName: ModalType): boolean {
    return typeName === this.modalType;
  }

  deleteMonster(id): void {
    this.monsterService.deleteMonster(id);
  }

  editMonster(monster: Monster): void {
    this.monsterService.editMonster(monster)
  }
}
