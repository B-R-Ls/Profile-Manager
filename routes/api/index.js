const router = require('express').Router();
const { Thoughts } = require('../../models');
const ThoughtRoutes = require('./thoughtRoutes');
const UserRoutes = require('./UserRoutes');

router.use('/thoughts', ThoughtRoutes);
router.use('/users', UserRoutes);

module.exports = router;