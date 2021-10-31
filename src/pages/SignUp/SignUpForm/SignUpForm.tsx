import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import useStyles from "./useStyles";
import { CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  handleSubmit: (
    {
      email,
      username,

      password,
      phone,
    }: {
      email: string;
      password: string;
      username: string;
      phone: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      username: string;
      phone: string;
    }>
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        phone: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .required("Username is required")
          .max(40, "Username is too long"),
        email: Yup.string()
          .required("Email is required")
          .email("Email is not valid"),
        password: Yup.string()
          .required("Password is required")
          .max(100, "Password is too long")
          .min(6, "Password too short"),
        phone: Yup.string()
          .required("Phone is required")
          .matches(phoneRegExp, "Phone number is not vaild"),
      })}
      onSubmit={handleSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Typography className={classes.label} align="left">
            Username
          </Typography>
          <TextField
            id="username"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your name"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="username"
            autoComplete="username"
            autoFocus
            helperText={touched.username ? errors.username : ""}
            error={touched.username && Boolean(errors.username)}
            value={values.username}
            onChange={handleChange}
          />
          <Typography className={classes.label} align="left">
            E-mail
          </Typography>
          <TextField
            id="email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter e-mail address"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />

          <Typography className={classes.label} align="left">
            Password
          </Typography>
          <TextField
            id="password"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter password"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />
          <Typography className={classes.label} align="left">
            Phone
          </Typography>
          <TextField
            id="phone"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter your phone number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="phone"
            autoComplete="tel"
            autoFocus
            helperText={touched.phone ? errors.phone : ""}
            error={touched.phone && Boolean(errors.phone)}
            value={values.phone}
            onChange={handleChange}
          />
          <Box textAlign="center">
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSubmitting ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "SIGN IN"
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
