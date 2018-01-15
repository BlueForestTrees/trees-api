const _ = require('lodash');

const unit = (shortname, name, coef) =>
    ({
        shortname: shortname,
        name: name,
        coef: coef
    });

const grandeurs = {
    "Energie": [
        unit("kwh", "Watt-Heure", 0.23923445 * 3600 * 1000),
        unit("wh", "Watt-Heure", 0.23923445 * 3600),
        unit("ws", "Watt-Seconde", 0.23923445),
        unit("J", "joule", 0.23923445),
        unit("cal", "calorie", 1),
        unit("kcal", "kilo-calorie", 1000)
    ],
    "Densité": [
        unit("μmol", "micro-mole", 0.000001),
        unit("mmol", "milli-mole", 0.001),
        unit("mol", "mole", 1)
    ],
    "Nombre": [
        unit("", "", 1)
    ],
    "Volume": [
        unit("m3", "mètre-cube", 1),
        unit("L", "litre", 0.001),
        unit("goutte", "goutte", 0.001 * 20000)
    ],
    "Durée": [
        unit("sec", "seconde", 1),
        unit("min", "minute", 60),
        unit("h", "heure", 60 * 60),
        unit("j", "jour", 60 * 60 * 24),
        unit("mois", "mois", 60 * 60 * 24 * 30 * 355),
        unit("an", "année", 60 * 60 * 24 * 30 * 355 * 12)
    ],
    "Masse": [
        unit("g", "gramme", 1),
        unit("mg", "milligramme", 0.001),
        unit("kg", "kilogramme", 1000),
        unit("t", "tonne", 1000000)
    ],
    "Surface": [
        unit("m2", "mètre-carré", 1),
        unit("hec", "hectare", 10000)
    ],
    "Longueur": [
        unit("mm", "millimètre", 0.001),
        unit("cm", "centimètre", 0.01),
        unit("m", "mètre", 1),
        unit("km", "kilomètre", 1000)
    ],
    "Coût": [
        unit("€", "euro", 1)
    ]
};

const units = _.chain(grandeurs)
        .values()
        .flatten()
        .keyBy('shortname')
        .value();

module.exports = {
    grandeurs,
    grandeursKeys: Object.keys(grandeurs),
    shortnames: Object.keys(units)
};