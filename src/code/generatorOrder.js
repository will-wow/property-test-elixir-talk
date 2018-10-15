import * as jsc from "jsverify";

const arbitraryOrder = jsc.record({
  id: jsc.asciistring,
  userId: jsc.asciistring,
  limitPrice: arbitraryPositiveNumber,
  quantity: arbitraryPositiveNumber
});
