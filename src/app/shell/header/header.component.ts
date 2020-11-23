import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuOptions: any[] = [
    { title: 'home', url: '/home' },
    { title: 'monsters', url: '/monsters' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
