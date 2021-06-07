import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async store({ request, response, auth, session }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password', 'admin'])
    const users = await User.query()

    if ((await this.validateStore(data, session, users)) === false) {
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

    console.log(await User.query())

    if (!this.validateVerify(data, session)) {
      return response.redirect().back()
    }
    await auth.attempt(data.email, data.password, data.remember === 'true')

    response.redirect().toRoute('home.index')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    response.redirect().toRoute('home.index')
  }

  private async validateStore(data, session, users): Promise<Boolean> {
    const errors = {}

    if (!data.name) {
      this.registerError(errors, 'name', 'Campo obrigatório')
    } else if (data.name.length < 3) {
      this.registerError(errors, 'name', 'Nome precisa ter pelo menos 3 caracteres')
    } else if (data.name.length > 25) {
      this.registerError(errors, 'name', 'Nome precisa ter no máximo 25 caracteres')
    }

    if (!data.email) {
      this.registerError(errors, 'email', 'Campo obrigatório')
    } else {
      for (const u of users) {
        if (u.email === data.email) {
          this.registerError(errors, 'email', 'Email já cadastrado')
        }
      }
    }

    if (!data.password) {
      this.registerError(errors, 'password', 'Campo obrigatório')
    } else if (data.password.length < 3) {
      this.registerError(errors, 'password', 'Senha precisa ter pelo menos 3 caracteres')
    } else if (data.password.length > 16) {
      this.registerError(errors, 'password', 'Senha precisa ter no máximo 16 caracteres')
    }

    if (Object.entries(errors).length > 0) {
      session.flash('errors', errors)
      session.flashAll()
      return false
    }
    return true
  }

  private async validateVerify(data, session): Promise<Boolean> {
    const errors = {}

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
