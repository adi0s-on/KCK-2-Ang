import {Component, Input, OnInit} from '@angular/core';
import {SortDirEnum} from '../../shared/utils/sort-dir.enum';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  sortDir: SortDirEnum;

  SortDirEnum = SortDirEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
