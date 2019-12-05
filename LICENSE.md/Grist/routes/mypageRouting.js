const myPageRouting = require('express').Router()
module.exports = myPageRouting
const authGuard = require('../controllers/authGuard')
const UserController = require('../controllers/userController')
const GistController = require('../controllers/gistController')

myPageRouting.all('*', authGuard.guardRoute)
myPageRouting.route('/create')
  .get(GistController.add)
  .post(GistController.addPOST)
myPageRouting.route('/delete/:id')
  .get(GistController.delete)
myPageRouting.route('/')
  .get(UserController.myPage)
