'use strict'
const Gist = require('../models/gist')

const GistController = {}
module.exports = GistController
GistController.add = async (request, response) => {
  response.render('grist/member/create')
}
GistController.addPOST = async (request, response) => {
  const myPlainTags = request.body.tags.split(',')
  try {
    const myPlainGist = new Gist({
      title: request.body.title,
      content: request.body.content,
      tags: myPlainTags,
      author: request.session.authGuard.username
    })

    await myPlainGist.save()

    request.session.flash = { type: 'success', text: 'success' }
    response.redirect('/mypage')
  } catch (error) {
    return response.render('', {
      validationErrors: [error.message] || [error.errors.value.message],
      value: request.body
    })
  }
}

GistController.delete = async (request, response) => {
  Gist.findByIdAndRemove(request.params.id).exec()
  response.redirect('/mypage')
}
