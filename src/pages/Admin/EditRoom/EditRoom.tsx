import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import useStyles from "./useStyles";
import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
export default function EditRoom(): JSX.Element {
  const classes = useStyles();
  const now = new Date();
  const tempOpenUntill = new Date(2021, 11, 31);
  const openTime = new Date(2021, 11, 31, 8);
  const closeTime = new Date(2021, 11, 31, 22);
  const [value, setValue] = React.useState<DateRange<Date>>([
    now,
    new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  ]);
  const updateButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {}}
        >
          Update
        </Button>
      </strong>
    );
  };
  const datePicker = (params: GridRenderCellParams) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          value={tempOpenUntill}
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };
  const hourPickers = (params: GridRenderCellParams) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileTimePicker 
          value={openTime}
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} />}
        />
        {"-"}
        <MobileTimePicker  
          value={closeTime}
          onChange={(newValue) => {}}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Room ID",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      type: "number",
      width: 110,
      editable: false,
      sortable: false,
    },
    {
      field: "openUntill",
      headerName: "Open Untill",
      editable: false,
      sortable: false,
      width: 150,
      renderCell: datePicker,
    },
    {
      field: "open",
      headerName: "Open/Close",
      type: "boolean",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "hours",
      headerName: "Opening hours",
      editable: false,
      sortable: false,
      width: 250,
      renderCell: hourPickers,
    },

    {
      field: "update",
      headerName: "Update",
      editable: false,
      sortable: false,
      width: 120,
      renderCell: updateButton,
    },
  ];

  const rows = [
    {
      id: "1F1A",
      capacity: 10,
      open: true,
      time: "10:00-12:30 05/08/2021",
    },
  ];

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      direction={"column"}
    >
      <Grid item container direction={"row"}>
        <Grid item xs={4}>
          <Typography variant={"h5"}>Room List</Typography>
        </Grid>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateRangePicker
              startText="From"
              endText="To"
              value={value}
              showToolbar={false}
              onChange={(newValue) => {
                if (newValue) {
                  setValue(newValue);
                }
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Grid>
  );
}
