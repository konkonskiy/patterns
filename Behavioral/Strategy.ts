class User {
  GHToken: string
  jwtToken: string
}

interface AuthStrategy {
  auth(user: User): boolean
}

class Auth {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy
  }

  public authUser(user: User): boolean {
    return this.strategy.auth(user)
  }
}

class JWTStrategy implements AuthStrategy {
  auth(user: User): boolean {
    return Boolean(user.jwtToken)
  }
}

class GHStrategy implements AuthStrategy {
  auth(user: User): boolean {
    return Boolean(user.GHToken)
  }
}

const user = new User()
user.jwtToken = 'token'
const auth = new Auth(new JWTStrategy())
auth.authUser(user)
user.jwtToken = ''
auth.authUser(user)
user.GHToken = 'token'
auth.setStrategy(new GHStrategy())
auth.authUser(user)
