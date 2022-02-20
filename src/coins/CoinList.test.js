import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CoinList from "./CoinList";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CoinList />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
