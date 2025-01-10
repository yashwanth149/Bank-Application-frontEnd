import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BankService } from '../services/bank.service';
import { first, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-r-d',
  templateUrl: './r-d.component.html',
  styleUrls: ['./r-d.component.scss']
})
export class RDComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private bankServ: BankService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.personsList().then((tes: any) => {
      tes.forEach(() => {
        this.personList.push(this.personObj());
      });
      this.personList.patchValue(tes);

    });
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

  pList: any[] = [];
  async personsList() {
    return new Promise((resolve) => {
      this.bankServ.getPersons().subscribe(response => {
        resolve(response);
        this.pList = response;
      });
    });
  }

  addPerson() {
    this.personList.push(this.personObj());
    // this.personList = [...this.personList];
  }

  deletePerson(id:any){
    alert(id);
  }
}
