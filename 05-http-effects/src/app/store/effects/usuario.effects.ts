import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, of, mergeMap, tap } from "rxjs";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from "../actions";
import { UsuarioService } from "../../services/usuario.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UsuarioEffects{

    constructor(
        private actions$ : Actions,
        private usuarioService : UsuarioService
    ){}


    cargarUsuario$ = createEffect(
        () =>  this.actions$.pipe(
            ofType(cargarUsuario),
            mergeMap(
                ({id}) =>
                    this.usuarioService.getUserById(id).pipe(
                        map(usuario => cargarUsuarioSuccess({usuario})),
                        catchError(payload => of(cargarUsuarioError({payload})))
                    )
            )
        )
    )
}
