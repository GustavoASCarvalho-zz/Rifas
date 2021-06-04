import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    if (auth.isLoggedIn) {
      const user = auth.user
      console.log(user?.$hasRelated('raffles'))
    }
    const raffles = await Raffle.query()
    return view.render('home/index', { raffles })
  }
  public async about({ view }: HttpContextContract) {
    return view.render('home/about')
  }
}
