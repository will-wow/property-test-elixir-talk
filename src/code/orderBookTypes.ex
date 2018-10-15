@type order_type :: :buy | :sell

@type Order.t() :: %Order{
        id: String.t(),
        user_id: String.t(),
        limit_price: number,
        quantity: number
      }

@type Orderbook.t() :: %Orderbook{
        buy: [Order.t()],
        sell: [Order.t()]
      }
