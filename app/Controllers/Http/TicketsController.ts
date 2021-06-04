import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'
import Ticket from 'App/Models/Ticket'

export default class TicketsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ view, params, request, response }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    const allTickets = await raffle.related('tickets').query()

    // eslint-disable-next-line no-array-constructor
    const tickets = new Array()
    const pag = parseInt(request.qs().pag)
    const tam = allTickets.length / 100
    // eslint-disable-next-line no-array-constructor
    const nav = new Array()
    for (let i = 0; i < tam; i++) {
      nav.push(i)
    }

    for (let i = pag * 100 - 100; i < pag * 100; i++) {
      if (allTickets[i]) {
        tickets.push(allTickets[i])
      }
    }
    if (tickets.length === 0) {
      return response.redirect().back()
    }

    return view.render('tickets/show', { tickets, nav, pag, tam })
  }

  public async buy({ params, response, auth }: HttpContextContract) {
    await Ticket.query().where('id', params.ticketId).update({ user_id: auth.user?.id })
    return response.redirect().toRoute('tickets.show', { id: params.id, qs: { pag: 1 } })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
