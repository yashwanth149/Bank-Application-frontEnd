import { Action } from '@ngrx/store';
import * as TotaBalanceActions from '../actions/tota-balance.actions';

export function totalBalanceReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case TotaBalanceActions.ADD_BALANCE:
            if (action instanceof TotaBalanceActions.AddBalance) {
                console.log(state, action.payload?.existingBalance, action.payload.currentBalance);
                console.log((state - action.payload?.existingBalance) + action.payload.currentBalance);
                
                return (state - action.payload?.existingBalance) + action.payload.currentBalance;
                //  state + action.payload;
            }
            return state;
        case TotaBalanceActions.UPDATE_BALANCE:
            if (action instanceof TotaBalanceActions.UpdateBalance) {
                return state + action.payload;
                //  state + action.payload;
            }
            return state;
        case TotaBalanceActions.REMOVE_BALANCE:
            if (action instanceof TotaBalanceActions.RemoveBalance) {
                if (state > action.payload) { return state - action.payload; }
            }
            return state;
        default:
            return state;
    }
}