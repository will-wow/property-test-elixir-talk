import * as jsc from "jsverify";

const arbitraryNonNegativeNumber = 
  jsc.number.smap(Math.abs, _.identity);

const arbitraryPositiveNumber = jsc.suchthat(
  arbitraryNonNegativeNumber,
  n => n > 0
);
