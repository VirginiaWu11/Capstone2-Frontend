import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CoinChart } from "./CoinChart";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  let coinData = [];
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CoinChart coinData={coinData} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
