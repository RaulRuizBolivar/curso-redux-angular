import { Action, State, createReducer, on } from "@ngrx/store";
import * as Actions from "./todo.actions";
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Save world'),
    new Todo('Beat Thanos'),
    new Todo('Buy ironman suit'),
    new Todo("Steal Captain America's Shield"),
];

const _todoReducer = createReducer(initialState,
    on(Actions.create , (state, {text}) => [...state, new Todo(text)]),
    on(Actions.toggle , (state , {id}) => {
        return state.map( todo => {
            if(todo.id === id) return {...todo, completed : !todo.completed}
            return todo
        } )
    }),
    on(Actions.edit , (state , {id,text}) => {
        console.log(text);
        
        return state.map( todo => {
            if(todo.id === id) return {...todo, text : text}
            return todo
        } )
    }),
    on(Actions.remove, (state, {id}) => state.filter(todo => todo.id !== id) )
)

export function todoReducer(state : Todo[] | undefined ,action:Action){
    return _todoReducer(state,action)
}