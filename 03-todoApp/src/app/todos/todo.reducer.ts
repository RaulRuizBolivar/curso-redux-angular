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
    // Create
    on(Actions.create , (state, {text}) => [...state, new Todo(text)]),
    // Toggle 1
    on(Actions.toggle , (state , {id}) => {
        return state.map( todo => {
            if(todo.id === id) return {...todo, completed : !todo.completed}
            return todo
        } )
    }),
    // Toggle All
    on(Actions.toggleAll , (state , {allSelected}) => {
        return state.map(todo => {return {...todo , completed : allSelected}})
    }),
    // Edit
    on(Actions.edit , (state , {id,text}) => {
        console.log(text);
        
        return state.map( todo => {
            if(todo.id === id) return {...todo, text : text}
            return todo
        } )
    }),
    // Remove
    on(Actions.remove, (state, {id}) => state.filter(todo => todo.id !== id) )
)

export function todoReducer(state : Todo[] | undefined ,action:Action){
    return _todoReducer(state,action)
}