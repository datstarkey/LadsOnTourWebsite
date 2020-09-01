import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  @Input() title: string;
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
