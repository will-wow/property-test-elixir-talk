def naive_find_best_price(order_book, order_type) do
  price =
    order_book
    |> Map.fetch!(order_type)
    |> hd()
    |> Map.fetch!(:limit_price)

  {:ok, price}
end
