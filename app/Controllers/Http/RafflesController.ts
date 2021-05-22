import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'
import Type from 'App/Models/Type'

export default class RafflesController {
  public async index({}: HttpContextContract) {}

  public async create({ view }: HttpContextContract) {
    const types = await Type.query()
    return view.render('raffles/create', { types })
  }

  public async store({ response, request, session, auth }: HttpContextContract) {
    const data = await request.only([
      'typeId',
      'title',
      'ticketPrize',
      'description',
      'probableRaffleDate',
      'initialSaleDate',
      'endSaleDate',
    ])

    try {
      const user = auth.user

      const raffle = await user?.related('raffles').create(data)

      const type = await Type.query().where('id', data.typeId).firstOrFail()

      // eslint-disable-next-line no-array-constructor
      const tickets = Array()

      for (let i = type.initialNumber; i <= type.numberOfTickets; i += type.step) {
        tickets.push({ number: i })
      }

      await raffle?.related('tickets').createMany(tickets)
    } catch (error) {
      session.flash('errors', 'Erro no cadastro. Verifique suas informações.')
      console.log(error)

      return response.redirect().toRoute('raffles.create')
    }
    response.redirect().toRoute('/')
  }

  public async show({ view, params }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    return view.render('raffles/show', { raffle })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
