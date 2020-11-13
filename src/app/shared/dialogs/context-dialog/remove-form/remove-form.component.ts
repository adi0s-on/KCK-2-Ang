import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Monster} from '../../../models/monster.model';
import {MonsterService} from '../../../services/monster/monster.service';

@Component({
  selector: 'app-remove-form',
  templateUrl: './remove-form.component.html',
  styleUrls: ['./remove-form.component.css']
})
export class RemoveFormComponent implements OnInit {

  @Input() monster: Monster;

  @Output() closeModal = new EventEmitter<boolean>();

  addMonsterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.addMonsterForm = this.formBuilder.group({});
  }

  submit(): void {
    this.monsterService.deleteMonster(this.monster.Id);
    this.closeModal.emit(true);
  }
}
