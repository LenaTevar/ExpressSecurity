'use strict'
const gristController = {}
module.exports = gristController
const Gist = require('../models/gist')
/**
 * Shows landing page for all users
 */
gristController.index = async (request, response) => {
  const data = {
    myGists: (await Gist.find({}))
      .map(aGist => ({
        id: aGist._id,
        title: aGist.title,
        content: aGist.content,
        contentShort: aGist.content.substring(0, 60),
        author: aGist.author,
        tags: aGist.tags
      }))
  }

  data.tags = await getTags()
  response.render('grist/public/landing', { data })
}

gristController.oneCard = async (request, response) => {
  const data = await Gist.findById(request.params.id).exec()
  response.render('grist/public/gist', { data })
}

gristController.indexByTag = async (request, response) => {
  const data = {
    myGists: (await Gist.find({ tags: request.params.tag }))
      .map(aGist => ({
        id: aGist._id,
        title: aGist.title,
        content: aGist.content,
        contentShort: aGist.content.substring(0, 60),
        author: aGist.author,
        tags: aGist.tags
      }))
  }
  data.tags = await getTags()

  response.render('grist/public/landing', { data })
}

async function getTags () {
  const allgists = await Gist.find({})
  const tags = new Set()
  allgists.forEach(aGist => {
    aGist.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  return tags
}
