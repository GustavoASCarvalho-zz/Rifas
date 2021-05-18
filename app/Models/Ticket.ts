import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  column,
  BelongsTo,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Raffle from './Raffle'
import Prize from './Prize'

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

  @hasOne(() => User)
  public userHasOne: HasOne<typeof User>

  @hasOne(() => Raffle)
  public raffleHasOne: HasOne<typeof Raffle>

  @hasMany(() => Prize)
  public prizes: HasMany<typeof Prize>
}
