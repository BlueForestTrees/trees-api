import {EITHER_OR, IS_PRESENT_VALID_FOUND} from "../../const/messages";
import {validTreeId} from "../../const/validations";

const run = require('../../util/run');
const runraw = require('../../util/runraw');
const _ = require('lodash');
const router = require('express').Router();
const {check, oneOf} = require('express-validator/check');
const units = require('../../service/grandeurs');
const trunks = require('../../service/trunks');

module.exports = router;

router.post('/api/trunks/all',
    runraw(trunks.putall)
);

router.post('/api/trunk',
    [
        check('name').optional().matches(/^.+/),
        check('sourceId', IS_PRESENT_VALID_FOUND).optional().isMongoId().custom(trunks.contains),

        oneOf([
            [check('name').exists(), check('sourceId').not().exists()],
            [check('name').not().exists(), check('sourceId').exists()]
        ],EITHER_OR)
    ],
    run(trunks.createOrClone)
);

router.post('/api/trunk/facet',
    [
        validTreeId,
        check('facet._id').isMongoId(),
        check('facet.qt').isDecimal(),
        check('facet.unit').isIn(units.shortnames),
        check('facet.name').matches(/^.+/)
    ],
    run(trunks.addFacet)
);

router.post('/api/trunk/price',
    [
        validTreeId,
        check('price').isDecimal()
    ],
    run(trunks.upsertPrice)
);

router.post('/api/trunk/quantity',
    [
        validTreeId,
        check('quantity.qt').isDecimal(),
        check('quantity.unit').isIn(units.shortnames)
    ],
    run(trunks.upsertQuantity)
);