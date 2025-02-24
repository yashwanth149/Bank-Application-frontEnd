import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/app-state.interface";
import { LoginCredentials } from "src/app/types/credintials.interface";

// export const credintialsSelector = (state: AppStateInterface) => state.crediantials
export const featureSelector = createFeatureSelector<LoginCredentials>('crediantials');

export const isLoadingSelector = createSelector(featureSelector, state => state.isSuccess);
export const userSelecotor = createSelector(featureSelector, state => state);
export const userNameSelecotor = createSelector(featureSelector, state => state.username);
