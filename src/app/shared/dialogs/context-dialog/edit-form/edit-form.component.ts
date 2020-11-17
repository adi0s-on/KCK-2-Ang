import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Monster} from '../../../models/monster.model';
import {MonsterService} from '../../../services/monster/monster.service';
import {LoaderService} from '../../../services/loader/loader.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  @Input() set monster(val: Monster) {
    this._monster = val;
    console.log(val)
    this.createFormControls();
    this.createForm();
  }

  @Output() closeModal = new EventEmitter<boolean>();

  _monster: Monster;

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
              private monsterService: MonsterService,
              private loaderService: LoaderService) {
  }

  @HostListener('document:keydown.enter', ['$event'])
  onClick(event: KeyboardEvent): void {
    this.submit(this.editMonsterForm.value);
  }

  ngOnInit(): void {
  }

  createFormControls(): void {
    this.Id = new FormControl(this._monster.Id, [Validators.required]);
    this.Name = new FormControl(this._monster.Name, [Validators.required]);
    this.Exp = new FormControl(this._monster.Exp, [Validators.required]);
    this.HP = new FormControl(this._monster.HP, [Validators.required]);
    this.MovementSpeed = new FormControl(this._monster.MovementSpeed, [Validators.required]);
    this.ImageLink = new FormControl( this._monster.ImageLink, [Validators.required]);
    this.SeeingInvisible = new FormControl( this._monster.SeeingInvisible ? { type: 'true' } : { type: 'false' }, [Validators.required]);
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
    formValue.SeeingInvisible = formValue.SeeingInvisible.type;
    if (this.editMonsterForm.valid) {
      this.loaderService.setLoader(true);
      this.monsterService.editMonster(formValue).then((res) => {
        this.editMonsterForm.reset();
        this.loaderService.setLoader(false);
        this.closeModal.emit(true);
      });
    }
  }
}
