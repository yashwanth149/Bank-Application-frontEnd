import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Bank } from '../models/bank.model';
import { BankService } from '../services/bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { FormBuilder } from '@angular/forms';
import { IdleService } from '../idle.service';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TotaBalanceActions from "../store/total-balance-store/total-balance.actions";
import { isLoadingSelector, totalBalanceSelector } from '../store/total-balance-store/total-balance.selectors';
import { AppStateInterface } from '../app-state.interface';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  balance: number;

  public bankLst: MatTableDataSource<any>;
  public banks: any[];
  public bank!: Bank[];
  isGuide: string;
  // public totalBalance$ = this.store.select(selectTotalBalanceState);
  public totalBalance$: Observable<number>;
  isLoaded$: Observable<boolean>;
  @ViewChild(MatPaginator) pagnat !: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private router: Router,
    private guideServ: GuidedTourService,
    private idleServ: IdleService,
    private store: Store<AppStateInterface>
  ) {
    this.isLoaded$ = this.store.pipe(select(isLoadingSelector));

    // store.select('balance').subscribe((val: any) => this.balance = val);
    // console.log('balance initial state', this.balance);
  }

  displayedColumns: string[] = ['bid', 'bname', 'mainBranch', 'email', 'phno', 'bankBalance', 'actions'];

  ngOnInit(): void {
    this.idleServ.isGuideCheck.subscribe(val => {
      if (val) { this.tour(); }
    })
    this.isLoaded$.subscribe(val => {
      if (val) {
        this.store.dispatch(TotaBalanceActions.getTotalBalence());
      }
    })
    this.store.pipe(select(totalBalanceSelector)).subscribe(val => this.balance = val);
    this.setTotalBalanceFormData();
    this.getBanks();
  }


  TotalBankBalance = this.fb.group({
    id: [1],
    totalBankBalance: [0],
  })


  async setTotalBalanceFormData() {

  }

  searchForm = this.fb.group({
    bid: null,
    bname: null,
    mainBranch: null
  })

  getBanks() {
    this.bankService.getBanks()
      .subscribe(response => {
        this.banks = response;

        this.bankLst = new MatTableDataSource(response);
        this.bankLst.paginator = this.pagnat;
      }),
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
  }

  edit(id: number) {
    this.router.navigate(['update', id]);
  }

  delete(id: number) {
    const balance = this.banks.find((item: any) => item.bid == id);
    this.store.dispatch(TotaBalanceActions.deleteBalance({ bankBalance: balance.bankBalance }))
    this.bankService.deleteBank(id).subscribe(response => {
      this.getBanks();
    });

  }

  applyFilter(key: string) {
    this.bankLst.filter = key.trim().toLowerCase();

  }


  createPg() {
    this.router.navigate(['/create'], { queryParams: { mode: this.isGuide } });

  }

  //guide
  tour() {
    this.guideServ.startTour({
      tourId: 'tour',
      useOrb: false,
      steps: [
        {
          title: 'Global Search...',
          selector: '#s1',
          content: 'Searchs Banks form the below list',
          orientation: Orientation.Bottom
        },
        {
          title: 'Button to Create Bank',
          selector: '#s2',
          content: 'Redirect to create component to creae bank',
          orientation: Orientation.Bottom
        },
        {
          title: 'Buttons update/delete',
          selector: '#s8',
          content: 'Modify the banks account',
          orientation: Orientation.Bottom
        },


      ]
    });
  }

  searchbtn(data: any) {
    this.bankService.searchBank(data.value).subscribe(resp => {
      this.banks = resp;
      this.bankLst = new MatTableDataSource(resp);

    });
    this.searchForm.reset();

  }



  saveBankbalance() {
    this.TotalBankBalance.get('totalBankBalance')?.patchValue(this.balance);
    this.bankService.saveTotalBankBalane(this.TotalBankBalance.value).subscribe(resp => {
    })
  }


  /**
   * Testing the cdk virtual scroll
   */
  Common = this.fb.group({
    Params: this.fb.group({
      personName: [''],
      // personId: [''],
    }),
    lable: 'personName',
    value: 'personName',
    key: [''],
    start: [0],
    count: [10],
    className: ['DataPersonSearch'],
  })
}
