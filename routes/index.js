const router = require('express').Router();

// need to import all routes for the application 

const apiRoutes = require('./api');

// tell the application to use the routes

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Worng Route!'));

module.exports = router;