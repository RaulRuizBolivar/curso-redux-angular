import { Action, State, createReducer, on } from "@ngrx/store";
import * as actions from "./todo.actions";
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Save world'),
    new Todo('Beat Thanos'),
    new Todo('Buy ironman suit'),
    new Todo("Steal Captain America's Shield"),
];

const _todoReducer = createReducer(initialState,
    // Create
    on(actions.create , (state, {text}) => [...state, new Todo(text)]),
    // Toggle 1
    on(actions.toggle , (state , {id}) => {
        return state.map( todo => {
            if(todo.id === id) return {...todo, completed : !todo.completed}
            return todo
        } )
    }),
    // Toggle All
    on(actions.toggleAll , (state , {allSelected}) => {
        return state.map(todo => {return {...todo , completed : allSelected}})
    }),
    // Edit
    on(actions.edit , (state , {id,text}) => {
        console.log(text);
        
        return state.map( todo => {
            if(todo.id === id) return {...todo, text : text}
            return todo
        } )
    }),
    // Remove
    on(actions.remove, (state, {id}) => state.filter(todo => todo.id !== id) ),
    // Clear completed
    on(actions.clearCompleted , state => state.filter(todo => !todo.completed)),
)

export function todoReducer(state : Todo[] | undefined ,action:Action){
    return _todoReducer(state,action)
}