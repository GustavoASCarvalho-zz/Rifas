import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndicesController {
  public async index({ view }: HttpContextContract) {
    return view.render('about/about')
  }
}
