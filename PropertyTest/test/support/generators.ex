defmodule Test.Support.Generators do
  use ExUnitProperties

  alias PT.Order
  alias PT.Orderbook

  @type generator(data) :: StreamData.t(data)

  @spec one_of(type :: atom, args :: list) :: StreamData.t(any)
  def one_of(type, args \\ []) do
    apply(__MODULE__, String.to_existing_atom("#{type}_generator"), args)
  end

  @spec order_generator() :: StreamData.t(String.t())
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

  @spec orderbook_generator() :: StreamData.t(Orderbook.t())
  def orderbook_generator() do
    gen all buys <- StreamData.list_of(order_generator()),
            sells <- StreamData.list_of(order_generator()) do
      %Orderbook{
        buy: buys,
        sell: sells
      }
    end
  end

  @spec id_generator() :: StreamData.t(String.t())
  def id_generator() do
    StreamData.binary()
  end

  @spec non_negative_number_generator() :: StreamData.t(float)
  def non_negative_number_generator() do
    StreamData.float(min: 0)
  end

  @spec positive_number_generator() :: StreamData.t(float)
  def positive_number_generator() do
    non_negative_number_generator()
    |> StreamData.filter(fn n -> n > 0 end)
  end

  @spec order_type_generator() :: generator(Orderbook.order_type())
  def order_type_generator() do
    StreamData.member_of([:buy, :sell])
  end
end
