def positive_number_generator() do
  StreamData.float(min: 0)
  |> StreamData.filter(
    fn n -> n != 0 end
  )
end

positive_number_generator()
|> Enum.take(10)

[2.0, 0.5, 0.375, 0.4375, 0.40625, 0.046875, 46.6640625, 202.5234375, 0.31640625, 0.5400390625]
