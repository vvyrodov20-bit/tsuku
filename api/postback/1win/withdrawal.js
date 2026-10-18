const handler = require('../1win');
module.exports = (req, res) => { req.postbackType = 'withdrawal'; return handler(req, res); };
