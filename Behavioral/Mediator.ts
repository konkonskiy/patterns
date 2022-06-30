interface Mediator {
  notify(sender: string, event: string): void
}

abstract class Mediated {
  mediator: Mediator
  setMediator(mediator: Mediator) {
    this.mediator = mediator
  }
}

class Notifications {
  send() {
    console.log('Отправляю уведомлене')
  }
}

class Logger {
  log(message: string) {
    console.log(message)
  }
}

class EventHandler extends Mediated {
  myEvent() {
    this.mediator.notify('EventHendler', 'myEvent')
  }
}

class NotificationsMediator implements Mediator {
  constructor(public notifications: Notifications, public logger: Logger, public handler: EventHandler) {}

  notify(_: string, event: string): void {
    switch (event) {
      case 'myEvent':
        this.notifications.send()
        this.logger.log('Отправлено')
        break
    }
  }
}

const handler = new EventHandler()
const logger = new Logger()
const notifications = new Notifications()

const m = new NotificationsMediator(notifications, logger, handler)

handler.setMediator(m)
handler.myEvent();
