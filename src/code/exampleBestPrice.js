const orderBook = {
  buy: [lowBuyOrder, highBuyOrder],
  sell: [lowSellOrder, highSellOrder]
};

it("is the lowest price for sells", () => {
  expect(findBestPrice(orderBook, "sell"))
    .to.eq(lowSellOrder.limitPrice);
});

it("is the highest price for buys", () => {
  expect(findBestPrice(orderBook, "buy"))
    .to.eq(highBuyOrder.limitPrice);
});
