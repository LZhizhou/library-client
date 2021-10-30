import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";

import useStyles from "./useStyles";
import { useAuth } from "../../../context/useAuthContext";

export default function UserProfile(): JSX.Element {
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  return (
    <Paper>
      <img className={classes.userImage} src="/userImage.png" />
      <Typography className={classes.username} variant="h6">
        {loggedInUser?.username ?? "username"}
      </Typography>
      <Typography className={classes.emailAndPhone}>
        {loggedInUser?.email ?? "email"}
      </Typography>
      <Typography className={classes.emailAndPhone}>
        {loggedInUser?.phone ?? "phone"}
      </Typography>
      {/* <Typography>Library Name</Typography>
      <Typography>Open Room</Typography>
      <Typography>Total Room</Typography>
      <Typography>Incoming booking</Typography> */}
    </Paper>
  );
}
