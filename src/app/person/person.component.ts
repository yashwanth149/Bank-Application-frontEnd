import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankService } from '../services/bank.service';
import { GuidedTourService } from 'ngx-guided-tour';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  private scrollSub : Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonComponent>,
    private guideServ: GuidedTourService) { }
    
   ngAfterViewInit(): void {
    this.scrollSub = this.viewPort.scrolledIndexChange.subscribe(() => {
    });
  }

  
  ngOnInit(): void {
    // Check if data.branchlstTest is empty or not
    if (this.data.branchlstTest) {
      const person = this.data.branchlstTest;

      person.forEach(() => {
        this.addPerson();
      });

      this.personControls.patchValue(person);

    } else {
      this.addPerson();
    }

    if (this.data.mode === 'guide') {
      this.tour();
    }
  }


  personForm = this.fb.group({
    dynamicArray: this.fb.array([])
  });

  addPerson(): void {
    const person = this.fb.group({
      personId: [''],
      personName: ['']
    });
    this.personControls.push(person);
  }


  get personControls(): FormArray {
    return this.personForm.get('dynamicArray') as FormArray;
  }



  removePerson(index: number): void {
    const dynamicArray = this.personForm.get('dynamicArray') as FormArray;
    dynamicArray.removeAt(index);
  }

  //storing the form value in a lst...
  returnFormData() {
    this.dialogRef.close(this.personForm.value);
  }

  tour() {
    this.guideServ.startTour({
      tourId: 'tou',
      useOrb: true,
      steps: [
        {
          title: 'test',
          selector: '.pg1',
          content: 'Testing'
        }
      ]
    })
  }


}
