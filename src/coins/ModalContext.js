import React, { useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const ModalContext = React.createContext();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [clickedCoin, setClickedCoin] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const CoinModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {clickedCoin.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            details - chart placeholder
          </Typography>
        </Box>
      </Modal>
    );
  };

  const value = {
    CoinModal,
    open,
    setOpen,
    handleOpen,
    handleClose,
    clickedCoin,
    setClickedCoin,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
