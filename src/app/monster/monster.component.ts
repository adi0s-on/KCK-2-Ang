import {Component, HostListener, OnInit} from '@angular/core';
import {Monster} from '../shared/models/monster.model';
import {HttpClient} from '@angular/common/http';
import {MonsterService} from '../shared/services/monster/monster.service';
import {ModalType} from '../shared/utils/modal-type.enum';
import {WindowBreakpoints} from '../shared/utils/window-breakpoints.enum';
import {SortDirEnum} from '../shared/utils/sort-dir.enum';

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

  nameSortDir: SortDirEnum = SortDirEnum.DEF;
  expSortDir: SortDirEnum = SortDirEnum.DEF;
  hpSortDir: SortDirEnum = SortDirEnum.DEF;
  msSortDir: SortDirEnum = SortDirEnum.DEF;

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
    if (this.nameSortDir === SortDirEnum.DEF) {
      this.nameSortDir = SortDirEnum.ASC;
      this.monsters.sort((a, b) => {
        if (a.Name > b.Name) {
          return 1;
        } else if (a.Name < b.Name) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (this.nameSortDir === SortDirEnum.ASC) {
      this.nameSortDir = SortDirEnum.DESC;
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
      this.nameSortDir = SortDirEnum.DEF;
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }

  sortByExp(): void {
    if (this.expSortDir === SortDirEnum.DEF) {
      this.expSortDir = SortDirEnum.ASC;
      this.monsters.sort((a, b) => {
        return +a.Exp - +b.Exp;
      });
    } else if (this.expSortDir === SortDirEnum.ASC) {
      this.expSortDir = SortDirEnum.DESC;
      this.monsters.sort((a, b) => {
        return +b.Exp - +a.Exp;
      });
    } else {
      this.expSortDir = SortDirEnum.DEF;
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }

  sortByHp(): void {
    if (this.hpSortDir === SortDirEnum.DEF) {
      this.hpSortDir = SortDirEnum.ASC;
      this.monsters.sort((a, b) => {
        return +a.HP - +b.HP;
      });
    } else if (this.hpSortDir === SortDirEnum.ASC) {
      this.hpSortDir = SortDirEnum.DESC;
      this.monsters.sort((a, b) => {
        return +b.HP - +a.HP;
      });
    } else {
      this.hpSortDir = SortDirEnum.DEF;
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }

  sortByMs(): void {
    if (this.msSortDir === SortDirEnum.DEF) {
      this.msSortDir = SortDirEnum.ASC;
      this.monsters.sort((a, b) => {
        return +a.MovementSpeed - +b.MovementSpeed;
      });
    } else if (this.msSortDir === SortDirEnum.ASC) {
      this.msSortDir = SortDirEnum.DESC;
      this.monsters.sort((a, b) => {
        return +b.MovementSpeed - +a.MovementSpeed;
      });
    } else {
      this.msSortDir = SortDirEnum.DEF;
      this.monsters = Object.assign([], this.tmpMonsers);
    }
  }
}
