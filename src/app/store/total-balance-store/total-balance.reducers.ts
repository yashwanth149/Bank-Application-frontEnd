import { createReducer, on } from "@ngrx/store";
import { TotalBalanceState } from "src/app/types/total-balance.interface";
import * as TotaBalanceActions from "./total-balance.actions";

export const totalBalanceInitialState: TotalBalanceState = { totalBalance: 0, loadding: true, error: '' };

export const reducers = createReducer(
    totalBalanceInitialState,
    on(TotaBalanceActions.getTotalBalence, (state) => ({ ...state, loadding: true })),
    on(TotaBalanceActions.getTotalBalenceSuccess, (state, action) => ({ ...state, loadding: false, totalBalance: action.totalBalance })),
    on(TotaBalanceActions.getTotalBalenceFail, (state, action) => ({ ...state, loadding: true, error: action.error })),
    on(TotaBalanceActions.updateBalance, (state, action) => ({ ...state, totalBalance: Number(state.totalBalance) + Number(action.current) }))
);
