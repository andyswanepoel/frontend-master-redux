import { compose } from "redux";

const makeLouder = string => string.toUpperCase();
const repeatThreeTimes = string => string.repeat(3);
const embolden = string => string.bold();

// What if we wanted to do all three functions?
// We could call one, pass that value to another, etc.

const doItAll = string => embolden(repeatThreeTimes(makeLouder(string)));

console.log("### vanilla: ", doItAll("hello"));

// ooooorrrrr, we can use compose which will create a new function from the other functions

const doItAllWithCompose = compose(embolden, repeatThreeTimes, makeLouder);

console.log("### with compose: ", doItAllWithCompose("hello"));

const one = string => string + "1";
const two = string => string + "2";

const composedOneAndTwo = compose(two, one);

console.log(composedOneAndTwo("hello"));
