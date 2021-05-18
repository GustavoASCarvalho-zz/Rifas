import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Raffle from './Raffle'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public raffle_id: number

  @column()
  public user_id: number

  @column()
  public number_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Raffle)
  public raffle: BelongsTo<typeof Raffle>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
