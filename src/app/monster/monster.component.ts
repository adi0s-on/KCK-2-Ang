import {Component, HostListener, OnInit} from '@angular/core';
import {Monster} from '../shared/models/monster.model';
import {HttpClient} from '@angular/common/http';
import {MonsterService} from '../shared/services/monster/monster.service';
import {ModalType} from '../shared/utils/modal-type.enum';
import {WindowBreakpoints} from '../shared/utils/window-breakpoints.enum';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
})
export class MonsterComponent implements OnInit{

  monsters: Monster[] = [];

  modalToDisplay = false;

  currentMonster: Monster;

  loading = true;

  ModalType = ModalType;

  operationType: ModalType;

  isMobile = false;


  constructor(private http: HttpClient,
              private monsterService: MonsterService) {
    this.monsterService.monsters$.subscribe((res) => {
      this.monsters = res;
    });

    this.monsterService.loading$.subscribe((res) => {
      this.loading = res;
    });
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < +WindowBreakpoints.MOBILE;
    this.getMonsters();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = event.target.innerWidth < +WindowBreakpoints.MOBILE;
  }

  getMonsters(): void {
    this.monsterService.getMonsters();
  }

  toggleModal(operationType: ModalType, monster?: Monster): void {
    this.operationType = operationType;
    console.log(monster)
    this.currentMonster = monster;
    this.modalToDisplay = true;
  }

  buildTooltip(monster: Monster): string {
    return `Exp: ${monster.Exp}<br/>HP: ${monster.HP}<br/>Movement Speed: ${monster.MovementSpeed}<br/>Seeing Invisible: ${monster.SeeingInvisible}`;
  }
}
