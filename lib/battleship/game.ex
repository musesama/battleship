defmodule Battleship.Game do
  def new do
    %{
      word: next_word(),
      placements: [],
    }
  end

  def client_view(game) do
    %{

    }
  end

  def skeleton(word, guesses) do
    Enum.map word, fn cc ->
      if Enum.member?(guesses, cc) do
        cc
      else
        "_"
      end
    end
  end

  def guess(game, letter) do
    if letter == "z" do
      raise "That's not a real letter"
    end

    gs = game.guesses
    |> MapSet.new()
    |> MapSet.put(letter)
    |> MapSet.to_list

    Map.put(game, :guesses, gs)
  end

  def max_guesses do
    12
  end

  def next_word do
    words = ~w(
      dog cat horse frog snake
      muffin cookie pizza sandwich
      house car train clock
      parsnip marshmallow
    )
    Enum.random(words)
  end
end

