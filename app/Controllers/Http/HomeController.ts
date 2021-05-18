import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'

export default class HomeController {
  public async index({ view }: HttpContextContract) {
    const raffles = await Raffle.query()
    return view.render('home/index', { raffles })
  }
  public async about({ view }: HttpContextContract) {
    return view.render('home/about')
  }
}
