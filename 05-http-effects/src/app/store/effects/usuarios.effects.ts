import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "../../services/usuario.service";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class UsuariosEffects{

    constructor(
        private actions$ : Actions,
        private usuarioService : UsuarioService
    ){}



    cargarUsuarios$ = createEffect(
        () =>  this.actions$.pipe(
            ofType(cargarUsuarios),
            mergeMap(
                () =>
                    this.usuarioService.getUsers().pipe(
                        map(usuarios => cargarUsuariosSuccess({usuarios})),
                        catchError(payload => of(cargarUsuariosError({payload})))
                    )
            )
        )
    )


}