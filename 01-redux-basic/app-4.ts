import { configureStore } from '@reduxjs/toolkit'
import { contadorReducer } from './contador/contador.reducer';
import { decrementadorAction, dividirAction, incrementadorAction, multiplicarAction } from './contador/contador.actions';

const store  = configureStore({
    reducer : contadorReducer
});

store.subscribe(
    ()=> console.log("Subscription -->" , store.getState())
)

store.dispatch(incrementadorAction)
store.dispatch(multiplicarAction)
store.dispatch(decrementadorAction)
store.dispatch(multiplicarAction)
store.dispatch(dividirAction)