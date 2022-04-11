import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TodoListService {
  constructor(private afs: AngularFirestore) {}

  getTodoList(collection: string): Observable<any> {
    let listCollection = this.afs.collection(collection)
    return listCollection.stateChanges().pipe(
      map((dataRes) => {
        return dataRes.map((list: any) => ({
          ...list.payload.doc.data(),
          id: list.payload.doc.id,
          type: list.type
        }))
      }),
    )
  }

  addListItem(text: any, collection: string): any {
    this.afs.collection(collection).add({ text })
  }

  deleteListItem(id: string, collection: string): any {
    this.afs.doc(collection + '/' + id).delete()
  }

  updateListItem(id: string, text: string, collection: string):any {
    this.afs.doc(collection + '/' + id).update({ text })
  }
}
