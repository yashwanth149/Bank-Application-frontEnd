import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../services/bank.service';
import { BranchCity } from '../models/branchcity.model';
import { IdleService } from '../idle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-citymaster',
  templateUrl: './citymaster.component.html',
  styleUrls: ['./citymaster.component.scss']
})
export class CitymasterComponent implements OnInit {
  isGuide: any;
  city: BranchCity;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
    private guideServ: GuidedTourService,
    private actRoute: ActivatedRoute,
    private bankServ: BankService,
    private route: Router,
    private idleServ:IdleService,
    private eleRf:ElementRef,
  ) { }
  

  ngOnInit(): void {
    this.subscription = this.idleServ.isGuideCheck.subscribe(val => {
      if (val) { this.tour(); }
    })
    let id = this.actRoute.snapshot.paramMap.get('id');
    if(id){
      this.editCity(id);
    }
  }


  cityForm = this.fb.group({
    cId: [''],
    cName: [''],
    clst: this.fb.array([this.branchDtls()]),
  })


  branchDtls() {
    return this.fb.group({
      bnameId: [''],
      branchN: ['']
    })
  }

  get branchDt() {
    return this.cityForm.get('clst') as FormArray;
  }

  addCity() {
    this.branchDt.push(this.branchDtls());
  }

  editCity(id:any){
    this.bankServ.cityById(id).subscribe((response:any)=>{
      console.log(response);
      this.branchDt.clear();
      response.clst.forEach(()=>{
        this.branchDt.push(this.branchDtls());
      })
      
      this.cityForm.patchValue(response);
    })
  }

  removeBranch(inde: number) {
    if (this.branchDt.length > 1) {
      this.branchDt.removeAt(inde);
    }
    else {
      this.branchDt.reset();
    }
  }

  AddCityObj() {
    this.bankServ.addCityd(this.cityForm.value).subscribe(()=>{
      this.route.navigate(['/city-search'])
    });
  }

  tour() {
    this.guideServ.startTour({
      tourId: 'tur2',
      useOrb: false,
      steps: [
        {
          title: 'City',
          selector: '.p',
          content: 'City Object...',
          orientation: Orientation.BottomRight
        },
        {
          title: 'Brnch',
          selector: '.c',
          content: 'Branch Object....',
          orientation: Orientation.BottomRight
        },
        {
          title: 'Add',
          selector: '.s1',
          content: 'Add a new branch..',
          orientation: Orientation.Top
        },
        {
          title: 'Submit',
          selector: '.s3',
          content: 'submit a new city',
          orientation: Orientation.TopRight
        },
      ]
    });
  }


}
