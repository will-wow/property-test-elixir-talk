describe("addition", () => {
  it("adds small numbers", () => {
    expect(1 + 2).to.equal(3);
  });

  it("adds large numbers", () => {
    expect(100 + 200).to.equal(300);
  });

  it("adds zero", () => {
    expect(1 + 0).to.equal(0);
  });
});
