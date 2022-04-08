export namespace Todo {
  export class FetchAll {
    static readonly type = '[Todo] Fetch All'
  }

  export class Add {
    static readonly type = '[Todo] Add'
    constructor(public text: any) {}
  }

  export class Delete {
    static readonly type = '[Todo] Delete'
    constructor(public id: string) {}
  }

  export class Edit {
    static readonly type = '[Todo] Edit'
    constructor(public id: string, public text: any) {}
  }
}
