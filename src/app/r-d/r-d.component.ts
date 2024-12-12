import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-r-d',
  templateUrl: './r-d.component.html',
  styleUrls: ['./r-d.component.scss']
})
export class RDComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private bankServ: BankService
  ) { }

  ngOnInit(): void {
    let lst = this.personsList();

  }

  PersonForm = this.fb.group({
    persons: this.fb.array([this.personObj()]),
  })


  personObj() {
    return this.fb.group({
      personId: [''],
      personName: ['']
    })
  }
  get personList(): FormArray {
    return this.PersonForm.get('persons') as FormArray;
  }

  personsList() {
    this.bankServ.getPersons().subscribe((response: any) => {
      this.personList.clear()
      response.forEach((item: any) => {
        this.personList.push(this.personObj())
      })
      this.personList.patchValue(response)
    })
  }

  onSubmit() {
    console.log('formValues')
  }

}
