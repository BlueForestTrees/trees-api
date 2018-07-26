import {getGrandeurs} from "trees-units";

import {Router} from "trees-express";
const router = Router();
import {run} from '../../util/run'

router.get('/api/grandeurs',
    run(getGrandeurs)
);

module.exports = router;