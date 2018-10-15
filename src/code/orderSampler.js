import * as jsc from "jsverify";

// Create a sampler with a static complexity
const orderSampler = jsc.sampler(arbitraryOrder, 5);

// Make it easier to use
const randomOrder = (overrides = {}) => _.merge(orderSampler(1), overrides);

// Generate some test data
randomOrder();
randomOrder({ limitPrice: 2 });
