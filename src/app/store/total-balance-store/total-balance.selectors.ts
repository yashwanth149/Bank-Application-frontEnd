import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/app-state.interface";

export const selectFeature = (state: AppStateInterface) => state.balance;

export const isLoadingSelector = createSelector(selectFeature, (state) => state.loadding);

export const totalBalanceSelector = createSelector(selectFeature, (state) => state.totalBalance)