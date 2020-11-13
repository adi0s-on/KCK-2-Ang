import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Monster} from '../../../models/monster.model';
import {MonsterService} from '../../../services/monster/monster.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @Input() monster: Monster;

  @Output() closeModal = new EventEmitter<boolean>();

  seeingInvisibleOptions = [
    {type: 'true'},
    {type: 'false'}
  ];

  addMonsterForm: FormGroup;

  Name: FormControl;
  Exp: FormControl;
  HP: FormControl;
  MovementSpeed: FormControl;
  ImageLink: FormControl;
  SeeingInvisible: FormControl;

  constructor(private formBuilder: FormBuilder,
              private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(): void {
    this.Name = new FormControl('', [Validators.required]);
    this.Exp = new FormControl('', [Validators.required]);
    this.HP = new FormControl('', [Validators.required]);
    this.MovementSpeed = new FormControl('', [Validators.required]);
    this.ImageLink = new FormControl( '', [Validators.required]);
    this.SeeingInvisible = new FormControl( '', [Validators.required]);
  }

  createForm(): void {
    this.addMonsterForm = this.formBuilder.group({
      Name: this.Name,
      Exp: this.Exp,
      HP: this.HP,
      MovementSpeed: this.MovementSpeed,
      ImageLink: this.ImageLink,
      SeeingInvisible: this.SeeingInvisible
    });
  }

  submit(formValue: any): void {
    this.addMonsterForm.markAllAsTouched();
    this.addMonsterForm.markAsDirty();
    console.log(this.addMonsterForm)
    formValue.SeeingInvisible = formValue.SeeingInvisible.type;
    if (this.addMonsterForm.valid) {
      this.monsterService.addMonster(formValue).then((res) => {
        this.addMonsterForm.reset();
        this.closeModal.emit(true);
      });
    }
  }
}
