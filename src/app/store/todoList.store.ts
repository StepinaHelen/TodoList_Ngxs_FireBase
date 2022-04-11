import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { BehaviorSubject, Observable } from 'rxjs'
import { TodoListService } from '../service/todo-list.service'

export interface TodoState {
  list: any[]
}

@Injectable()
export class TodoListStore extends ComponentStore<TodoState> {
  constructor(private todoListService: TodoListService) {
    super({ list: [] })
  }
  public stateList$: BehaviorSubject<any> = new BehaviorSubject<any>([])

  readonly list$: Observable<any> = this.select((state) => state.list)

  readonly addItem = this.updater(
    (state, value: any) => (
      this.stateList$.next(state.list),
      {
        list: this.todoListService.addListItem(value.text, value.collection),
      }
    ),
  )

  readonly deleteItem = this.updater(
    (state, value: any) => (
      this.stateList$.next(state.list),
      {
        list: this.todoListService.deleteListItem(value.id, value.collection),
      }
    ),
  )

  readonly editItem = this.updater(
    (state, value: any) => (
      this.stateList$.next(state.list),
      {
        list: this.todoListService.updateListItem(
          value.id,
          value.text,
          value.collection,
        ),
      }
    ),
  )
}
