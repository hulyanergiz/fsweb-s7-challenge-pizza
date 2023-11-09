import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import SiparisFormu from "./SiparisFormu";

beforeEach(() => {
  render(<SiparisFormu />);
});
test("sayfa sorunsuz açılıyor ve buton aktif değil", () => {
  expect(screen.getByRole("button", { name: /SİPARİŞ VER/i })).toBeDisabled;
});
test("17 tane input var", () => {
  expect(screen.getAllByTestId("input")).toHaveLength(17);
});
test("bir textarea var", () => {
  expect(
    screen.getAllByPlaceholderText(
      "Siparişine eklemek istediğin bir not var mı ?"
    )
  ).toHaveLength(1);
});
test("iki tane count butonu var", () => {
  const buttons = screen.getAllByTestId("counter");
  expect(buttons).toHaveLength(2);
});
