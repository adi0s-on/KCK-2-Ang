import {Component, OnInit} from '@angular/core';
import {Monster} from '../models/monster.model';
import {HttpClient} from '@angular/common/http';
import {MonsterService} from '../shared/services/monster/monster.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css'],
})
export class MonsterComponent implements OnInit{

  monsters: Monster[] = [];

  editMonster = false;

  currentMonster: Monster;

  constructor(private http: HttpClient,
              private monsterService: MonsterService) {
  }

  ngOnInit(): void {
    this.getMonsters();
  }

  getMonsters(): void {
    this.monsterService.getMonsters().subscribe((res: Monster[]) => {
      this.monsters = res;
    });
  }

  deleteMonster(id): void {
    this.monsterService.deleteMonster(id).subscribe(() => {
      this.monsters = this.monsters
        .filter(monster => monster.Id !== id);
    });
  }

  toggleEdition(monster: Monster): void {
    this.currentMonster = monster;
    this.editMonster = true;
  }
}
