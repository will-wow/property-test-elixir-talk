def orderbook_generator() do
  gen all buys <- StreamData.list_of(
                    order_generator()
                  ),
          sells <- StreamData.list_of(
                     order_generator()
                   ) do
    %Orderbook{
      buy: buys,
      sell: sells
    }
  end
end
