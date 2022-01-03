import { types } from "../types/IPokemonTypes";


export const startLoading = () => ({
    type: types.uiStartLoading   
});

export const finishLoading = () => ({
    type: types.uiFinishLoading   
});