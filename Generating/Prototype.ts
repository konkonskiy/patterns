interface Prototype<T> {
  clone(): T // По сути паттерн прототип это класс(объект) с возможностью клонирования 
}

class UserHistory implements Prototype<UserHistory> {
  creetedAt: Date

  constructor(public name: string, public email: string) {
    this.creetedAt = new Date()
  }

  clone(): UserHistory {
    const cloneUser = new UserHistory(this.name, this.email)
    cloneUser.creetedAt = this.creetedAt
    return cloneUser
  }
}
