def id_generator() do
  StreamData.string(:ascii)
end

id_generator()
|> Enum.take(10)

["", "X", "", "", "h", "=", "gb&/-c", "6a", "uP<kh(", ">{7", "]_dM&m_1", "2-TM$|JGUPB"]
