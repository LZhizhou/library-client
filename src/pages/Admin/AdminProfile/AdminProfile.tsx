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

export default function AdminProfile(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Paper>
        <img className={classes.userImage} src="/userImage.png" />
        <Typography className={classes.username} variant="h6">Username</Typography>
        <Typography className={classes.emailAndPhone}>email</Typography>
        <Typography className={classes.emailAndPhone}>phone</Typography>
        <Typography>Library Name</Typography>
        <Typography>Open Room</Typography>
        <Typography>Total Room</Typography>
        <Typography>Incoming booking</Typography>
      </Paper>
    </Grid>
  );
}
