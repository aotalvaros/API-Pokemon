import { types } from "../types/IPokemonTypes";

const initialState = {
    loading: false
};

export const uiReducer = (state = initialState, action: any) =>{

    switch (action.type) {
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        case types.uiFinishLoading:
            return{
                ...state,
                loading: false
            }           
        default:
            return state;
    };

};