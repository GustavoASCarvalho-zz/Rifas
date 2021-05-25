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

    if (!this.validate(data, session)) {
      return response.redirect().back()
    }

    try {
      const user = auth.user

      const raffle = await user?.related('raffles').create(data)

      const type = await Type.query().where('id', data.typeId).firstOrFail()

      // eslint-disable-next-line no-array-constructor
      const tickets = Array()

      for (let i = 0, j = type.initialNumber; i < type.numberOfTickets; i++, j += type.step) {
        tickets.push({ number: j })
      }

      await raffle?.related('tickets').createMany(tickets)
    } catch (error) {
      return response.redirect().toRoute('raffles.create')
    }
    session.flash('notice', 'Rifa cadastrada com sucesso')
    response.redirect().toRoute('/')
  }

  public async show({ view, params }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    return view.render('raffles/show', { raffle })
  }

  public async edit({ view, params }: HttpContextContract) {
    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    const tickets = await raffle.related('tickets').query()

    return view.render('raffles/edit', { raffle, tickets })
  }

  public async update({ response, params, request, session }: HttpContextContract) {
    //const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    //const prizeDescriptionData = request.only(['description'])
    session.flash('notice', 'Rifa finalizada com sucesso')
    response.redirect().toRoute('/')
  }

  public async destroy({}: HttpContextContract) {}

  private validate(data, session): Boolean {
    const errors = {}

    if (!data.typeId || data.typeId !== Number) {
      this.registerError(errors, 'typeID', 'error')
    }

    if (!data.title || data.title !== String) {
      this.registerError(errors, 'title', 'error')
    }

    if (!data.ticketPrize || data.ticketPrize !== Number) {
      this.registerError(errors, 'ticketPrize', 'error')
    }

    if (!data.description || data.description !== String) {
      this.registerError(errors, 'description', 'error')
    }

    if (!data.probableRaffleDate) {
      this.registerError(errors, 'probableRaffleDate', 'error')
    }

    if (!data.initialSaleDate) {
      this.registerError(errors, 'initialSaleDate', 'error')
    }

    if (!data.endSaleDate) {
      this.registerError(errors, 'endSaleDate', 'error')
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
