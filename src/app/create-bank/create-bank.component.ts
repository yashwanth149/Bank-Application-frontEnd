import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../services/bank.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValid } from '../validators/nospacevalid';
import { BranchCity } from '../models/branchcity.model';
import { MatDialog } from '@angular/material/dialog';
import { PersonComponent } from '../person/person.component';
import { GuidedTourService, Orientation } from 'ngx-guided-tour';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import * as TotaBalanceActions from '../actions/tota-balance.actions';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.scss']
})
export class CreateBankComponent implements OnInit {
  dlst: BranchCity[] = [];
  public bankUpdateId!: number;
  public isUpdateActive: boolean = false;
  public displayObjectData: any;
  lstSelects: any[] = [];
  selectedCityValues: any[] = [];
  isGuide: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bankService: BankService,
    private dialog: MatDialog,
    private guideServ: GuidedTourService,
    private store: Store<AppState>,
  ) { }

  public createForm!: FormGroup;

  ngOnInit(): void {
    this.cityDropLst();

    this.createForm = this.fb.group({
      bid: [''],
      bname: ['', [Validators.required, CustomValid.nospaceValid]],
      mainBranch: ['', Validators.required],
      email: ['', Validators.required],
      phno: ['', Validators.required],
      bankBalance: ['', Validators.required],
      lst: this.fb.array([
      ]),
    });

    this.activatedRoute.queryParams.subscribe(parms => {
      this.isGuide = parms['mode'];
    })

    if (this.isGuide === 'guide') {
      this.tour();
    }

    this.activatedRoute.params.subscribe(val => {
      this.bankUpdateId = val['id'];
      if (this.bankUpdateId) {

        this.bankService.getBankById(this.bankUpdateId).subscribe((response: any) => {
          this.isUpdateActive = true;

          response.lst.forEach((branchData: any, index: number) => {
            this.addBranch();
            this.onValueChange(index, branchData.branchCity);
            this.getpersonForm(index).clear();

            branchData.sublst.forEach((i: number) => {

              this.getpersonForm(index).push(this.addPersonRow());
            })
          });

          this.createForm.patchValue(response);
          this.BalObj.existingBalance = response.bankBalance;
          this.displayObjectData = this.createForm.value;

        });
      }
    });

    if (!this.bankUpdateId) {
      this.addBranch();
    }


  }
  addPersonRow(): any {
    return this.fb.group({
      personId: [''],
      personName: ['']
    })
  }


  // accessing the formarray...(both)
  get branchForm() {
    return this.createForm.get('lst') as FormArray;
  }


  get personControl() {
    return this.createForm.get('sublst') as FormArray
  }

  //adding the branch on click of add branch button
  addBranch() {
    const branch = this.fb.group({
      branchId: [''],
      branchCity: [''],
      branchName: [''],
      sublst: this.fb.array([
        []
      ])
    });
    this.branchForm.push(branch);
  }

  getpersonForm(index: number) {
    return this.branchForm.at(index).get('sublst') as FormArray;
  }

  //opening the mat dialog box.....by taking tha particular branch id
  addPerson(branchIndex: number) {
    this.displayObjectData = this.branchForm.at(branchIndex).value;

    const dialogBox = this.dialog.open(PersonComponent, {
      width: '36%',
      data: {
        title: 'New Person Account',
        branchlstTest: this.getpersonForm(branchIndex).value,
        mode: this.isGuide
      },
      disableClose: true
    });

    dialogBox.afterClosed().subscribe((dataBack: any) => {
      if (dataBack) {
        this.getpersonForm(branchIndex).clear();
        dataBack.dynamicArray.forEach((item: any) => {
          this.getpersonForm(branchIndex).push(this.fb.group({
            personId: item.personId,
            personName: item.personName
          }));
        });
      }
      this.displayObjectData = this.createForm.value;
    });

  }


  //removing the rows......



  removeBranch(index: number) {

    if (this.branchForm.length > 1) {
      this.branchForm.removeAt(index);
    }
    else {
      this.branchForm.reset();
    }
  }

  //removing branch from child
  removeBranchObj(ind: number) {
    if (this.branchForm.length > 1) {
      this.branchForm.removeAt(ind);
    }
    else {
      this.branchForm.reset();
    }
  }

  BalObj = {
    existingBalance: 0,
    currentBalance: 0
  }
  submit() {
    console.log(this.createForm.value);
    this.BalObj.currentBalance = Number(this.createForm.value.bankBalance) ?? 0;
    // this.store.dispatch(new TotaBalanceActions.AddBalance(Number(this.createForm.value.bankBalance)));
    this.store.dispatch(new TotaBalanceActions.AddBalance(this.BalObj));
    if (this.createForm.valid) {
      this.bankService.addBank(this.createForm.value)
        .subscribe(() => {
          this.router.navigate(['/list']);
        });
    }
  }

  update() {
    this.submit();
  }

  cityDropLst() {
    this.bankService.cityData().subscribe((datalst: BranchCity[]) => {
      this.dlst = datalst;
    })
  }
  onValueChange(index: number, item: string) {
    this.bankService.cityById(Number(item)).subscribe((response: BranchCity) => {
      this.lstSelects[index] = response.clst;
      this.displayObjectData = this.createForm.value;
    });
  }

  onBranchValueChange(val: any) {
    this.displayObjectData = this.createForm.value;
  }

  tour() {
    this.guideServ.startTour({
      tourId: 'tour',
      useOrb: true,

      steps: [
        {
          title: 'Main bank entry',
          selector: '.s1',
          content: 'Main Bank details',
          orientation: Orientation.Bottom

        },
        {
          title: 'test',
          selector: '.s2',
          content: 'Testing',
          orientation: Orientation.Bottom

        }
      ]
    });
  }


}



