import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PortfolioForm({
  handlePortfolioModalClose,
  portfolioModalopen,
}) {
  console.debug(
    "Portfolio form: open ",
    portfolioModalopen,
    handlePortfolioModalClose
  );
  return (
    <div>
      <Dialog open={portfolioModalopen} onClose={handlePortfolioModalClose}>
        <DialogTitle>Add to Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the quantity of __ coins you would like to add to your
            portfolio.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quantity"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePortfolioModalClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
