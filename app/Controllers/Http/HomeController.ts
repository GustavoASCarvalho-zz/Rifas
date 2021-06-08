import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prize from 'App/Models/Prize'
import Raffle from 'App/Models/Raffle'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    const prizes = await Prize.query()
    const raffles = await Raffle.query()
    const user = auth.user
    const users = await User.query()

    let rafflesTickets: Array<Raffle> = []
    let userJoinRaffles: Array<Raffle> = []
    let userAbout: Array<Object> = []
    let timeToRaffleDate: Array<Object> = []
    let raffleAbout = {
      haveRaffles: false,
      userHaveRaffles: false,
      userJoinRaffles: false,
    }

    // tickets em que o usuario participa

    if (user?.id) {
      rafflesTickets = await Raffle.query().preload('tickets', (ticketQuery) => {
        ticketQuery.where('userId', user.id)
      })

      let numberOfTickets = 0

      for (const raffle of rafflesTickets) {
        numberOfTickets = 0
        for (const ticket of raffle.tickets) {
          ticket.$options
          numberOfTickets++
        }
        if (numberOfTickets > 0) {
          userJoinRaffles.push(raffle)
          raffleAbout.userJoinRaffles = true
          let obj = {
            raffleId: raffle.id,
            qtd: numberOfTickets,
            amountSpent: numberOfTickets * raffle.ticketPrize,
          }
          userAbout.push(obj)
        }
      }
    }

    //rifas

    for (const raffle of raffles) {
      if (user?.id === raffle.userId) raffleAbout.userHaveRaffles = true
      if (raffle.raffleDate) {
        if (
          new Date(raffle.endSaleDate).getTime() >= Date.now() &&
          Date.now() >= new Date(raffle.initialSaleDate).getTime()
        ) {
          raffleAbout.haveRaffles = true
        }

        const secondsDiffRD = (raffle.raffleDate.getTime() - Date.now()) / 1000 //Raffle data
        const secondsDiffESD = (raffle.endSaleDate.getTime() - Date.now()) / 1000 // End Sale Date
        let obj = {
          raffleId: raffle.id,
          timeEndSaleDate: {
            days: (secondsDiffESD / 86400).toFixed(0),
            hours: (secondsDiffESD / 3600).toFixed(0),
            minutes: (secondsDiffESD / 60).toFixed(0),
            seconds: secondsDiffESD.toFixed(0),
          },
          timeRaffleDate: {
            days: (secondsDiffRD / 86400).toFixed(0),
            hours: (secondsDiffRD / 3600).toFixed(0),
            minutes: (secondsDiffRD / 60).toFixed(0),
            seconds: secondsDiffRD.toFixed(0),
          },
        }
        timeToRaffleDate.push(obj)
      } else {
        const secondsDiffESD = (raffle.endSaleDate.getTime() - Date.now()) / 1000 // End Sale Date
        let obj = {
          raffleId: raffle.id,
          timeEndSaleDate: {
            days: (secondsDiffESD / 86400).toFixed(0),
            hours: (secondsDiffESD / 3600).toFixed(0),
            minutes: (secondsDiffESD / 60).toFixed(0),
            seconds: secondsDiffESD.toFixed(0),
          },
        }
        timeToRaffleDate.push(obj)
      }
    }

    return view.render('home/index', {
      raffles,
      users,
      prizes,
      userJoinRaffles,
      userAbout,
      timeToRaffleDate,
      raffleAbout,
    })
  }
  public async about({ view }: HttpContextContract) {
    return view.render('home/about')
  }
}

/*
 private time = (raffle) => {
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
    return timeTo
  }
  
  */
