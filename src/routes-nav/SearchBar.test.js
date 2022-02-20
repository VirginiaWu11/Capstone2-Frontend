import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SearchBar from "./SearchBar";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <SearchBar />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <SearchBar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider currentUser={null}>
        <SearchBar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
