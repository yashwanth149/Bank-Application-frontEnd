import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BankService } from '../services/bank.service';
import { Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-cdk-virtual-scroll',
  templateUrl: './cdk-virtual-scroll.component.html',
  styleUrls: ['./cdk-virtual-scroll.component.scss']
})
export class CdkVirtualScrollComponent implements OnInit, AfterViewInit {

  start: number = 0;
  count: number = 10;
  dataList: any = [];
  totalData: any = [];
  scrollable: Subscription;
  isLoading: boolean = false;
  isRedered: boolean = false;
  showDropdown: boolean = false; // Initialize showDropdown
  items: any[] = []; // Initialize showDropdown
  selectedItem: any;
  testLst: any[] = [];

  constructor(
    private bankServ: BankService,
    private fb: FormBuilder

  ) { }

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  ngOnInit(): void {
    this.firstHitApi();
    this.dropDowns();
    this.testLst = Array.from({ length: 100 }, (_, index) => index + 1);
  }

  ngAfterViewInit(): void {
    if (this.viewport) {
      this.scrollable = this.viewport.scrolledIndexChange.subscribe(index => {
        if (index >= this.dataList.length - 2 && this.isLoading) {
          this.nextApiHit();
        } else if (this.isRedered && index <= 1 && this.isLoading && this.start > 0) {
          this.prevDataLoad();
        }
      });
    }
  }
  firstHitApi() {
    this.isRedered = true;
    this.isLoading = true;
    this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
      this.totalData = data;
      this.dataList = data;
      this.start += this.count;
    });
  }
  nextApiHit() {
    this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
      this.totalData = [...this.totalData, ...data];
      this.dataList = [...this.dataList.slice(-this.count), ...data];
      this.start += this.count;
    });
  }
  prevDataLoad() {
    console.log('to ge t current stat', this.start, 'checking the thisstart')
    const prevvStart = this.start - 2 * this.count
    if (prevvStart < 0) {
      return;
    }
    this.totalData.splice(-this.count)
    const prevData = this.totalData.slice(prevvStart, prevvStart + this.count)
    if (prevData.length > 0) {
      this.dataList = [...prevData, ...this.dataList.slice(0, this.count)];
      this.start -= this.count;
    }
  }
  /**************************************************************************************************************************************************** */
  //common dropdown implementation

  Common = this.fb.group({
    Params: this.fb.group({
      personId: ['Test'],
    }),
    className: ['DataPeron'],
  })
  cdkLst: any[] = []
  dropDowns() {
    this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
      this.cdkLst = data;
    });
    this.bankServ.commonDropdown(this.Common.value).subscribe(data => {
    });
  }


}
