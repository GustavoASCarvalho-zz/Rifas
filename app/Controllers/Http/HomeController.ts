import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    const raffles = await Raffle.query()
    const userRaffles = await auth.user?.related('raffles').query()
    const users = await User.query()
    // eslint-disable-next-line no-array-constructor
    const finishedRaffles = new Array()

    for (const raffle of raffles) if (raffle.raffleDate) finishedRaffles.push(raffle)

    return view.render('home/index', { raffles, userRaffles, finishedRaffles, users })
  }
  public async about({ view }: HttpContextContract) {
    return view.render('home/about')
  }
}
