/**
 * Should be on gitignore file
 */

const credentials = {
  mongoAtlas: {
    connectionString: 'YOU-URL-FROM-MONGODB'
  },
  cookieSettings: {
    cookieSecret: 'YOUR-COOKIE-SECRET',
    cookieName: 'GristCookie'
  },
  port: 3000
}
module.exports = credentials
