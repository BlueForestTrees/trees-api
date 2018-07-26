import {validId, validQt, validUnit} from "../../const/validations";
import {QT, UNIT} from "../../const/paths";

import {run} from '../../util/run'
import {loadNamedQuantifiedRoot, loadNamedUnquantifiedRoot, readRootTree} from "../../service/root/rootService";
import {Router} from "trees-express"; const router = Router();

module.exports = router;

router.get('/api/root/:_id',
    validId,
    run(({_id}) => loadNamedUnquantifiedRoot(_id))
);

router.get('/api/root/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => loadNamedQuantifiedRoot(qt, unit, _id))
);

router.get('/api/root/tree/:qt/:unit/:_id',
    validId,
    validQt(QT),
    validUnit(UNIT),
    run(({qt, unit, _id}) => readRootTree(qt, unit, _id))
);