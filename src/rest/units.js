const express = require('express');
const router = express.Router();
const json = require('./util/run');
const units = require('../service/units');

router.get('/api/units', json(async () => {
    return units.all();
}));

module.exports = router;