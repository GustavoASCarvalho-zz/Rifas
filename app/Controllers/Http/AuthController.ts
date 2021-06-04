import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'admin'])

    if (!this.validate(data, session, true)) {
      return response.redirect().back()
    }

    try {
      const user = await User.create(data)
      await auth.login(user, true)
    } catch (error) {
      return response.redirect().toRoute('auth.register')
    }
    response.redirect().toRoute('home.index')
  }

  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async verify({ request, response, session, auth }: HttpContextContract) {
    const data = request.only(['email', 'password', 'remember'])

    if (!this.validate(data, session, false)) {
      return response.redirect().back()
    }
    await auth.attempt(data.email, data.password, data.remember === 'true')

    response.redirect().toRoute('home.index')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    response.redirect().toRoute('home.index')
  }

  private async validate(data, session, registerOrLogin): Promise<Boolean> {
    const errors = {}

    if (registerOrLogin) {
      if (!data.name) {
        this.registerError(errors, 'name', 'Campo obrigatório')
      } else {
        if (data.name.lenght < 3) {
          this.registerError(errors, 'name', 'Nome precisa ter pelo menos 3 caracteres')
        }

        if (data.name.lenght > 25) {
          this.registerError(errors, 'name', 'Nome precisa ter no máximo 25 caracteres')
        }
      }
    }

    const usuarios = await User.query()

    for (const u of usuarios) {
      if (u.email === data.email) {
        this.registerError(errors, 'email', 'Email ja existe')
      }
    }

    if (!data.email) {
      this.registerError(errors, 'email', 'Campo obrigatório')
    }

    if (!data.password) {
      this.registerError(errors, 'password', 'Campo obrigatório')
    }

    if (Object.entries(errors).length > 0) {
      session.flash('errors', errors)
      session.flashAll()
      return false
    }
    return true
  }

  private registerError(errors, atribute, error) {
    if (!errors[atribute]) {
      errors[atribute] = []
    }
    errors[atribute].push(error)
  }
}
