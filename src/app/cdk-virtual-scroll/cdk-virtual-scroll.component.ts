import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BankService } from '../services/bank.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

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

  constructor(
    private bankServ: BankService
  ) { }

  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  ngOnInit(): void {
    this.firstHitApi();
  }
  
  ngAfterViewInit(): void {
    if (this.viewport) {
      this.scrollable = this.viewport.scrolledIndexChange.subscribe(index => {
        
        // console.log(this.viewport.getDataLength(),'data length');
        // console.log(this.viewport.getRenderedRange(),'data rendered range');
        if (index >= this.dataList.length - 2 && this.isLoading) {

          this.nextApiHit();
        } else if (index <= 1 && this.isLoading && this.start > 0) {
          this.prevDataLoad();
        }
      });
    }
  }
  

  firstHitApi() {
    
    this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
      
      console.log('hiting after load of view init api');
      console.log(this.dataList,'after load of view init');
      this.totalData = [...data];
      this.dataList = [...data];
      this.start += this.count;
      // console.log(this.dataList,'after load of view init');

      this.isLoading = true;
    });
  }
  
  nextApiHit() {
    this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
      if (data && data.length > 0) {
        this.totalData = [...this.totalData, ...data];
        this.dataList = [...this.dataList.slice(-this.count), ...data];
        this.start += this.count;
      }
    });
  }
  
  prevDataLoad() {
    console.log('to ge t prev stat',this.start,'checking the thisstart')
    const prevvStart = this.start - 2*this.count
    console.log('star of t he previous data',prevvStart);
    
    if (prevvStart < 0){
      return;
    } 
    const prevData = this.totalData.slice(prevvStart, prevvStart + this.count)
    console.log('prev sub srt of data ---',prevData)

    console.log(this.totalData,'total data -----------------------------------')
    if (prevData.length > 0) {
      this.dataList = [...prevData, ...this.dataList.slice(0, this.count)];
      this.start -= this.count;
    }
    console.log(this.dataList,'Modify data after removing the dtata which is not in view port -----------------------------------')

  }

}
