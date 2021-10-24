import { CssBaseline, Grid, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AdminProfile from "./AdminProfile/AdminProfile";
import Booking from "./Booking/Booking";
import useStyles from "./useStyles";

export default function Admin(): JSX.Element {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <Grid spacing={3} container component="main" className={classes.root}>
      <CssBaseline />
      <Grid sx={{ width: 256, height: 256 }} item>
        <AdminProfile />
      </Grid>
            <Grid xs={8} item>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Bookings" />
                    <Tab label="Add/Edit Room" />
                </Tabs>
                {tabIndex === 0 && <Grid item><Booking />
                </Grid>}
            </Grid>
        </Grid>
    );
}
