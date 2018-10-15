import * as jsc from "jsverify";

const arbitraryOrderBook = jsc.record({
  buy: jsc.array(arbitraryOrder),
  sell: jsc.array(arbitraryOrder)
});
