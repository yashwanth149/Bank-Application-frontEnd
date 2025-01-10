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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {



  public bankLst: MatTableDataSource<any>;
  public bank!: Bank[];
  isGuide: string;
  @ViewChild(MatPaginator) pagnat !: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private bankService: BankService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private guideServ: GuidedTourService,
    private idleServ: IdleService,
  ) { }

  displayedColumns: string[] = ['bid', 'bname', 'mainBranch', 'email', 'phno', 'actions'];

  ngOnInit(): void {
  
    this.idleServ.isGuideCheck.subscribe(val=>{
      if(val){this.tour();}
    })
    this.getBanks();
  }

  searchForm = this.fb.group({
    bid: null,
    bname: null,
    mainBranch: null
  })

  getBanks() {
    this.bankService.getBanks()
      .subscribe(response => {
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
    console.log(this.searchForm.value);
    this.bankService.searchBank(data.value).subscribe(resp => {
      this.bankLst = new MatTableDataSource(resp);

    });
    this.searchForm.reset();

  }







  /**
   * Testing the cdk virtual scroll
   */
  Common = this.fb.group({
    Params: this.fb.group({
      personName: [''],
      // personId: [''],
    }),
    lable:'personName',
    value:'personName',
    key: [''],
    start: [0],
    count: [10],
    className: ['DataPersonSearch'],
  })
}
