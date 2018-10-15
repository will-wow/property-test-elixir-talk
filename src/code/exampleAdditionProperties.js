it("is commutative", () => {
  expect(1 + 2).to.equal(2 + 1);
});

it("is associative", () => {
  expect(1 + (2 + 3)).to.equal((1 + 2) + 3);
});

it("has identity", () => {
  expect(1 + 0).to.equal(1);
});
