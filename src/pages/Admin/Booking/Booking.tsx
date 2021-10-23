import { Box, Grid, InputAdornment, Stack, TextField, TextFieldProps } from "@mui/material";
import useStyles from "../useStyles";
import React, { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import { DateRange } from '@mui/lab/DateRangePicker';
export default function Booking(): JSX.Element {
    const classes = useStyles();
    const now = new Date();
    const [value, setValue] = React.useState<DateRange<Date>>([now, new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())]);
    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs >Incoming Booking</Grid>
            <Grid item xs>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDateRangePicker
                        startText="From"
                        endText="To"
                        value={value}
                        showToolbar={false}
                        onChange={(newValue) => {
                            if (newValue) { setValue(newValue); }
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider></Grid>


        </Grid>
    );
}