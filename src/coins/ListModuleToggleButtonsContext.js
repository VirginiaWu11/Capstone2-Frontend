import React, { useContext, useState } from "react";

import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const ListModuleToggleButtonsContext = React.createContext();

export const ListModuleToggleButtonsProvider = ({ children }) => {
  const [view, setView] = useState("module");

  const ListModuleToggleButtons = () => {
    const handleChange = (event, nextView) => {
      setView(nextView);
    };

    return (
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        sx={{ ml: 1, mt: 2 }}
      >
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };
  const value = {
    ListModuleToggleButtons,
    view,
    setView,
  };
  return (
    <ListModuleToggleButtonsContext.Provider value={value}>
      {children}
    </ListModuleToggleButtonsContext.Provider>
  );
};

export const useListModuleToggleButtonsContext = () =>
  useContext(ListModuleToggleButtonsContext);
