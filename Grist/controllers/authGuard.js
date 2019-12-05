const authGuard = {}
module.exports = authGuard

authGuard.guard = async (request, response, callback) => {
  if (!request.session.authGuard) {
    request.session.flash = { type: 'danger', text: 'Unauthorized, please log in' }
    response.status(403).redirect('/')
  } else {
    callback(request, response)
  }
}

authGuard.guardRoute = function (request, response, next) {
  if (!request.session.authGuard) {
    request.session.flash = { type: 'danger', text: 'Unauthorized, please log in' }
    response.status(403).redirect('/')
  } else {
    next()
  }
}

authGuard.guardRoute = async (request, response, next) => {
  if (request.session.authGuard) { return next() }
  response.render('grist/public/login', {
    validationErrors: ['Please Log into your account'],
    value: request.body
  })
}
/*
// In userController
userController.authorization = function (req, res, next) {
  // Do authorization check here
  next()
} */
