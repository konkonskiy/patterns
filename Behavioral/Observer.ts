interface Observer {
  update(subject: Subject): void
}

interface Subject {
  attach(observer: Observer): void
  detach(observer: Observer): void
  notify(): void
}

class Lead {
  constructor(public name: string, public phone: string) {}
}

class NewLead implements Subject {
  private observers: Observer[] = []
  public state: Lead

  attach(observer: Observer): void {
    if (this.observers.includes(observer)) {
      return
    }
    this.observers.push(observer)
  }

  detach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      return
    }
    this.observers = this.observers.filter((o) => observer === o)
  }
  notify(): void {
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }
}

class NotificationService implements Observer {
  update(subject: Subject): void {
    console.log('NotificationService Получил уведомление')
    console.log(subject)
  }
}

class LeadService implements Observer {
  update(subject: Subject): void {
    console.log('LeadService Получил уведомление')
    console.log(subject)
  }
}

const subject = new NewLead()
subject.state = new Lead('Антон', '88888888')

const s1 = new NotificationService()
const s2 = new LeadService()

subject.attach(s1)
subject.attach(s2)
subject.notify()

subject.detach(s1)
subject.notify()
