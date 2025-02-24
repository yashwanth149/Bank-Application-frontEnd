import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bank } from '../models/bank.model';
import { BranchCity } from '../models/branchcity.model';
import { Branch } from '../models/branch.model';
import { User } from '../models/user';
import { SearchData } from '../models/banksearch';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.apiServerUrl}/bank/home`);
  }

  public getBankById(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${this.apiServerUrl}/bank/fetchById/${id}`);
  }

  public addBank(bank: any): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/bank/add`, bank);
  }

  public deleteBank(bankId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bank/delete/${bankId}`);
  }

  // Dropdown data
  public cityData(): Observable<BranchCity[]> {
    return this.http.get<BranchCity[]>(`${this.apiServerUrl}/bank/branchlst`);
  }

  public cityById(cityId: number): Observable<BranchCity> {
    return this.http.get<BranchCity>(`${this.apiServerUrl}/bank/cityId/${cityId}`)
  }

  // mat-dialog box methds...

  public getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiServerUrl}/bank/branchObj/${id}`)
  }

  // login crediantials check........

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/bank/getUsers`)
  }

  // Search with fields...
  public searchBank(data: SearchData): Observable<Bank[]> {
    return this.http.post<Bank[]>(`${this.apiServerUrl}/bank/searchField`, data);
  }

  public addCityd(city: any): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/bank/addbranch`, city);
  }


  public findCity(id: Number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/bank/cityId`);
  }

  public removeCity(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bank/deleteCity/${id}`);
  }

  public getAllPersons(start: number, end: number): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiServerUrl}/bank/getAllPersons?start=${start}&end=${end}`);
  }


  public commonDropdown(dataObj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiServerUrl}/bank/common-search`, dataObj);
  }

  public onKeySearchDropDown(dataObj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiServerUrl}/bank/on-key-search`, dataObj);
  }

  public getPersons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/bank/getPersons`);
  }

  public saveTotalBankBalane(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/bank/save-total-balance`, form);
  }

  public getTotalBankBalane(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/bank/get-total-balance?id=${id}`);
  }


  public validateCredintials(userName: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/bank/validate-credintials?userName=${userName}&password=${password}`);
  }
}
