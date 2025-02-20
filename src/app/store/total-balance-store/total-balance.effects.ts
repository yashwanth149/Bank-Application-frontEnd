import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TotalBalanceActions from "./total-balance.actions";
import { map, mergeMap } from "rxjs";
import { BankService } from "src/app/services/bank.service";


@Injectable()
export class TotalBalanceEffects {
    constructor(
        private actions$: Actions,
        private bankservice: BankService
    ) { }

    getBalance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TotalBalanceActions.getTotalBalence),
            mergeMap(() => {
                return this.bankservice.getTotalBankBalane(1).pipe(
                    map(response => TotalBalanceActions.getTotalBalenceSuccess({ totalBalance: response.totalBankBalance }))
                )
            })
        )
    );
}

