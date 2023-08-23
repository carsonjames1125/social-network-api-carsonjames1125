// require express
const router = require('express').Router();
// gathering user routes
const userRoutes = require('./userRoutes');
//gathering thought routes
const thoughtRoutes = require('./thoughtRoutes');
//using the user routes
router.use('/users', userRoutes);
//using the thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;

