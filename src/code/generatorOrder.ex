def order_generator() do
  gen all id <- id_generator(),
          user_id <- id_generator(),
          limit_price <- positive_number_generator(),
          quantity <- positive_number_generator() do
    %Order{
      id: id,
      user_id: user_id,
      limit_price: limit_price,
      quantity: quantity
    }
  end
end
