import { CssBaseline, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import UserProfile from "./UserProfile/UserProfile";
import EditRoom from "./ViewBookings/ViewBookings";
import useStyles from "./useStyles";
import BookRoom from "./BookRoom/BookRoom";
import ViewBookings from "./ViewBookings/ViewBookings";

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
          <Tab label="Book" />
          <Tab label="View Bookings" />
        </Tabs>
        <Grid item>
          {tabIndex === 0 && <BookRoom />}
          {tabIndex === 1 && <ViewBookings />}
        </Grid>
      </Grid>
    </Grid>
  );
}
