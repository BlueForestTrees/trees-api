import _ from 'lodash'
import {qtUnitCoef, sameGrandeur, toBaseQuantity} from "../service/grandeur/grandeursService";
import {GrandeurMismatchError} from "../exceptions/Errors";

export const erreurSiUnitIncompatibles = (quantity, roots) => {
    const leftUnit = quantity.unit;
    const rightUnit = roots.quantity && roots.quantity.unit;
    const same = sameGrandeur(leftUnit, rightUnit);

    if (leftUnit && rightUnit && !same) {
        throw new GrandeurMismatchError(leftUnit, rightUnit);
    }

    return roots;
};


export const applyQuantity = (quantity, target) => {
    const coef = qtUnitCoef(quantity, target.quantity);
    target.quantity = quantity;

    target.items = coef ?
        _.map(target.items, item => item.quantity ? (item.quantity.qt *= coef) && item : _.omit(item, "quantity"))
        :
        _.map(target.items, item => _.omit(item, "quantity"));

    return target;
};

export const flatten = arr =>
    arr.reduce((flat, toFlatten) =>
        flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);

export const quantified = items => _.some(items, item => !_.isNil(item.quantity));

export const summify = items => _(items)
    .groupBy("_id")
    .map(sum)
    .value();

export const sum = toSumItems => _(toSumItems)
    .map(basifyQuantity)
    .reduce(mergeItems);

export const basifyQuantity = toBasifyItem => {
    toBasifyItem.quantity && (toBasifyItem.quantity = toBaseQuantity(toBasifyItem.quantity));
    return toBasifyItem;
};

export const mergeItems = (left, right) => {
    return left.quantity && right.quantity ?
        (left.quantity.qt += right.quantity.qt) && left
        :
        left.quantity ? left : right;
};