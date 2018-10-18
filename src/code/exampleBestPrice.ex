@orderbook %Orderbook{
  buy: [@low_buy_order, @high_buy_order],
  sell: [@high_sell_order, @low_sell_order]
}

test "finds low price for sells" do
  assert Orderbook.find_best_price(@orderbook, :buy) == {:ok, @high_buy_order.limit_price}
end

test "finds high price for buys" do
  assert Orderbook.find_best_price(@orderbook, :sell) == {:ok, @low_sell_order.limit_price}
end
