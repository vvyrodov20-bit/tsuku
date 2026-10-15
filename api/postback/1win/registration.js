const handler = require('../1win');
module.exports = (req, res) => { req.postbackType = 'registration'; return handler(req, res); };
