import {validId, validQt, validUnit} from "../../const/validations";
import {QT, UNIT} from "../../const/paths";

import {run} from 'trees-express'
import {loadImpact, loadQuantifiedImpacts} from "../../service/impact/getImpactService";
import {Router} from "trees-express";
import {appendImpactInfos} from "../../service/impactEntry/getImpactEntryService";

const router = Router();

module.exports = router;

router.get('/api/impact/:_id',
    validId,
    run(({_id}) => loadImpact(_id)),
    run(appendImpactInfos)
);

router.get('/api/impact/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => loadQuantifiedImpacts({qt, unit}, _id)),
    run(appendImpactInfos)
);