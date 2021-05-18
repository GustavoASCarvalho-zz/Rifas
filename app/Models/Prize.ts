import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Raffle from './Raffle'
import Ticket from './Ticket'

export default class Prize extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public raffleId: number

  @column()
  public description: string

  @column()
  public placing: number

  @column()
  public winningTicketId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Raffle)
  public raffle: BelongsTo<typeof Raffle>

  @belongsTo(() => Ticket)
  public ticket: BelongsTo<typeof Ticket>
}
