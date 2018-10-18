defmodule PT.OrderbookTest do
  use ExUnit.Case
  use ExUnitProperties

  alias PT.Order
  alias PT.Orderbook
  alias Test.Support.Generators

  @high_sell_order %Order{
    id: "abc",
    user_id: "sam",
    quantity: 2,
    limit_price: 5
  }

  @low_sell_order %Order{
    id: "def",
    user_id: "sally",
    quantity: 2,
    limit_price: 3
  }

  @low_buy_order %Order{
    id: "ghi",
    user_id: "bob",
    quantity: 2,
    limit_price: 3
  }

  @high_buy_order %Order{
    id: "jkl",
    user_id: "beth",
    quantity: 2,
    limit_price: 5
  }

  @orderbook %Orderbook{
    buy: [@high_buy_order, @low_buy_order],
    sell: [@low_sell_order, @high_sell_order]
  }

  test "naive finds low price for sells" do
    assert Orderbook.naive_find_best_price(@orderbook, :buy) == {:ok, @high_buy_order.limit_price}
  end

  test "naive finds high price for buys" do
    assert Orderbook.naive_find_best_price(@orderbook, :sell) ==
             {:ok, @low_sell_order.limit_price}
  end

  test "finds low price for sells" do
    assert Orderbook.find_best_price(@orderbook, :buy) == {:ok, @high_buy_order.limit_price}
  end

  test "finds high price for buys" do
    assert Orderbook.find_best_price(@orderbook, :sell) == {:ok, @low_sell_order.limit_price}
  end

  test "finds high price for one sell" do
    orderbook = %Orderbook{
      buy: [],
      sell: [@low_sell_order]
    }

    assert Orderbook.find_best_price(orderbook, :sell) == {:ok, @low_sell_order.limit_price}
  end

  property "best price is better than all other prices" do
    check all orderbook <- Generators.orderbook_generator(),
              order_type <- Generators.order_type_generator() do
      {_, best_price} = Orderbook.find_best_price(orderbook, order_type)

      orderbook
      |> Map.fetch!(order_type)
      |> Enum.each(fn order ->
        case order_type do
          :buy -> assert order.limit_price <= best_price
          :sell -> assert order.limit_price >= best_price
        end
      end)
    end
  end
end
