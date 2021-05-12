import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
