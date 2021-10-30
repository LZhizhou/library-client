import { CssBaseline, Grid, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import UserProfile from "./UserProfile/UserProfile";
import Booking from "./BookRoom/BookRoom";
import EditRoom from "./ViewBookings/ViewBookings";
import useStyles from "./useStyles";
import BookRoom from "./BookRoom/BookRoom";

export default function UserPage(): JSX.Element {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <Grid spacing={3} container component="main" className={classes.root}>
      <CssBaseline />
      <Grid sx={{ width: 256, height: 256 }} item>
        <UserProfile />
      </Grid>
      <Grid xs={8} item>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
        >
          <Tab label="Bookings" />
          <Tab label="Add/Edit Room" />
        </Tabs>
        <Grid item>
          {tabIndex === 0 && <BookRoom />}
          {tabIndex === 1 && <EditRoom />}
        </Grid>
      </Grid>
    </Grid>
  );
}
