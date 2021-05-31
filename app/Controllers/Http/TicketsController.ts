import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'
import Ticket from 'App/Models/Ticket'

export default class TicketsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ view, params }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    const tickets = await raffle.related('tickets').query()
    return view.render('tickets/show', { tickets })
  }

  public async buy({ params, response, auth }: HttpContextContract) {
    console.log(params)

    await Ticket.query().where('id', params.ticketId).update({ user_id: auth.user?.id })
    return response.redirect().back()
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
