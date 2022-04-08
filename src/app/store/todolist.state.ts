import { Injectable } from '@angular/core'
import { Action, State, StateContext } from '@ngxs/store'
import { Todo } from './todoList.action'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map, take, tap } from 'rxjs/operators'
import { TodoListService } from '../service/todo-list.service'
import { HelperService } from '../service/helper.service'
export interface TodoItemModel {
  // id: string;
  text: string
}

export interface TodoStateModel {
  list: TodoItemModel[]
}

@State<TodoStateModel>({
  name: 'todolistState',
  defaults: {
    list: [],
  },
})
@Injectable()
export class TodoListState {
  constructor(private todoListService: TodoListService, private helperService:HelperService) {}
  @Action(Todo.FetchAll)
  getTodoList(ctx: StateContext<TodoStateModel>) {
    return this.todoListService.getTodoList().pipe(
      tap((list) => {
        // ctx.patchState({ list })
        this.helperService.manageStateChanges(list, ctx)
      }),
    )
  }
  @Action(Todo.Add)
  addListItem(ctx: StateContext<TodoStateModel>, action: Todo.Add) {
    return this.todoListService.addListItem(action.text)
  }
  @Action(Todo.Delete)
  deleteListItem(ctx: StateContext<TodoStateModel>, action: Todo.Delete) {
    return this.todoListService.deleteListItem(action.id)
  }
   @Action(Todo.Edit)
  updateListItem(ctx: StateContext<TodoStateModel>, action: Todo.Edit) {
    return this.todoListService.updateListItem(action.id,action.text)
  }
}
