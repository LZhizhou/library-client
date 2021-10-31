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
      roomID,
      roomName,
      availableTime,
      capacity,
    }: {
      roomID: string;
      roomName: string;
      availableTime: string;
      capacity: number;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      roomID: string;
      roomName: string;
      availableTime: string;
      capacity: number;
    }>
  ) => void;
}

const AddRoomForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const availableTimeRegExp =
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  return (
    <Formik
      initialValues={{
        roomID: "",
        roomName: "",
        availableTime: "",
        capacity: 1,
      }}
      validationSchema={Yup.object().shape({
        roomID: Yup.string().required("ID is required"),
        roomName: Yup.string().required("Room Name is required"),
        availableTime: Yup.string()
          .required("available time is required")
          .matches(availableTimeRegExp, "availableTime should be like hh:mm-hh:mm"),
        capacity: Yup.number()
          .required("capacity is required")
          .min(1, "capacity should be larger than 1"),
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
            roomID
          </Typography>
          <TextField
            id="roomID"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter Room ID"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="roomID"
            autoFocus
            helperText={touched.roomID ? errors.roomID : ""}
            error={touched.roomID && Boolean(errors.roomID)}
            value={values.roomID}
            onChange={handleChange}
          />
          <Typography className={classes.label} align="left">
            Room Name
          </Typography>
          <TextField
            id="roomName"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter room name"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="roomName"
            helperText={touched.roomName ? errors.roomName : ""}
            error={touched.roomName && Boolean(errors.roomName)}
            value={values.roomName}
            onChange={handleChange}
          />

          <Typography className={classes.label} align="left">
            availableTime
          </Typography>
          <TextField
            id="availableTime"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter  available Time"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="availableTime"
            autoFocus
            helperText={touched.availableTime ? errors.availableTime : ""}
            error={touched.availableTime && Boolean(errors.availableTime)}
            value={values.availableTime}
            onChange={handleChange}
          />
          <Typography className={classes.label} align="left">
            Capacity
          </Typography>
          <TextField
            id="capacity"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Enter capacity"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="capacity"
            autoFocus
            helperText={touched.capacity ? errors.capacity : ""}
            error={touched.capacity && Boolean(errors.capacity)}
            value={values.capacity}
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
                "ADD"
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AddRoomForm;
