def positive_number_generator() do
  StreamData.float(min: 0)
end

positive_number_generator()
|> Enum.take(10)

[0.5, 0.0, 0.625, 0.75, 14.625, 24.09375, 74.40625, 163.5546875, 0.431640625, 24.2783203125]
