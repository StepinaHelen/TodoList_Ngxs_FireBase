import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private afs: AngularFirestore) {}

  getTodoList(): Observable<any> {
    let listCollection = this.afs.collection('todoList')
    return listCollection.stateChanges().pipe(
      map((dataRes) => {
        return dataRes.map((list: any) => ({
          ...list.payload.doc.data(),
          id: list.payload.doc.id,
          type: list.type,
        }))
      }),
    )
  }

  addListItem(text: any): any {
    this.afs.collection('todoList').add({ text })
  }

  deleteListItem(id: string) {
    this.afs.doc('todoList/' + id).delete()
  }

  updateListItem(id: string, text: string) {
    this.afs.doc('todoList/' + id).update({ text })
  }
}
