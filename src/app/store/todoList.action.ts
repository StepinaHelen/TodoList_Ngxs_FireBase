export namespace Todo {
  export class FetchAll {
    static readonly type = '[Todo] Fetch All'
    constructor(public collection: string) {}
  }

  export class Add {
    static readonly type = '[Todo] Add'
    constructor(public text: any, public collection: string) {}
  }

  export class Delete {
    static readonly type = '[Todo] Delete'
    constructor(public id: string, public collection: string) {}
  }

  export class Edit {
    static readonly type = '[Todo] Edit'
    constructor(public id: string, public text: any, public collection: string) {}
  }
}
