const mongoose = require('mongoose')
const credentials = require('./credentials')
const CONNECTION_STRING = credentials.mongoAtlas.connectionString

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise}
*/
module.exports.connect = async () => {
  // Bind connection to events (to get notifications).
  mongoose.connection.on('connected', () => console.log('\tMongoose connection is open.'))
  mongoose.connection.on('error', err => console.error(`\tMongoose connection error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('\tMongoose connection is disconnected.'))

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('\tMongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect(CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
