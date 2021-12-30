import { IAction } from "../types/IPokemonReducer";

export const todoReducer = ( state: any = [] , action: IAction  ) => {
  
    switch (action.type) {
        case 'obtener':
            return [...state, action.payload]
        default:
            return state;
    };
    
};
