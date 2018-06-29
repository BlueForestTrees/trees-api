import {getAllImpactEntries, getImpactEntryByName, searchImpactEntriesByNamepart} from "../../service/impactEntry/getImpactEntryService";

import {run} from '../../util/run'
const router = require('express').Router();
const {check} = require('express-validator/check');

module.exports = router;

router.get('/api/impactEntry/all',
    run(getAllImpactEntries)
);

router.get('/api/impactEntry',
    check('q').exists(),
    run(({q}) => searchImpactEntriesByNamepart(q))
);

router.get('/api/impactEntry/:name',
    run(({name}) => getImpactEntryByName(name))
);