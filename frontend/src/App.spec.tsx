import { render, screen } from "@testing-library/react";

import { App } from "~/App";

it("test", () => {
  render(<App />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
