import { createAction, props } from "@ngrx/store";
import { validFilter } from "../types/validFilter.type";

export const setFilter = createAction(
    '[Filter] Set Filter',
    props<{filter : validFilter}>()
)