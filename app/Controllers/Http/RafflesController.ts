import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'

export default class RafflesController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ view, params }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    return view.render('raffles/show', { raffle })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

//const raffle = await Raffle.query().where('id', params.id)
