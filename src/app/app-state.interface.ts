import { LoginCredentials } from "./types/credintials.interface";
import { TotalBalanceState } from "./types/total-balance.interface";

export interface AppStateInterface {
    balance: TotalBalanceState,
    crediantials: LoginCredentials

}