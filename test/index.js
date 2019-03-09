// @flow

const A1 = require('./A');
const A2 = require('@wbinnssmith/test/A');

let a1: A1 = new A1();
let a2: A2 = a1;

console.log(A1 === A2)