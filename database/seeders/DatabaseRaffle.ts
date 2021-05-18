import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Type from 'App/Models/Type'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class DatabaseRaffleSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      admin: true,
    })

    await Type.create({
      description: 'Imoveis',
      initialNumber: 1,
      step: 1,
      numberOfTickets: 3,
    })

    const raffle = await user.related('raffles').create({
      typeId: 1,
      title: 'Rifa da igreja',
      description: 'para reforma-la',
      probableRaffleDate: DateTime.now(),
      initialSaleDate: DateTime.now(),
      endSaleDate: DateTime.now(),
      ticketPrize: 29.99,
    })

    await user.related('raffles').create({
      typeId: 1,
      title: 'Rifa do parque',
      description: 'precisamos de dinheiro para reformar o nosso querido parque central',
      probableRaffleDate: DateTime.now(),
      initialSaleDate: DateTime.now(),
      endSaleDate: DateTime.now(),
      ticketPrize: 29.99,
    })

    await user.related('raffles').create({
      typeId: 1,
      title: 'Rifas são joão',
      description: 'Grandiosos premios no nosso evento de são joão',
      probableRaffleDate: DateTime.now(),
      initialSaleDate: DateTime.now(),
      endSaleDate: DateTime.now(),
      ticketPrize: 29.99,
    })

    await user.related('raffles').create({
      typeId: 1,
      title: 'Rifa do Colégio São Miguel',
      description: 'Ajude nós formandos a cumprir nossa meta!',
      probableRaffleDate: DateTime.now(),
      initialSaleDate: DateTime.now(),
      endSaleDate: DateTime.now(),
      ticketPrize: 21.99,
    })

    await raffle.related('prizes').create({
      description: '10kg carne',
      placing: 1,
    })

    await raffle.related('prizes').create({
      description: '1kg carne',
      placing: 2,
    })

    await raffle
      .related('tickets')
      .createMany([{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }])

    const user1 = await User.create({
      name: 'joao',
      email: 'joao@gmail.com',
      password: '123',
    })

    user1.related('tickets').createMany([
      { raffleId: 1, number: 1 },
      { raffleId: 1, number: 2 },
    ])
  }
}
