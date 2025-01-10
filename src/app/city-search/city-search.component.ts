import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { BankService } from 'src/app/services/bank.service';
import { IdleService } from '../idle.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {

  cityLst: MatTableDataSource<any>;;
  testList: Number[] = [];
  test2List: any[] = [];
  constructor(
    private bankserv: BankService,
    private rout: Router,
    private guideServ: GuidedTourService,
    private idleServ: IdleService,
    private fb: FormBuilder,
  ) {
    for (let i = 0; i < 10000; i++) {
      this.testList.push(i);
    }
  }

  @ViewChild(MatPaginator) pagnat !: MatPaginator;
  displayedColumns: string[] = ['slNo', 'cityName', 'action'];

  ngOnInit(): void {
    this.idleServ.isGuideCheck.subscribe(val => {
      if (val) { this.tour(); }
    })
    this.getCitylst();
  }



  getCitylst() {
    this.bankserv.cityData().subscribe(data => {
      this.test2List = data;
      this.cityLst = new MatTableDataSource(data);
      this.cityLst.paginator = this.pagnat;

    })
  }

  editCity(id: number) {
    this.rout.navigate(['city-search', id]);
  }


  deletecity(id: number) {
    this.bankserv.removeCity(id).subscribe(() => {
      this.getCitylst();
    });
  }


  tour() {
    this.guideServ.startTour({
      tourId: 'tur2',
      useOrb: false,
      steps: [
        {
          title: 'City Master...',
          selector: '.s1',
          content: 'List of Citis',
          orientation: Orientation.Right
        },
        {
          title: 'Buttons to update/delete',
          selector: '.s2',
          content: 'Modifyin the cities...',
          orientation: Orientation.Top
        },
        {
          title: 'City Table..',
          selector: '.s3',
          content: 'cities List',
          orientation: Orientation.Top
        },


      ]
    });
  }

  // @HostListener('unloaded')

  Common = this.fb.group({
    Params: this.fb.group({
      cname: [''],
      cid: [''], 
    }),
    lable: 'cname',
    value: 'cid',
    key: [''],
    start: [0],
    count: [10],
    className: ['CitySearchVO'],
  })
  // Common = this.fb.group({
  //   Params: this.fb.group({
  //     branchName: [''],
  //     branchId: [''],
  //   }),
  //   lable:'branchName',
  //   value:'branchId',
  //   key: [''],
  //   start: [0],
  //   count: [10],
  //   className: ['BranchSearchVO'],
  // })

  parentData: any
  onBlur(event: any) {
    if (event.data) {
      this.cityLst =  new MatTableDataSource(event.data);
      this.parentData = event
    }
  }


}