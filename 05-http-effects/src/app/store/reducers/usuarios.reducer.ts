import { Action, createReducer, on } from '@ngrx/store';
import {
    cargarUsuarios,
    cargarUsuariosError,
    cargarUsuariosSuccess
} from '../actions';
import { Usuario } from '../../models/usuario.model';

interface UsuarioError {
    url: string,
    name: string,
    message: string
}

export interface UsuariosState {
    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error?: UsuarioError
}

const initialState: UsuariosState = {
   users: [],
   loaded: false,
   loading: false,
   error: undefined
}

const _usuariosReducer = createReducer(initialState,

    on(cargarUsuarios, state => ({ ...state, loading: true})),
    on(cargarUsuariosSuccess, (state,{usuarios}) => {
        return({
        ...state,
        loading: false,
        loaded: true,
        users: [...usuarios],
        error:undefined
    })}),
    on(cargarUsuariosError, (state,{payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        users: [],
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function usuariosReducer(state: UsuariosState|undefined, action:Action) {
    return _usuariosReducer(state, action);
}