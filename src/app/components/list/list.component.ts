import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
} from "@angular/core";
import { tap } from "rxjs/operators";
import { HelperService } from "src/app/service/helper.service";
import { TodoListService } from "src/app/service/todo-list.service";
import { TodoListStore } from "src/app/store/todoList.store";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TodoListStore, TodoListService],
})
export class ListComponent implements OnInit {
    text!: string;
    editText!: string;
    isEdit = false;
    id = "";
    @Input() collect: any;

    list$ = this.todoListStore.list$;

    constructor(
        private cdr: ChangeDetectorRef,
        private readonly todoListStore: TodoListStore,
        private todoListService: TodoListService,
        private helperService: HelperService
    ) {}
    ngOnInit() {
        this.todoListService.getTodoList(this.collect).subscribe((list) => {
            this.helperService.manageStateChanges(list, this.todoListStore);
        });
    }

    addItemList() {
        this.todoListStore.addItem({
            text: this.text,
            collection: this.collect,
        });
        this.text = "";
    }

    deleteItem(id: string) {
        this.todoListStore.deleteItem({ id, collection: this.collect });
    }

    updateItem(id: string, text: string) {
        this.isEdit = true;
        this.editText = text;
        this.id = id;
    }

    saveItem() {
        this.todoListStore.editItem({
            id: this.id,
            text: this.editText,
            collection: this.collect,
        });
        this.isEdit = false;
        this.editText = "";
    }
}
