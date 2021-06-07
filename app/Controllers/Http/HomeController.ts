import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prize from 'App/Models/Prize'
import Raffle from 'App/Models/Raffle'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    const prizes = await Prize.query()
    const user = auth.user
    let raffles2: Array<Raffle> = []
    let userJoinRaffles: Array<Raffle> = []
    let arrayAboutUser: Array<Object> = []

    const raffles = await Raffle.query()
    if (user?.id) {
      raffles2 = await Raffle.query().preload('tickets', (ticketQuery) => {
        ticketQuery.where('userId', user.id)
      })

      let numberOfTickets = 0

      for (const raffle of raffles2) {
        numberOfTickets = 0
        for (const ticket of raffle.tickets) {
          ticket.$options
          numberOfTickets++
        }
        if (numberOfTickets > 0) {
          userJoinRaffles.push(raffle)

          const secondsDiff = (raffle.raffleDate.getTime() - Date.now()) / 1000
          let timeTo
          if (secondsDiff >= 0) {
            if (secondsDiff / 3600 > 24) {
              timeTo = `${(secondsDiff / 3600 / 24).toFixed(1)} dias`
            } else if (secondsDiff / 3600 < 1) {
              timeTo = `${(secondsDiff / 60).toFixed(1)} minutos`
            } else {
              timeTo = `${(secondsDiff / 3600).toFixed(1)} horas`
            }
          }

          let aboutUser = {
            raffleId: raffle.id,
            qtd: numberOfTickets,
            amountSpent: numberOfTickets * raffle.ticketPrize,
            timeToDoorPrize: timeTo,
          }
          arrayAboutUser.push(aboutUser)
        }
      }
    }

    const userRaffles = await user?.related('raffles').query()
    const users = await User.query()

    let finishedRaffles: Array<Raffle> = []
    let timeToRaffleDate: Array<Object> = []

    for (const raffle of raffles) {
      if (raffle.raffleDate) {
        finishedRaffles.push(raffle)
        const secondsDiff = (raffle.raffleDate.getTime() - Date.now()) / 1000
        let timeTo
        if (secondsDiff >= 0) {
          if (secondsDiff / 3600 > 24) {
            timeTo = `${(secondsDiff / 3600 / 24).toFixed(1)} dias`
          } else if (secondsDiff / 3600 < 1) {
            timeTo = `${(secondsDiff / 60).toFixed(1)} minutos`
          } else {
            timeTo = `${(secondsDiff / 3600).toFixed(1)} horas`
          }
        }

        let obj = {
          raffleId: raffle.id,
          time: timeTo,
        }
        timeToRaffleDate.push(obj)
      }
    }

    //rifas na qual o usuario participa

    return view.render('home/index', {
      raffles,
      userRaffles,
      finishedRaffles,
      users,
      userJoinRaffles,
      arrayAboutUser,
      prizes,
      timeToRaffleDate,
    })
  }
  public async about({ view }: HttpContextContract) {
    return view.render('home/about')
  }
}
