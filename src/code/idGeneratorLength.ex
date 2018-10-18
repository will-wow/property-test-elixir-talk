def id_generator() do
  StreamData.string(
    :ascii, min_length: 1
  )
end

id_generator()
|> Enum.take(10)

["W", ".", "em", "j", "\\)9gy", "Q+3", "k>iOtf", "#?QrKD", "QBT", "x];5\"q", "?'YZ_jxW"]
