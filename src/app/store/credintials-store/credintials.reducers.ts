import { createReducer, on } from "@ngrx/store";
import * as CredintialsActions from "./credintials.actions";

export const initiaLoginState = {
    username: '',
    isSuccess: false
}

export const credindialsReduces = createReducer(initiaLoginState,
    on(CredintialsActions.validateCredSuccess, (state, action) => ({ ...state, username: action.username, isSuccess: true })),
    on(CredintialsActions.userLogout, (state, action) => ({ ...state, username: '', isSuccess: false })),
    on(CredintialsActions.validateCredFail,(state,action) => ({...state,isSuccess:false}))
)