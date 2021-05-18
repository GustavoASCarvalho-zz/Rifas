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
import Type from './Type'
import Prize from './Prize'
import Ticket from './Ticket'

export default class Raffle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public typeId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public likelyRaffleDate: DateTime

  @column()
  public initial_sale_date: DateTime

  @column()
  public end_sale_date: DateTime

  @column()
  public raffle_date: DateTime

  @column()
  public ticket_prize: Float32Array

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public userBelongsTo: BelongsTo<typeof User>

  @belongsTo(() => Type)
  public typeBelongsTo: BelongsTo<typeof Type>

  @hasOne(() => User)
  public userHasOne: HasOne<typeof User>

  @hasOne(() => Type)
  public typeHasOne: HasOne<typeof Type>

  @hasMany(() => Prize)
  public prizes: HasMany<typeof Prize>

  @hasMany(() => Ticket)
  public tickets: HasMany<typeof Ticket>
}
