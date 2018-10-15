defmodule PT.Order do
  alias __MODULE__

  @type t :: %Order{
          id: String.t(),
          user_id: String.t(),
          limit_price: number,
          quantity: number
        }

  defstruct [:id, :user_id, :limit_price, :quantity]
end
