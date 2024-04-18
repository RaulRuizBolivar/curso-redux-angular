import { Action, createReducer, on } from '@ngrx/store';
import {
    cargarUsuario,
    cargarUsuarioError,
    cargarUsuarioSuccess
} from '../actions';
import { Usuario } from '../../models/usuario.model';

interface UsuarioError {
    url: string,
    name: string,
    message: string
}

export interface UsuarioState {
    id?:string,
    user?: Usuario,
    loaded: boolean,
    loading: boolean,
    error?: UsuarioError
}

const initialState: UsuarioState = {

    id      : undefined,
    user    : undefined,
    loaded  : false,
    loading : false,
    error   : undefined
}

const _usuarioReducer = createReducer(initialState,

    on(cargarUsuario, (state,{id}) => ({
        ...state,
        loading: true,
        id: id
    })),
    on(cargarUsuarioSuccess, (state,{usuario}) => {
        return({
        ...state,
        loading: false,
        loaded: true,
        user: {...usuario},
        error:undefined
    })}),
    on(cargarUsuarioError, (state,{payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        user: undefined,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function usuarioReducer(state: UsuarioState|undefined, action:Action) {
    return _usuarioReducer(state, action);
}