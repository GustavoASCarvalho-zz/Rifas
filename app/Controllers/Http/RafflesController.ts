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

  public async update({ response, request, session, params }: HttpContextContract) {
    const data = await request.all()
    let tam = 0
    // eslint-disable-next-line no-array-constructor
    const premios = new Array()
    for (const key in data) {
      tam++
    }
    for (let i = 2; i < tam; i++) {
      const premio = { description: data[`prize${i - 1}`], placing: i - 1 }
      if (premio.description && premio.placing) {
        premios.push(premio)
      }
    }
    console.log(premios)

    if (!this.validateEdit(data, session)) {
      return response.redirect().back()
    }
    console.log('validou')

    const raffle = await Raffle.query().where('id', params.id).firstOrFail()
    await Raffle.query().where('id', params.id).update({ raffle_date: data.raffleDate })
    await raffle.related('prizes').createMany(premios)

    session.flash('notice', 'Rifa finalizada com sucesso')
    response.redirect().toRoute('/')
  }

  public async destroy({}: HttpContextContract) {}

  private validate(data, session): Boolean {
    const errors = {}

    if (!data.typeId) {
      this.registerError(errors, 'typeID', 'Campo obrigatório')
    } else {
      if (isNaN(data.typeId)) {
        this.registerError(errors, 'typeID', 'Valor inválido')
      }
    }

    if (!data.title) {
      this.registerError(errors, 'title', 'Campo obrigatório')
    } else {
      if (data.title.length < 3) {
        this.registerError(errors, 'title', 'Nome precisa ter pelo menos 3 caracteres')
      }

      if (data.title.length > 20) {
        this.registerError(errors, 'title', 'Nome precisa ter no máximo 20 caracteres')
      }
    }

    if (!data.ticketPrize) {
      this.registerError(errors, 'ticketPrize', 'Campo obrigatório')
    } else {
      if (isNaN(data.ticketPrize)) {
        this.registerError(errors, 'ticketPrize', 'Preço precisa ser um número')
      }
    }

    if (!data.probableRaffleDate) {
      this.registerError(errors, 'probableRaffleDate', 'Campo obrigatório')
    }

    if (!data.initialSaleDate) {
      this.registerError(errors, 'initialSaleDate', 'Campo obrigatório')
    }

    if (!data.endSaleDate) {
      this.registerError(errors, 'endSaleDate', 'Campo obrigatório')
    }

    if (data.initialSaleDate > data.endSaleDate) {
      this.registerError(errors, 'initialSaleDate', 'Data inicial deve ser antes da data final')
    }

    if (Object.entries(errors).length > 0) {
      session.flash('errors', errors)
      session.flashAll()
      return false
    }
    return true
  }

  private validateEdit(data, session): Boolean {
    const errors = {}

    if (!data.raffleDate) {
      this.registerError(errors, 'raffleDate', 'Campo obrigatório')
    }

    if (!data.prize1) {
      this.registerError(errors, 'prize', 'Campo obrigatório')
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
