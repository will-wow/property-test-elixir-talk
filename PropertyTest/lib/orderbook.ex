defmodule PT.Orderbook do
  alias __MODULE__
  alias PT.Order

  defstruct [:buy, :sell]

  @type order_type :: :buy | :sell

  @type t :: %Orderbook{
          buy: [Order.t()],
          sell: [Order.t()]
        }

  @spec naive_find_best_price(t, order_type) :: {:ok, number} | {:error, :no_match}
  def naive_find_best_price(order_book, order_type) do
    price =
      order_book
      |> Map.fetch!(order_type)
      |> hd()
      |> Map.fetch!(:limit_price)

    {:ok, price}
  end

  @spec safe_naive_find_best_price(t, order_type) :: {:ok, number} | {:error, :no_match}
  def safe_naive_find_best_price(order_book, order_type) do
    case order_book
         |> Map.fetch!(order_type) do
      [] -> {:error, :no_match}
      [%Order{limit_price: limit_price} | _] -> {:ok, limit_price}
    end
  end

  @spec find_best_price(t, order_type) :: {:ok, number} | {:error, :no_match}
  def find_best_price(order_book, order_type) do
    case order_type do
      :buy ->
        Enum.max_by(
          order_book.buy,
          fn order ->
            order.limit_price
          end,
          fn -> nil end
        )

      :sell ->
        Enum.min_by(
          order_book.sell,
          fn order ->
            order.limit_price
          end,
          fn -> nil end
        )
    end
    |> case do
      nil -> {:error, :no_match}
      order -> {:ok, order.limit_price}
    end
  end
end
