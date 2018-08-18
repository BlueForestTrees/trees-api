import {validId, validPathId, validPathTrunkId, validTrunkId} from "../validations"
import {Router, run} from 'express-blueforest'
import {cols} from "../../const/collections"
import {col} from "mongo-registry/dist"
import configure from "items-service"

const router = Router()

module.exports = router

const rootService = configure(() => col(cols.ROOT))
const readRootTree = rootService.treeRead(cols.ROOT, "rootId")
const trunkService = configure(() => col(cols.TRUNK))

router.get('/api/root/:trunkId',
    validPathTrunkId,
    run(rootService.findMixin({trunkId: 0})),
    run(trunkService.append(
        "rootId",
        {name: 1, color: 1, 'quantity.g': 1},
        (root, rootTrunk) => ({
            linkId: root._id,
            _id: root.rootId,
            relativeTo: root.relativeTo,
            trunk: {
                name: rootTrunk.name,
                color: rootTrunk.color,
                quantity: {bqt: root.bqt, g: rootTrunk.quantity.g}
            }
        })
    ))
)

router.get('/api/root/tree/:trunkId',
    validTrunkId,
    run(readRootTree)
)