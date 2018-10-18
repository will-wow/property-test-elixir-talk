@orderbook %Orderbook{
  buy: [@high_buy_order, @low_buy_order],
  sell: [@low_sell_order, @high_sell_order]
}

test "finds low price for sells" do
  assert Orderbook.find_best_price(@orderbook, :buy) == {:ok, @high_buy_order.limit_price}
end

test "finds high price for buys" do
  assert Orderbook.find_best_price(@orderbook, :sell) == {:ok, @low_sell_order.limit_price}
end
