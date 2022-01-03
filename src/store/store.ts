import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {uiReducer} from '../Reducers/uiReducer' 
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    ui: uiReducer 
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);