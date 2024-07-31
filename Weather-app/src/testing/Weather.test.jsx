import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import WeatherDisplay from "../components/WeatherDisplay";
import axios from "axios";

test("check the type of the input field", () => {
  render(<SearchBar />);

  const inputSearch = screen.getByPlaceholderText("Search for cities");

  expect(inputSearch).toHaveAttribute("type", "search");
});
///////////////

vi.mock("axios");
const mockData = {
  name: "cairo",
  main: {
    temp: 30,
    pressure: 1010,
    humidity: 50,
  },
  weather: [
    {
      icon: "01d",
      description: "clear sky",
    },
  ],
  wind: {
    speed: 10,
  },
};
axios.get.mockResolvedValue({ data: mockData });

describe("<WeatherDisplay/>", () => {
  test("should display city name and temperature", async () => {
    render(<WeatherDisplay />);

    fireEvent.change(screen.getByPlaceholderText("Search for cities"), {
      target: { value: "cairo" },
    });
  });

  test("should display the toggle button", () => {
    render(<WeatherDisplay />);

    expect(screen.getByText("Temperature Unit")).toBeInTheDocument();
  });
});
