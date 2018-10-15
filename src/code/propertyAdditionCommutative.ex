defmodule AdditionTest do
  use ExUnit.Case
  use ExUnitProperties

  test "commutative" do
    # True in ONE case
    assert 1 + 2 == 2 + 1
  end

  property "commutative" do
    check all n1 <- StreamData.float(),
              n2 <- StreamData.float() do
      # True in ALL cases
      assert n1 + n2 == n2 + n1
    end
  end
end
