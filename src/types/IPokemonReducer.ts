import { IPokemonState } from "./IPokemonState";

export interface IAction {
    type: string,
    payload: IPokemonState
}