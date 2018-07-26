import {valid} from "../../const/validations";
import {cols} from "../../const/collections";
import {col} from "trees-db-version/dist";
import configure from "trees-items-service";

import {run} from '../../util/run'
const router = require("trees-express").Router();

const deleteBranch = configure(() => col(cols.BRANCH)).removeItem;

module.exports = router;

router.delete('/api/branch/:trunkId/:branchId',
    valid("trunkId"),
    valid("branchId"),
    run(({trunkId, branchId}) => deleteBranch(trunkId, branchId))
);