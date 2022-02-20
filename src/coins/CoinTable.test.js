import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CoinTable from "./CoinTable";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  let coinData = [];
  let coins = [];
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CoinTable coinData={coinData} coins={coins} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
