const handler = require('../1win');
module.exports = (req, res) => { req.postbackType = 'redeposit'; return handler(req, res); };
