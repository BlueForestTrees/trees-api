const express = require('express');
const router = express.Router();
const run = require('../../util/run');
const {grandeurs} = require('../../service/grandeurs');

router.get('/api/grandeurs',
    run(() => grandeurs)
);

module.exports = router;