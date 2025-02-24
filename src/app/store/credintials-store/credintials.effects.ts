import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CredentialsActions from "./credintials.actions";
import { Injectable } from "@angular/core";
import { BankService } from "src/app/services/bank.service";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class CredintialsEffects {
    constructor(
        private action$: Actions,
        private bankServ: BankService,
        private router: Router
    ) { }
    validateCredentials$ = createEffect(() =>
        this.action$.pipe(
            ofType(CredentialsActions.validateCred),
            exhaustMap(action => this.bankServ.validateCredintials(action.username, action.password).pipe(
                map(response => {
                    return CredentialsActions.validateCredSuccess({
                        username: response.uName,
                        isSuccess: true
                    });
                }),
                catchError(() => {
                    return of(CredentialsActions.validateCredFail({ isSuccess: false }));
                })
            ))
        )
    );

    validateCredSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(CredentialsActions.validateCredSuccess),
            tap(response => {
                localStorage.setItem('user', JSON.stringify(response.username));
                this.router.navigate(['/dash']);
            })
        ), { dispatch: false }
    );

    userLogOut$ = createEffect(() =>
        this.action$.pipe(
            ofType(CredentialsActions.userLogout),
            tap(action => {
                localStorage.clear();
                localStorage.removeItem('user');
                this.router.navigate(['/login']);
                console.log('User Logout', action);
            }),
        ), { dispatch: false }
    )

    invalidCredentials$ = createEffect(() =>
        this.action$.pipe(
            ofType(CredentialsActions.validateCredFail),
            tap(() => {
                alert('Invalid Credentials..........');
                console.log('Testing.............');
            })
        ), { dispatch: false }
    );

}
