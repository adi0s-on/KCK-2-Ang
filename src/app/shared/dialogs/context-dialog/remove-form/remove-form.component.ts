import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Monster} from '../../../models/monster.model';
import {MonsterService} from '../../../services/monster/monster.service';
import {LoaderService} from '../../../services/loader/loader.service';

@Component({
  selector: 'app-remove-form',
  templateUrl: './remove-form.component.html',
  styleUrls: ['./remove-form.component.scss']
})
export class RemoveFormComponent implements OnInit {

  @Input() monster: Monster;

  @Output() closeModal = new EventEmitter<boolean>();

  removeMonsterForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private monsterService: MonsterService,
              private loaderService: LoaderService) {
  }

  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: any): void {
    this.submit();
  }

  ngOnInit(): void {
    this.removeMonsterForm = this.formBuilder.group({});
  }

  submit(): void {
    this.loaderService.setLoader(true);
    this.monsterService.deleteMonster(this.monster.Id).then(() => {
      this.loaderService.setLoader(false);
      this.closeModal.emit(true);
    });
  }
}
