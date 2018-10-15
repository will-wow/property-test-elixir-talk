import "mocha";
import * as jsc from "jsverify";
import * as _ from "lodash";
import { expect } from "chai";

import {
  OrderBook,
  Order,
  OrderType,
  findNaiveBestPrice,
  findBestPrice,
  safeFindNaiveBestPrice
} from "./order-book";

import * as Generators from "./generators";

const highSellOrder: Order = {
  id: "abc",
  userId: "sam",
  quantity: 2,
  limitPrice: 5
};

const lowSellOrder: Order = {
  id: "def",
  userId: "sally",
  quantity: 2,
  limitPrice: 3
};

const lowBuyOrder: Order = {
  id: "ghi",
  userId: "bob",
  quantity: 2,
  limitPrice: 3
};

const highBuyOrder: Order = {
  id: "jkl",
  userId: "beth",
  quantity: 2,
  limitPrice: 5
};

describe("best price", () => {
  let orderBook: OrderBook;

  describe("given an orderbook", () => {
    beforeEach(() => {
      orderBook = {
        buy: [lowBuyOrder, highBuyOrder],
        sell: [lowSellOrder, highSellOrder]
      };
    });

    it("is the lowest price for sells", () => {
      expect(findNaiveBestPrice(orderBook, "sell")).to.eq(
        lowSellOrder.limitPrice
      );
    });

    it("is the highest price for buys", () => {
      expect(findNaiveBestPrice(orderBook, "buy")).to.eq(
        highBuyOrder.limitPrice
      );
    });
  });

  jsc.property(
    "naive best price is better than all other prices",
    Generators.arbitraryOrderBook,
    Generators.arbitraryOrderType,
    (orderBook: OrderBook, orderType: OrderType) => {
      const bestPrice = findNaiveBestPrice(orderBook, orderType);

      _.forEach(orderBook[orderType], (order: Order) => {
        if (orderType === "sell") {
          expect(order.limitPrice).to.be.most(bestPrice);
        }

        if (orderType === "buy") {
          expect(order.limitPrice).to.be.least(bestPrice);
        }
      });
      return true;
    }
  );

  jsc.property(
    "safe naive best sell price is better than all other prices",
    Generators.arbitraryOrderBook,
    (orderBook: OrderBook) => {
      const bestPrice = safeFindNaiveBestPrice(orderBook, "sell");

      _.forEach(orderBook.sell, (order: Order) => {
        expect(order.limitPrice).to.be.at.most(bestPrice);
      });
      return true;
    }
  );

  jsc.property(
    "best price is better than all other prices",
    Generators.arbitraryOrderBook,
    Generators.arbitraryOrderType,
    (orderBook: OrderBook, orderType: OrderType) => {
      const bestPrice = findBestPrice(orderBook, orderType);

      _.forEach(orderBook[orderType], (order: Order) => {
        if (orderType === "sell") {
          expect(order.limitPrice <= bestPrice);
        }

        if (orderType === "buy") {
          expect(order.limitPrice >= bestPrice);
        }
      });
      return true;
    }
  );
});
