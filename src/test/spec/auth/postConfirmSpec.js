import {col, cols} from "../../../main/const/collections";
import ENV from "../../../env";
import jwt from "jsonwebtoken";
import {userStatus} from "../../../main/const/userStatus";
import sha1 from "sha1";

export const validConfirmSpec = {
    req: {
        url: `/api/confirm`,
        method: "POST",
        body: {
            t: jwt.sign({mail: "smedini@gmail.com"}, ENV.MAIL_CONFIG.welcomeTokenSecret, {expiresIn: "1d"}),
            fullname: "Slimane Médini",
            password: "tirlititi",
        }
    },
    res: {
        code: 200,
        body: null
    },
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                mail: "smedini@gmail.com",
                status: userStatus.WANT_SUSCRIBE,
                wantSuscribeDate: new Date()
            }
        },
        expected: {
            colname: cols.USER,
            doc: {
                mail: "smedini@gmail.com",
                fullname: "Slimane Médini",
                password: sha1("tirlititi"),
                status: userStatus.CONFIRMED
            }
        }
    }
};