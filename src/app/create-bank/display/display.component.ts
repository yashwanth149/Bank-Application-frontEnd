import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() branchObj: any;
  @Input() cityName: string;
  @Output() removeObject = new EventEmitter<any>();

  removeBranch(index: number) {

    this.branchObj.lst.splice(index, 1);
    this.removeObject.emit(index);

  }


  constructor() { }

  ngOnInit(): void {
  }



}
