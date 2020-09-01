import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalsComponent implements OnInit {
  constructor() { }

  @Input() number: number;
  @Input() maxNumber: number;
  @Input() title: string;
  value = 0;

  ngOnChanges() {
    this.value = (this.number / this.maxNumber) * 100
  }

  ngOnInit() {
  }
}
