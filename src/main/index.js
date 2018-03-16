#!/usr/bin/env node
import {createExpress, initExpress, listen} from "./express";
import {dbConnect} from "./db";
import {initServices} from "./services";

console.log("API starting...");

export const express = createExpress();

export const appPromise =
    dbConnect()
        .then(initServices)
        .then(() => initExpress(express))
        .then(() => listen(express))
        .then(() => console.log("API started."))
        .then(() => express);