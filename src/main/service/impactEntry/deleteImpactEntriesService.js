import {cols} from "../../const/collections";
import {col} from "../../db/db";

const impactEntries = () => col(cols.IMPACT_ENTRY);

export const purgeImpactsEntries = async () => impactEntries().deleteMany();