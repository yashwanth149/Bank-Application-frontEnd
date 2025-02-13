import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BankService } from '../services/bank.service';
import { Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { color } from 'html2canvas/dist/types/css/types/color';


export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

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
  testLst: any[] = [];
  paramsMap = new Map();
  P1: string;
  P2: string;
  params: number
  @Input() Common: any;
  @Output() onBlurEvent = new EventEmitter<any>();


  constructor(
    private bankServ: BankService,

  ) { }
  public control = new FormControl();
  public filteredOptions: string[];
  public height: string;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  ngOnInit(): void {
    // console.log(this.Commons.value);
    // this.firstHitApi();
    // this.options = Array.from({ length: 30 })
    //   .map((_, i) => Math.random().toString(36).substring(7))
    //   .sort();

    // // Listen for changes to the input
    // this.control.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map((value) => {
    //       // Filter the options
    //       this.filteredOptions = this.options.filter((option) =>
    //         option.toLowerCase().startsWith(value.toLowerCase())
    //       );
    //       console.log(this.filteredOptions);

    //       // Recompute how big the viewport should be.
    //       if (this.filteredOptions.length < 4) {
    //         this.height = this.filteredOptions.length * 50 + 'px';
    //       } else {
    //         this.height = '200px';
    //       }
    //     })
    //   )
    //   .subscribe();

    this.dropDowns();
    console.log(this.Common.value);

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


  get formObj(): FormGroup {
    return this.Common.get('Params') as FormGroup
  }
  ngAfterViewInit(): void {
    // console.log('test');

    if (this.viewport) {
      this.scrollable = this.viewport.scrolledIndexChange.subscribe(index => {
        // console.log(index,'-----------',this.isLoading);
        const renderedRange = this.viewport.getRenderedRange(); //  the currently rendered range

        if (renderedRange.end >= this.cdkLst.length - 4 && this.isLoading && !this.isInputSearch) {
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
        console.log('test',data);
        
        this.Common.get('start')?.patchValue(start + count);
        if (data.length > 0) {
          this.cdkLst = [...this.cdkLst, ...data];
          // this.matchedList = [...this.matchedList, ...data];
          this.isLoading = true;
        } else {
          this.isLoading = false
        }
      });
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  }




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

  isInputSearch: boolean = false
  debounceSearch = this.debounce((event: any) => {
    this.isInputSearch = true
    this.Common.get('start')?.setValue(0);
    const start = this.Common.get('start')?.value || 0;
    const count = this.Common.get('count')?.value || 0;
    this.isLoading = false
    this.cdkLst = [];
    if (event.length > 0) {
      this.bankServ.onKeySearchDropDown(this.Common.value).subscribe(data => {

        this.Common.get('start')?.patchValue(start + count);
        this.isLoading = true;
        if (data.length > 0) {
          this.cdkLst = [...data];
          this.totals = [...this.totals, ...data];
        }
      });
    }
    else {
      this.isInputSearch = false
      this.dropDowns();

    }
  })


  filteredLst: any[] = []
  matchedList: any[] = []

  /**
   * Creates a debounced function that delays invoking the provided
   * function until after `delay` milliseconds have elapsed since the
   * last time it was invoked.
   *
   * @param cb The function to debounce.
   * @param delay The debounce time in milliseconds. Defaults to 1000.
   * @returns A debounced version of the provided function.
   */
  debounce(cb: (...args: any[]) => void, delay = 1000) {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }





  onBlur(event: any) {
    let obj = {
      event: event,
      data: this.cdkLst
    }
    this.onBlurEvent.emit(obj);
    
  }
  test:any;

  // objKeysLength(obj: any) {
  //   return Object.keys(obj).length;
  // }







  /**
   * Original From..............................
   */
  // Common = this.fb.group({
  //   Params: this.fb.group({

  //   }),
  //   key: [''],
  //   start: [0],
  //   count: [10],
  //   className: ['DataPersonSearch'],
  // })

  // private fetchDropdownData(start: number, count: number): void {
  //   try {
  //     this.bankServ.commonDropdown(this.Common.value).subscribe(data => {
  //       this.Common.get('start')?.patchValue(start + count);
  //       if (data.length > 0) {
  //         this.cdkLst = [...this.cdkLst, ...data];
  //         this.matchedList = [...this.matchedList, ...data];
  //         this.isLoading = true;
  //       } else {
  //         this.isLoading = false
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching dropdown data:', error);
  //   }
  // }

  // private getStartAndCount(): { start: number; count: number } {
  //   const start = this.Common.get('start')?.value || 0;
  //   const count = this.Common.get('count')?.value || 0;
  //   return { start, count };
  // }

  // debounceSearch = this.debounce((event: any) => {
  //   const { start, count } = this.getStartAndCount();
  //   this.isLoading = false;
  //   this.cdkLst = [];
  //   if (event.length > 0) {
  //     this.bankServ.onKeySearchDropDown(this.Common.value).subscribe(data => {
  //       this.Common.get('start')?.patchValue(start + count);
  //       this.isLoading = true;
  //       if (data.length > 0) {
  //         this.cdkLst = [...this.cdkLst, ...data];
  //       }
  //     });
  //   } else {
  //     this.fetchDropdownData(start, count);
  //   }
  // });

  // dropDowns() {
  //   const { start, count } = this.getStartAndCount();
  //   this.fetchDropdownData(start, count);
  // }
  selectedOption(event: any, input: any) {
    let obj = {
      event: event,
      data: this.cdkLst?.find((item: any) => item.id == event.value)
    }
    this.onBlurEvent.emit(obj);
  }
}
