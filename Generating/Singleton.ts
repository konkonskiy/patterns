class MyMap {
  private static instance: MyMap

  map: Map<number, string> = new Map()

  private constructor() {} // Приватный конструктор и есть фишка реализации синглтона на TS

  clean() {
    this.map = new Map()
  }

  public static get(): MyMap {
    if (!MyMap.instance) {
      MyMap.instance = new MyMap() // Так как конструктор приватный мы можем создавать инстанс только внутри класса
    }

    return MyMap.instance
  }
}

class Service1 {
    addMap(key: number, value: string) {
        const myMap = MyMap.get()
        myMap.map.set(key, value)
    }
}

class Service2 {
  getKeys(key: number) {
    const myMap = MyMap.get()
    console.log("🚀 ~ file: Singleton.ts ~ line 31 ~ Service2 ~ getKeys ~ myMap", myMap.map.get(key))
    myMap.clean()
    console.log('🚀 ~ file: Singleton.ts ~ line 31 ~ Service2 ~ getKeys ~ myMap', myMap.map.get(key))
  }
}