import {validId} from "../../const/validations";
import {remove} from "../../service/trunk/deleteTrunkService";

import {run} from '../../util/run'
import {Router} from "trees-express";
const router = Router();

module.exports = router;

router.delete('/api/trunk/:_id',
    validId,
    run(({_id})=>remove(_id))
);