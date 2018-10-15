import * as jsc from "jsverify";

describe("addition", () => {
  it("is commutative", () => {
    // True in ONE case
    expect(1 + 2).to.equal(2 + 1);
  });

  jsc.property(
    "commutative",
    jsc.number,
    jsc.number,
    // True in ALL cases
    (n1, n2) => n1 + n2 === n2 + n1
  );
});
