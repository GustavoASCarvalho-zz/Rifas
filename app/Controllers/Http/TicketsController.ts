import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'
import Ticket from 'App/Models/Ticket'
import User from 'App/Models/User'

export default class TicketsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ view, params, request }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    const users = await User.query()
    let pag = request.input('pag', 1)
    const limit = 100

    const tam = (await raffle.related('tickets').query()).length / limit

    const tickets = await raffle.related('tickets').query().paginate(pag, limit)
    pag = parseInt(pag)
    return view.render('tickets/show', { tickets, pag, tam, users })
  }

  public async buy({ params, response, auth }: HttpContextContract) {
    await Ticket.query().where('id', params.ticketId).update({ user_id: auth.user?.id })
    return response.redirect().toRoute('tickets.show', { id: params.id, qs: { pag: 1 } })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
