interface IProvider {
  sendMessage(message: string): void
  connect(config: unknown): void
  disconnect(): void
}

class TelegrammProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message, 'сообщение отправлено')
  }
  connect(config: unknown): void {
    console.log(config, 'TG подключено')
  }
  disconnect(): void {
    console.log('TG отключено')
  }
}

class WhatsUpProvider implements IProvider {
  sendMessage(message: string): void {
    console.log(message, 'сообщение отправлено')
  }
  connect(config: unknown): void {
    console.log(config, 'WU подключено')
  }
  disconnect(): void {
    console.log('WU отключено')
  }
}

class NotificationSender {
  constructor(private provider: IProvider) {}

  send(config: unknown, message: string) {
    this.provider.connect(config)
    this.provider.sendMessage(message)
    this.provider.disconnect()
  }
}

class DelayedNotificationSender extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider)
  }

  delaySend(delay: number, config: unknown, message: string) {
    setTimeout(() => this.send(config, message), delay)
  }
}

const sender = new DelayedNotificationSender(new TelegrammProvider())
const sender2 = new DelayedNotificationSender(new WhatsUpProvider())
sender.delaySend(1000, 'config', 'message')
sender2.send('config', 'message')