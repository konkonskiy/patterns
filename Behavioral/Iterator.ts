class Task {
  constructor(public prioritet: number) {}
}

class TaskList {
  private tasks: Task[] = []

  public addTask(task: Task) {
    this.tasks.push(task)
  }

  public getTasks() {
    return this.tasks
  }

  public count() {
    return this.tasks.length
  }

  public sortByPriority() {
    this.tasks = this.tasks.sort((a, b) => {
      if (a.prioritet > b.prioritet) {
        return 1
      } else if (a.prioritet === b.prioritet) {
        return 0
      } else {
        return -1
      }
    })
  }

  public getIterator() {
    return new PriorityIterator(this)
  }
}

interface IIterator<T> {
  current(): T | undefined
  next(): T | undefined
  prev(): T | undefined
  index(): number
}

class PriorityIterator implements IIterator<Task> {
  private position: number = 0
  private taskList: TaskList

  constructor(taskList: TaskList) {
    taskList.sortByPriority()
    this.taskList = taskList
  }
  current(): Task | undefined {
    return this.taskList.getTasks()[this.position]
  }
  next(): Task | undefined {
    this.position += 1
    return this.taskList.getTasks()[this.position]
  }
  prev(): Task | undefined {
    this.position -= 1
    return this.taskList.getTasks()[this.position]
  }
  index(): number {
    return this.position
  }
}
const taskList = new TaskList()
taskList.addTask(new Task(1))
taskList.addTask(new Task(10))
taskList.addTask(new Task(100))
taskList.addTask(new Task(5))

const iterator = taskList.getIterator()
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.prev())
console.log(iterator.index())
