import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from "@angular/core";
import { Observable } from "rxjs";
import { TodoListService } from "src/app/service/todo-list.service";


@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ TodoListService],
})
export class ListComponent implements OnInit {
    text!: string;
    editText!: string;
    isEdit = false;
    id = "";
    @Input() collect: any;

    list$!: Observable<any[]>;

    constructor(
        private todoListService: TodoListService,
    ) {}
    ngOnInit() {
     this.list$ = this.todoListService.getTodoList(this.collect)
    }

    addItemList() {
        this.todoListService.addListItem(
             this.text,
             this.collect,
        );
        this.text = "";
    }

    deleteItem(id: string) {
        this.todoListService.deleteListItem( id, this.collect );
    }

    updateItem(id: string, text: string) {
        this.isEdit = true;
        this.editText = text;
        this.id = id;
    }

    saveItem() {
        this.todoListService.updateListItem(
            this.id,
            this.editText,
            this.collect,
        );
        this.isEdit = false;
        this.editText = "";
    }
}
