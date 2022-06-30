class KVDataBase {
  private db: Map<string, string> = new Map()

  save(key: string, value: string) {
    this.db.set(key, value)
  }
}

class PersistentDB {
  savePersistent(data: Object) {
    console.log(data);
  }
}

class PersistentDataBaseAdapter extends KVDataBase {
  constructor( public database: PersistentDB) {
    super()
  }

  override save(key: string, value: string) {
    this.database.savePersistent({[key]: value})
  }
}

function run(base: KVDataBase) {
  base.save('key', 'myValue')
}

run(new PersistentDataBaseAdapter(new PersistentDB))