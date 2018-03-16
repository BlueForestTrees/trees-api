import {cols} from "../../const/collections";
import {col} from "../../db";
import configure from "trees-items-service";

const run = require('../../util/run');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');

const deleteFacets = configure(() => col(cols.FACET)).deleteItems;
module.exports = router;

router.post('/api/facet/deletion',
    [
        check('treeId').exists().isMongoId(),
        check('facetIds.*').exists().isMongoId()
    ],
    run(({treeId, facetIds}) => deleteFacets(treeId, facetIds))
);