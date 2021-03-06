import {
    validOptionalBodyBqtG,
    validOptionalBodyName,
    validUser, validOwner, set, validId,
    validOptionalComment, validOptionalOrigin, validOptionalSource
} from "../../validations"
import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {createSender} from "simple-rbmq"
import ENV from "../../env"
import {col} from "mongo-registry"
import {cols} from "../../collections"

const router = Router()
module.exports = router

router.put('/api/tree/trunk',
    validId,
    validOptionalBodyName,
    validOptionalBodyBqtG,
    validOptionalSource,
    validOptionalOrigin,
    validOptionalComment,
    validUser,
    validOwner(col(cols.TRUNK)),
    run(set("date", () => new Date())),
    run(createSender(ENV.RB.exchange, ENV.RK_TRUNK_UPSERT))
)