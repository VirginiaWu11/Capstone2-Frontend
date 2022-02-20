import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CoinsCardList from "./CoinsCardList";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
  let coins = [];
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CoinsCardList coins={coins} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
