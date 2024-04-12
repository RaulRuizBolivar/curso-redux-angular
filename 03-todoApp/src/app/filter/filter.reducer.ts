import { Action, createReducer, on } from "@ngrx/store";
import { setFilter } from "./filter.actions";
import { validFilter } from '../types/validFilter.type';

export const initialState : validFilter = 'all';

const _filterReducer = createReducer<validFilter ,Action>(initialState , 
    on( setFilter , (state : validFilter , {filter })=> filter )
)

export function filterReducer (state : validFilter | undefined , action: Action) {
    return _filterReducer(state , action)
}