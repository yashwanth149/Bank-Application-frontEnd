import { Branch } from "./branch.model";

export class Bank{
    get(arg0: string): any {
      throw new Error('Method not implemented.');
    }
    bid: number;
    bname: string;
    email: string;
    mainBranch: string;
    phno: number;
    lst: Branch
}