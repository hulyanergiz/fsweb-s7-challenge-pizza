import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import SiparisFormu from "./SiparisFormu";

beforeEach(() => {
  render(<SiparisFormu />);
});

test("birden fazla malzeme seçilebiliyor", () => {
  userEvent.click(screen.getByText("Pepperoni"));
  expect(screen.getByLabelText("Pepperoni")).toBeChecked();
  userEvent.click(screen.getByText("Mısır"));
  expect(screen.getByLabelText("Pepperoni")).toBeChecked();
  userEvent.click(screen.getByText("Domates"));
  expect(screen.getByLabelText("Pepperoni")).toBeChecked();
});

test("sayfa sorunsuz açılıyor ve buton aktif değil", () => {
  expect(screen.getByRole("button", { name: /SİPARİŞ VER/i })).toBeDisabled();
});
test("17 tane input var", () => {
  expect(screen.getAllByTestId("input")).toHaveLength(17);
});

test("iki tane count butonu var", () => {
  const buttons = screen.getAllByTestId("counter");
  expect(buttons).toHaveLength(2);
});

/* test("Müşteri adı inputuna bir karakter girilince hata veriyor", async () => {
  const nameInput = screen.getByTestId("name");
  fireEvent.change(nameInput, { target: { value: "a" } });
  await waitFor(() => {
    const errors = screen.getByTestId("error");
    expect(errors).toHaveLength(1);
    expect(
      screen.getByText(/En az iki karakter girmelisiniz./i)
    ).toBeInTheDocument();
  });
});
*/

/* test("formu gerekli inputlar doldurulunca gönderilebiliyor", async () => {
  const nameInput = screen.getByTestId("name");
  fireEvent.change(nameInput, { target: { value: "aa" } });;
  userEvent.click(screen.getByText("S"));
  userEvent.click(screen.getByText("İnce"));

  const formElement = screen.getByTestId("form");

  await waitFor(() => {
    expect(formElement).toHaveValues({
      customerName: "aa",
      size: "S",
      thickness: "İnce",
    });
  });
  expect(screen.getByText("SİPARİŞ VER")).not.toBeDisabled();
}); */
