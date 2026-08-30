import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the dashboard and project library", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /Момент/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Последние работы" })).toBeInTheDocument();
    expect(screen.getByText("Тихий вечер")).toBeInTheDocument();
    expect(screen.getByText("Ресторан")).toBeInTheDocument();
  });

  it("filters projects by status and search query", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("tab", { name: "Черновики" }));
    expect(screen.getByText("Первый огонёк")).toBeInTheDocument();
    expect(screen.queryByText("Тихий вечер")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Все" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Поиск по проектам" }), { target: { value: "ресторан" } });
    expect(screen.getByText("Ресторан")).toBeInTheDocument();
    expect(screen.queryByText("Тихий вечер")).not.toBeInTheDocument();
  });

  it("creates a draft from the create panel", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("button", { name: /Создать объект/i }));
    expect(screen.getByRole("dialog", { name: "Создать объект" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Good moment/i }));
    expect(screen.getByText("Новый good moment")).toBeInTheDocument();
    expect(screen.getByText("только что")).toBeInTheDocument();
  });
});
