test "commutative" do
  assert 1 + 2 == 2 + 1
end

test "associative" do
  assert (1 + (2 + 3)) == (1 + 2) + 3)
end

test "identity" do
  assert (1 + 0) == 1
end
