import { Component, OnInit } from '@angular/core';
import { Monster } from '../models/monster.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent {
  monsters = [];
  url = 'http://paksoft.gear.host/home/read';
  constructor(private http: HttpClient)
  { 
    this.http.get(this.url).toPromise().then(data => {
      console.log(data);

      for(let key in data)
        if(data.hasOwnProperty(key))
          this.monsters.push(data[key]);
    });
  }
}
