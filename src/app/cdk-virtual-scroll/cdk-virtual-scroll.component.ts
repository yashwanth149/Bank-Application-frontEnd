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
    // this.firstHitApi();
    this.dropDowns();
  }

  // ngAfterViewInit(): void {
  //   if (this.viewport) {
  //     this.scrollable = this.viewport.scrolledIndexChange.subscribe(index => {
  //       if (index >= this.dataList.length - 2 && this.isLoading) {
  //         this.nextApiHit();
  //       } else if (this.isRedered && index <= 1 && this.isLoading && this.start > 0) {
  //         this.prevDataLoad();
  //       }
  //     });
  //   }
  // }
  // firstHitApi() {
  //   this.isRedered = true;
  //   this.isLoading = true;
  //   this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
  //     this.totalData = data;
  //     this.dataList = data;
  //     this.start += this.count;
  //   });
  // }
  // nextApiHit() {
  //   this.bankServ.getAllPersons(this.start, this.count).subscribe(data => {
  //     this.totalData = [...this.totalData, ...data];
  //     this.dataList = [...this.dataList.slice(-this.count), ...data];
  //     this.start += this.count;
  //   });
  // }
  // prevDataLoad() {
  //   console.log('to ge t current stat', this.start, 'checking the thisstart')
  //   const prevvStart = this.start - 2 * this.count
  //   if (prevvStart < 0) {
  //     return;
  //   }
  //   this.totalData.splice(-this.count)
  //   const prevData = this.totalData.slice(prevvStart, prevvStart + this.count)
  //   if (prevData.length > 0) {
  //     this.dataList = [...prevData, ...this.dataList.slice(0, this.count)];
  //     this.start -= this.count;
  //   }
  // }
  /**************************************************************************************************************************************************** */
  //common dropdown implementation

  Common = this.fb.group({
    Params: this.fb.group({
      personName: [''],
      // personId: [''],
    }),
    start: [0],
    count: [10],
    className: ['DataPersonSearch'],
  })

  ngAfterViewInit(): void {
    if (this.viewport) {
      this.scrollable = this.viewport.scrolledIndexChange.subscribe(index => {
        if (index >= this.cdkLst.length - 8 && this.isLoading) {
          this.dropDowns();
        }
      });
    }
  }
  cdkLst: any[] = []
  totals: any[] = []
  dropDowns() {
    const start = this.Common.get('start')?.value || 0;
    const count = this.Common.get('count')?.value || 0;
    try {
      this.bankServ.commonDropdown(this.Common.value).subscribe(data => {
        if (data.length > 0) {
          this.cdkLst = [...this.cdkLst, ...data];
          this.totals = [...this.totals, ...data];
          this.Common.get('start')?.setValue(start + count);
          this.isLoading = true;
        } else {
          this.isLoading = false
        }
      });
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  }

  filteredList: any[] = []
  // onKey(event: any) {
  //   this.isLoading=false
  //   if (event) {
  //     this.cdkLst = [];
  //   const start = this.Common.get('start')?.value || 0;
  //   const count = this.Common.get('count')?.value || 0;
  //     // this.cdkL
  //     this.Common.get('Params')?.get('personName')?.setValue(event.toLowerCase());

  //     this.bankServ.onKeySearchDropDown(this.Common.value).subscribe(data => {      
  //       console.log(data);

  //       if (data.length > 0) {
  //         this.cdkLst=[...this.cdkLst, ...data];
  //         this.totals = [...this.totals, ...data];
  //         this.Common.get('start')?.setValue(start + count);
  //         this.isLoading = true;
  //       }else{
  //         this.isLoading = false
  //       }
  //     });
  //     this.dropDowns();
  //   }
  //   else{
  //     this.cdkLst = this.totals
  //   }
  // }

  debounceSearch = this.debounce((event: any) => {
    this.cdkLst = [];
    if (event.length>0) {
      const start = this.Common.get('start')?.value || 0;
      const count = this.Common.get('count')?.value || 0;
      this.Common.get('Params')?.get('personName')?.setValue(event.toLowerCase());
      this.bankServ.onKeySearchDropDown(this.Common.value).subscribe(data => {
        console.log('key upsearch event lst', data);
        if (data.length > 0) {
          this.cdkLst = [...this.cdkLst, ...data];
          this.totals = [...this.totals, ...data];
          this.Common.get('start')?.setValue(start + count);
          this.isLoading = true;
        } else {
          this.isLoading = false;
        }
      });
    }
    else {
      this.Common.get('start')?.setValue(0);
      this.dropDowns();

    }
  })
  onKey(event: any) {
    this.debounceSearch(event)
  }
  
  /**
   * Creates a debounced function that delays invoking the provided
   * function until after `delay` milliseconds have elapsed since the
   * last time it was invoked.
   *
   * @param cb The function to debounce.
   * @param delay The debounce time in milliseconds. Defaults to 1000.
   * @returns A debounced version of the provided function.
   */
  debounce(cb: (...args: any[]) => void, delay = 2000) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }


  // getHeight(): string {
  //   const itemCount = this.cdkLst.length;
  //   const itemHeight = 30;
  //   const maxHeight = 220;
  //   const minHeight = 100;

  //   const calculatedHeight = Math.min(maxHeight, Math.max(minHeight, itemCount * itemHeight));

  //   return `${calculatedHeight}px`;
  // }

}
