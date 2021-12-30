
export const todoReducer = ( state: any = [], action: any ) => {
  
    switch (action.type) {
        case 'obtener':
            return [...state, action.payload]
        default:
            return state;
    }
    
};
