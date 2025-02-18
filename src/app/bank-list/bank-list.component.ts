import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Bank } from '../models/bank.model';
import { BankService } from '../services/bank.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdleService } from '../idle.service';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as TotaBalanceActions from '../actions/tota-balance.actions';


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
  @ViewChild(MatPaginator) pagnat !: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private router: Router,
    private guideServ: GuidedTourService,
    private idleServ: IdleService,
    private store: Store<AppState>,
  ) {
    // store.select('balance').subscribe((val: any) => this.balance = val);
    // console.log('balance initial state', this.balance);
  }

  displayedColumns: string[] = ['bid', 'bname', 'mainBranch', 'email', 'phno', 'bankBalance', 'actions'];

  ngOnInit(): void {

    this.idleServ.isGuideCheck.subscribe(val => {
      if (val) { this.tour(); }
    })

    this.setTotalBalanceFormData();
    // this.bankService.getTotalBankBalane(1).subscribe(resp => {
    //   this.TotalBankBalance.patchValue(resp);
    // })
    // this.store.select('balance').subscribe((val: any) => console.log('balance', val));

    // this.store.dispatch(new TotaBalanceActions.AddBalance(Number(this.TotalBankBalance.value.totalBankBalance)));
    // this.store.select('balance').subscribe((val: any) => {
    //   this.balance = val; console.log('balance', val);
    // });

    this.getBanks();
  }

  
  TotalBankBalance = this.fb.group({
    id: [1],
    totalBankBalance: [0],
  })


  async setTotalBalanceFormData() {
    const resp = await this.bankService.getTotalBankBalane(1).toPromise();
    if (resp) this.TotalBankBalance.patchValue(resp);
    this.store.dispatch(new TotaBalanceActions.UpdateBalance(+resp.totalBankBalance));
    this.store.select('balance').subscribe((val: any) => this.balance = val);


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
    this.store.dispatch(new TotaBalanceActions.RemoveBalance(Number(balance.bankBalance)));
    this.bankService.deleteBank(id).subscribe(response => {
      this.getBanks();
    });
    this.store.select('balance').subscribe((val: any) => this.balance = val);

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
