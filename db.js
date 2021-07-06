var path = require('path')
var Datastore = require('nedb')

module.exports.account = new Datastore({ filename: path.join(__dirname +'/db/account.db'), autoload: true });
module.exports.message = new Datastore({ filename: path.join(__dirname +'/db/message.db'), autoload: true });