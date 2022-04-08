import { Injectable } from "@angular/core";
import { StateContext } from "@ngxs/store";
import { TodoStateModel } from "../store/todolist.state";

@Injectable({
    providedIn: "root",
})
export class HelperService {
    constructor() {}

    manageStateChanges(list: any[], ctx: StateContext<any>) {
        const state = ctx.getState().list;
        let newlistState: any = [];
        list.map((el) => {
            if (el.type === "added") {
                if (!state.length) {
                    newlistState.push(el);
                } else {
                    state.push(el);
                    newlistState = state;
                }
            } else if (el.type === "removed") {
                newlistState = state.filter((data: any) => data.id != el.id);
            } else if (el.type === "modified") {
                newlistState = state.map((data: any) => {
                    return data.id === el.id ? el : data;
                });
            }
        });
        ctx.patchState({ list: newlistState });
    }
}
