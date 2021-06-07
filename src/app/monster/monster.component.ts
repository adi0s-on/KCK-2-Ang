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
  tmpMonsers: Monster[] = [];

  modalToDisplay = false;

  currentMonster: Monster;

  loading = true;

  ModalType = ModalType;

  operationType: ModalType;

  isMobile = false;

  nameSortDir = '';
  expSortDir = '';
  hpSortDir = '';
  msSortDir = '';

  constructor(private http: HttpClient,
              private monsterService: MonsterService) {
    this.monsterService.monsters$.subscribe((res) => {
      this.monsters = res;
      this.tmpMonsers = Object.assign([], res);
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
    this.currentMonster = monster;
    this.modalToDisplay = true;
  }

  buildTooltip(monster: Monster): string {
    return `Exp: ${monster.Exp}<br/>HP: ${monster.HP}<br/>Movement Speed: ${monster.MovementSpeed}<br/>Seeing Invisible: ${monster.SeeingInvisible}`;
  }

  sortByName(): void {
    if (this.nameSortDir === '') {
      this.nameSortDir = 'asc';
      this.monsters.sort((a, b) => {
        if (a.Name > b.Name) {
          return 1;
        } else if (a.Name < b.Name) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (this.nameSortDir === 'asc') {
      this.nameSortDir = 'desc';
      this.monsters.sort((a, b) => {
        if (a.Name > b.Name) {
          return -1;
        } else if (a.Name < b.Name) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.nameSortDir = '';
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }

  sortByExp(): void {
    if (this.expSortDir === '') {
      this.expSortDir = 'asc';
      this.monsters.sort((a, b) => {
        return +a.Exp - +b.Exp;
      });
    } else if (this.expSortDir === 'asc') {
      this.expSortDir = 'desc';
      this.monsters.sort((a, b) => {
        return +b.Exp - +a.Exp;
      });
    } else {
      this.expSortDir = '';
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }

  sortByHp(): void {
    if (this.hpSortDir === '') {
      this.hpSortDir = 'asc';
      this.monsters.sort((a, b) => {
        return +a.HP - +b.HP;
      });
    } else if (this.hpSortDir === 'asc') {
      this.hpSortDir = 'desc';
      this.monsters.sort((a, b) => {
        return +b.HP - +a.HP;
      });
    } else {
      this.hpSortDir = '';
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }

  sortByMs(): void {
    if (this.msSortDir === '') {
      this.msSortDir = 'asc';
      this.monsters.sort((a, b) => {
        return +a.MovementSpeed - +b.MovementSpeed;
      });
    } else if (this.msSortDir === 'asc') {
      this.msSortDir = 'desc';
      this.monsters.sort((a, b) => {
        return +b.MovementSpeed - +a.MovementSpeed;
      });
    } else {
      this.msSortDir = '';
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }
}
