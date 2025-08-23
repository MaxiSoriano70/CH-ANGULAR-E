import { createReducer, on } from '@ngrx/store';
import { iniciarSesion, cerrarSesion } from './sesion.actions';
import { Sesion } from './sesion.model';

export const initialState: Sesion = {
    usuarioLogueado: null
};

export const sesionReducer = createReducer(
    initialState,
    on(iniciarSesion, (state, { usuario }) => ({
        ...state,
        usuarioLogueado: usuario
    })),
    on(cerrarSesion, state => ({
        ...state,
        usuarioLogueado: null
    }))
);