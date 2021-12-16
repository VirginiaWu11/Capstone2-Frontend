import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { useUserContext } from "./auth/UserContext";

import * as yup from "yup";
import { useFormik } from "formik";

const theme = createTheme();

const validationSchema = yup.object({
  password: yup.string().required("Password is required").min(6),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
});

export default function ProfileForm({ signup }) {
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const { currentUser, setCurrentUser, updateProfile } = useUserContext();
  console.debug("ProfileForm", "signup=", { formErrors }, currentUser);

  const formik = useFormik({
    initialValues: {
      password: "",
      firstName: `${currentUser.firstName}`,
      lastName: `${currentUser.lastName}`,
      email: `${currentUser.email}`,
    },
    onSubmit: async (values) => {
      let result = await updateProfile(currentUser.username, values);
      console.debug("ProfileForm", "updateProfile result", result);
      if (!result.success) {
        setFormErrors(result.errors);
        return;
      }
      setFormErrors([]);
      setSaveConfirmed(true);

      // trigger reloading of user information throughout the site
      setCurrentUser(result.updatedUser);
    },
    validationSchema: validationSchema,
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonOutlineIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              {currentUser.username}'s Profile
            </Typography>
            <Container maxWidth="xs">
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Profile
                </Button>
                {formErrors.length
                  ? formErrors.map((error) => (
                      <Alert severity="error">{error}</Alert>
                    ))
                  : null}
                {saveConfirmed ? (
                  <Alert severity="success">"Updated successfully."</Alert>
                ) : null}
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
