import React from "react";
import { render, fireEvent, wait } from "react-testing-library";
import App from "../App";

const newComment = "learning UI testing using react-testing-library";

describe("App", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("textarea's default value is empty", () => {
    const { getByPlaceholderText } = render(<App />);
    const textArea = getByPlaceholderText("write your comment");

    expect(textArea).toHaveTextContent("");
  });

  test("submit button is disabled", () => {
    const { getByText } = render(<App />);
    const submitButton = getByText("disabled");

    expect(submitButton).toHaveTextContent("disabled");
  });

  test("textarea's value changes", () => {
    const { getByPlaceholderText } = render(<App />);
    const textArea = getByPlaceholderText("write your comment");

    fireEvent.change(textArea, { target: { value: newComment } });
    expect(textArea.value).toEqual(newComment);
  });

  test("submit button is enabled", () => {
    const { getByPlaceholderText } = render(<App />);
    const textArea = getByPlaceholderText("write your comment");
    fireEvent.change(textArea, { target: { value: newComment } });

    const { getByText } = render(<App />);
    const submitButton = getByText("submit");

    fireEvent.click(submitButton);
  });

  test("renders a comment", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<App />);
    const textArea = getByPlaceholderText("write your comment");
    fireEvent.change(textArea, { target: { value: newComment } });

    const submitButton = getByText("submit");
    fireEvent.click(submitButton);

    await wait(() => getByTestId("comment-content"));
    expect(getByTestId("comment-content")).toHaveTextContent(newComment);
  });
});
