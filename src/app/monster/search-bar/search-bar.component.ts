import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MonsterService} from '../../shared/services/monster/monster.service';
import {Monster} from '../../shared/models/monster.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output()
  filteredMonsters = new EventEmitter<Monster[]>();

  monsters: Monster[] = [];

  phrase = '';
  ignoreCase = false;
  searchWithoutPhrase = false;

  constructor(private monsterService: MonsterService) {
    this.monsterService.monsters$.subscribe((res: Monster[]) => {
      this.monsters = res;
    });
  }

  ngOnInit(): void {
    this.monsters = this.monsterService.currentMonsters;
  }

  search(): void {
    this.filteredMonsters.emit(Object.assign([], this.monsters).filter(monster => {
      if (this.ignoreCase && !this.searchWithoutPhrase) {
        return monster.Name.toLowerCase().indexOf(this.phrase.toLowerCase()) >= 0;
      }
      if (this.searchWithoutPhrase && this.ignoreCase) {
        return monster.Name.toLowerCase().indexOf(this.phrase.toLowerCase()) < 0;
      }
      if (this.searchWithoutPhrase && !this.ignoreCase) {
        return monster.Name.indexOf(this.phrase) < 0;
      }
      if (!this.searchWithoutPhrase && !this.ignoreCase) {
        return monster.Name.indexOf(this.phrase) >= 0;
      }
    }));
  }
}
