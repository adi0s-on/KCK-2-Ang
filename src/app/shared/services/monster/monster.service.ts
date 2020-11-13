import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Monster} from '../../models/monster.model';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters = new Subject<Monster[]>();
  monsters$ = this.monsters.asObservable();

  loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  private _monsters: Monster[] = [];

  PATH = '/api/home/';

  constructor(private http: HttpClient) { }

  getMonsters(): void {
    this.http.get<Monster[]>(this.PATH + 'read').subscribe((res: Monster[]) => {
      this._monsters = res;
      this.monsters.next(res);
      this.loading.next(false);
    });
  }

  deleteMonster(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.PATH + `delete?id=${id}`).subscribe((res: any) => {
        this._monsters = this._monsters.filter(monster => monster.Id !== id);
        this.monsters.next(this._monsters);
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  editMonster(monster: Monster): Promise<Monster> {
    return new Promise((resolve, reject) => {
      this.http.put(this.PATH + 'update', monster).subscribe((res: Monster) => {
        this._monsters[this._monsters.findIndex(m => m.Id === monster.Id)] = monster;
        this.monsters.next(this._monsters);
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  addMonster(monster: Monster): Promise<Monster> {
    return new Promise((resolve, reject) => {
      this.http.post(this.PATH + 'create', monster).subscribe((res: Monster) => {
        this._monsters.push(res);
        this.monsters.next(this._monsters);
        if (res) {
          resolve(res);
        }
      }, (err) => {
        reject(err);
      });
    });
  }
}
