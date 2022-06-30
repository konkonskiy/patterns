interface Middleware {
  next(mid: Middleware): Middleware
  handle(request: any): any
}

abstract class AbstractMiddleware implements Middleware {
  private nextMiddleware: Middleware // Запоминаем следующую мидлвару

  next(mid: Middleware): Middleware {
    this.nextMiddleware = mid // Запоминаем следующую мидлвару
    return mid
  }

  handle(request: any) {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request) // Вызываем следующую мидлвару
    }

    return
  }
}

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log('AuthMiddleWare')
    if (request.userId === 1) {
      return super.handle(request) // При успешной отработке мидлвары через супер передаем управление другой мидлваре
    }
    return { error: 'Вы не авторизованы' }
  }
}

class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any) {
    console.log('ValidateMiddleware')
    if (request.body) {
      return super.handle(request)
    }
    return { error: 'Нету boody' }
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any) {
    console.log('Controller')
    return { success: request }
  }
}
const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();


auth.next(validate).next(controller)

console.log(auth.handle({
    userId: 1,
    body: 'body',
}))