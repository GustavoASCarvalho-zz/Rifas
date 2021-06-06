import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Raffle from 'App/Models/Raffle'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
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
          numberOfTickets++
        }
        if (numberOfTickets > 0) {
          userJoinRaffles.push(raffle)

          const secondsDiff = (raffle.raffleDate.getTime() - Date.now()) / 1000
          let timeTo
          console.log(secondsDiff / 3600)
          if (secondsDiff / 3600 > 24) {
            timeTo = `Faltam ${(secondsDiff / 3600 / 24).toFixed(1)} dias`
          } else {
            timeTo = `Faltam ${(secondsDiff / 3600 / 60).toFixed(1)} horas`
          }

          let aboutUser = {
            qtd: numberOfTickets,
            amountSpent: numberOfTickets * raffle.ticketPrize,
            timeToDoorPrizeInSeconds: timeTo,
          }
          arrayAboutUser.push(aboutUser)
        }
      }
    }

    const userRaffles = await user?.related('raffles').query()
    const users = await User.query()

    let finishedRaffles: Array<Raffle> = []

    for (const raffle of raffles) if (raffle.raffleDate) finishedRaffles.push(raffle)

    //rifas na qual o usuario participa

    return view.render('home/index', {
      raffles,
      userRaffles,
      finishedRaffles,
      users,
      userJoinRaffles,
      arrayAboutUser,
    })
  }
  public async about({ view }: HttpContextContract) {
    return view.render('home/about')
  }
}
