(orderBook, orderType) => {
  const bestPrice = 
    findBestPrice(orderBook, orderType);

  _.forEach(orderBook.sell, order => {
      expect(order.limitPrice)
        .to.be.at.least(bestPrice);
  });
  return true;
};
