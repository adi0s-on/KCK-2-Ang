import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Monster} from '../../../models/monster.model';
import {MonsterService} from '../../../services/monster/monster.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Input() monster: Monster;

  @Output() closeModal = new EventEmitter<boolean>();

  seeingInvisibleOptions = [
    {type: 'true'},
    {type: 'false'}
  ];

  editMonsterForm: FormGroup;

  Id: FormControl;
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
    this.Id = new FormControl(this.monster.Id, [Validators.required]);
    this.Name = new FormControl(this.monster.Name, [Validators.required]);
    this.Exp = new FormControl(this.monster.Exp, [Validators.required]);
    this.HP = new FormControl(this.monster.HP, [Validators.required]);
    this.MovementSpeed = new FormControl(this.monster.MovementSpeed, [Validators.required]);
    this.ImageLink = new FormControl( this.monster.ImageLink, [Validators.required]);
    this.SeeingInvisible = new FormControl( this.monster.SeeingInvisible ? { type: 'true' } : { type: 'false' }, [Validators.required]);
  }

  createForm(): void {
    this.editMonsterForm = this.formBuilder.group({
      Id: this.Id,
      Name: this.Name,
      Exp: this.Exp,
      HP: this.HP,
      MovementSpeed: this.MovementSpeed,
      ImageLink: this.ImageLink,
      SeeingInvisible: this.SeeingInvisible
    });
  }

  submit(formValue: any): void {
    this.editMonsterForm.markAllAsTouched();
    console.log(this.editMonsterForm)
    formValue.SeeingInvisible = formValue.SeeingInvisible.type;
    if (this.editMonsterForm.valid) {
      this.monsterService.editMonster(formValue).then((res) => {
        this.editMonsterForm.reset();
        this.closeModal.emit(true);
      });
    }
  }
}
