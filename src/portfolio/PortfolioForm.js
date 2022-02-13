import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  quantity: yup.number().required("Quantity is required"),
});

export default function PortfolioForm({
  handlePortfolioModalClose,
  portfolioModalopen,
  portfolioModalCoin,
  addToPortfolio,
}) {
  console.debug(
    "Portfolio form: open ",
    portfolioModalopen,
    handlePortfolioModalClose
  );

  const formik = useFormik({
    initialValues: {
      quantity: ``,
    },
    onSubmit: async (values) => {
      let result = await addToPortfolio(portfolioModalCoin.id, values.quantity);
      console.debug("PortfolioForm", "updateProfile result", result, values);
      handlePortfolioModalClose();
      values.quantity = "";
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Dialog open={portfolioModalopen} onClose={handlePortfolioModalClose}>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <DialogTitle>
            Add {portfolioModalCoin && portfolioModalCoin.name + " "}to
            Portfolio
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the quantity of{" "}
              {portfolioModalCoin && portfolioModalCoin.name + " "} coins to add
              to your portfolio.
            </DialogContentText>

            <TextField
              required
              autoFocus
              margin="dense"
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              fullWidth
              variant="standard"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              onBlur={formik.handleBlur}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
