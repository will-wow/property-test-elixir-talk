defmodule PT.MathTest do
  use ExUnit.Case
  use ExUnitProperties

  test "commutative" do
    assert 1 + 2 == 2 + 1
  end

  test "associative" do
    assert 1 + (2 + 3) == 1 + 2 + 3
  end

  test "identity" do
    assert 1 + 0 == 1
  end

  property "commutative" do
    check all n1 <- StreamData.integer(),
              n2 <- StreamData.integer() do
      assert n1 + n2 == n2 + n1
    end
  end

  property "associative" do
    check all n1 <- StreamData.integer(),
              n2 <- StreamData.integer(),
              n3 <- StreamData.integer() do
      assert n1 + (n2 + n3) == n1 + n2 + n3
    end
  end

  property "identity" do
    check all n1 <- StreamData.integer() do
      n1 + 0 == n1
    end
  end
end
