property "best price is better than all other prices" do
  check all orderbook <- Generators.orderbook_generator(),
            order_type <- Generators.order_type_generator() do
  end
end
