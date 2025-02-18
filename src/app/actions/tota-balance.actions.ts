import { Action } from "@ngrx/store";

export const ADD_BALANCE = '[TotaBalance] Add Balance';
export const UPDATE_BALANCE = '[TotaBalance] Update Balance';
export const REMOVE_BALANCE = '[TotaBalance] Remove Balance';

export class AddBalance implements Action {
    readonly type = ADD_BALANCE;
    constructor(public payload: any) {
    }
}
export class RemoveBalance implements Action {
    readonly type = REMOVE_BALANCE;
    constructor(public payload: any) { }
}

export class UpdateBalance implements Action {
    readonly type = UPDATE_BALANCE;
    constructor(public payload: number) { }
}

export type Actions = AddBalance | RemoveBalance | UpdateBalance;