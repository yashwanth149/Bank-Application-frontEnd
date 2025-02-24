import { createAction, props } from "@ngrx/store";

export const validateCred = createAction('[Credintials] Validate Credintials', props<{ username: string, password: string }>());
export const validateCredSuccess = createAction('[Credintials] Validate Credintials Success', props<{ username: string,isSuccess: boolean }>());
export const userLogout = createAction('[Credintials] User Log Out', props<{ isSuccess: boolean }>());
export const validateCredFail = createAction('[Credintials] Validate Credintials Fail', props<{ isSuccess: boolean }>());