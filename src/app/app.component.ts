import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Todo } from "./store/todoList.action";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    text!: string;
    editText!: string;
    isEdit = false;
    id = "";

    list$!: Observable<any[]>;

    constructor(private store: Store) {
        this.store.dispatch(new Todo.FetchAll());
        this.list$ = this.store.select((state) => state.todolistState.list);
    }
    addItemList() {
        this.store.dispatch(new Todo.Add(this.text));
        this.text = "";
    }

    deleteItem(id: string) {
        this.store.dispatch(new Todo.Delete(id));
    }

    updateItem(id: string, text: string) {
        this.isEdit = true;
        this.editText = text;
        this.id = id;
    }

    saveItem() {
        this.store.dispatch(new Todo.Edit(this.id, this.editText));
        this.isEdit = false;
        this.editText = "";
    }
}
