defmodule BattleshipWeb.TableChannel do
  use BattleshipWeb, :channel

  def join("table:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("click", %{"x" => x, "y" => y}, socket) do
    {:reply, {:ok, %{x: x, y: y}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (table:lobby).
  def handle_in("msg", payload, socket) do
    broadcast socket, "msg", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
