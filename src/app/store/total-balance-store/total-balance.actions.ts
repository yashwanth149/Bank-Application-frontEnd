import { createAction, props } from "@ngrx/store";

export const getTotalBalence = createAction('[Total Balance] Get Total Balance');
export const getTotalBalenceSuccess = createAction('[Total Balance] Get Total Balance Success', props<{ totalBalance: number }>());
export const getTotalBalenceFail = createAction('[Total Balance] Get Total Balance fail', props<{ error: string }>());
export const updateBalance = createAction('[Total Balance] Update Balance', props<{ prev: number, current: number }>());

