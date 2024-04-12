import { createAction, props } from "@ngrx/store";

export const clearCompleted = createAction(
    '[TODO] Clear All completed todos'
)

export const create = createAction(
    '[TODO] Create a Todo',
    props<{text: string}>()
)

export const toggle = createAction(
    '[TODO] Toggle Todo',
    props<{id:string}>()
)

export const edit = createAction(
    '[TODO] Edit Todo',
    props<{id: string, text: string}>()
)

export const remove = createAction(
    '[TODO] Remove Todo',
    props<{id: string}>()
)

export const toggleAll = createAction(
    '[TODO] Remove Todo',
    props<{allSelected: boolean}>()
)