const handler = require('../1win');
module.exports = (req, res) => { req.postbackType = 'first_deposit'; return handler(req, res); };
