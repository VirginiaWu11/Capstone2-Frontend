import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CoinCard from "./CoinCard";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  let coin = {
    id: "testcoin",
    name: "testcoin",
    symbol: "TC",
    current_price: 1,
    market_cap: 10,
  };

  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CoinCard
          coin={coin}
          isPinned={() => false}
          handlePin={() => false}
          handleUnpin={() => false}
          isOnPortfolio={() => false}
          removeFromPortfolio={() => false}
          handlePortfolioModalOpen={() => false}
        />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
