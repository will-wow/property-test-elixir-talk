{_, best_price} = Orderbook.find_best_price(orderbook, order_type)

orderbook
|> Map.fetch!(order_type)
|> Enum.each(fn order ->
  case order_type do
    :buy -> assert order.limit_price >= best_price
    :sell -> assert order.limit_price <= best_price
  end
end)
