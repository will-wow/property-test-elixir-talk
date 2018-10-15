type OrderType = "buy" | "sell";

interface Order {
  id: string;
  userId: string;
  limitPrice: number;
  quantity: number;
}

interface OrderBook {
  buy: Order[];
  sell: Order[];
}
