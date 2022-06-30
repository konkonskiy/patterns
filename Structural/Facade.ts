class Notify {
  send(template: string, to: string) {
    console.log(`Отправляю ${template} ${to}`)
  }
}

class Log {
  log(message: string) {
    console.log(message)
  }
}

class Template {
  private templates = [{ name: 'other', template: '<h1>Шаблон!</h1>' }]

  getByName(name: string) {
    return this.templates.find((t) => t.name === name)
  }
}

class NotificationFacade {
    private notify: Notify
    private template: Template
    private log: Log

    constructor() {
        this.notify = new Notify()
        this.template = new Template()
        this.log = new Log()
    }

    send(to: string, tamplateName: string) {
        this.log.log('Отправляю')
        
        const currentTemplate = this.template.getByName(tamplateName)

        if (!currentTemplate) {
            this.log.log('Не найден шаблон')
            return
        }

        this.notify.send(currentTemplate.template, to)

        this.log.log('Отправил')
    }
}