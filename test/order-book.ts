import * as _ from "lodash";

export type OrderType = "buy" | "sell";

export interface Order {
  id: string;
  userId: string;
  limitPrice: number;
  quantity: number;
}

export interface OrderBook {
  buy: Order[];
  sell: Order[];
}

export const findBestPrice = (
  orderBook: OrderBook,
  orderType: OrderType
): number | undefined => {
  let bestOrder: Order;

  if (orderType === "buy") {
    bestOrder = _.maxBy(orderBook.buy, (order: Order) => order.limitPrice);
  }

  if (orderType === "sell") {
    bestOrder = _.minBy(orderBook.sell, (order: Order) => order.limitPrice);
  }

  return bestOrder ? bestOrder.limitPrice : undefined;
};

export const findNaiveBestPrice = (
  orderBook: OrderBook,
  orderType: OrderType
): number => {
  let bestOrder: Order;

  if (orderType === "sell") {
    bestOrder = first(orderBook.sell);
  }

  if (orderType === "buy") {
    bestOrder = last(orderBook.buy);
  }

  return bestOrder.limitPrice;
};

const first = xs => xs[0];
const last = xs => xs[xs.length - 1];

export const safeFindNaiveBestPrice = (
  orderBook: OrderBook,
  orderType: OrderType
): number => {
  let bestOrder: Order | undefined;

  if (orderType === "sell") {
    bestOrder = safeFirst(orderBook.sell);
  }

  if (orderType === "buy") {
    bestOrder = safeLast(orderBook.buy);
  }

  return bestOrder ? bestOrder.limitPrice : undefined;
};

const safeFirst = xs => (xs ? xs[0] : undefined);
const safeLast = xs => (xs ? xs[xs.length - 1] : undefined);
