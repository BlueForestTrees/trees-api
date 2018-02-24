import {debug} from "./debug";

const {validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

module.exports = run;

function run(work) {


    let validResultJson = async (req, res, next) => {
        validationResult(req).throw();
        let result = await work(matchedData(req), req, res, next);
        res.json(result);

        debug("result", result);
    };

    return (req, res, next) => {

        debug("run", {url:`${req.method} ${req.url}`}, {params:req.params},{body: req.body});

        let result = validResultJson(req, res, next);
        Promise
            .resolve(result)
            .catch(err=>{
                return next(err);
            });
    };
}
