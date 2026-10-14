const handler = require('../1win');
module.exports = (req, res) => { req.postbackType = 'all_deposits'; return handler(req, res); };
