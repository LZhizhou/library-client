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
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
export default function ViewBookings(): JSX.Element {
  const classes = useStyles();
  const now = new Date();
  const tempOpenUntill = new Date(2021, 11, 31);
  const openTime = new Date(2021, 11, 31, 8);
  const closeTime = new Date(2021, 11, 31, 22);
  const [dateRange, setDateRange] = React.useState<DateRange<Date>>([
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
  const cancelButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {}}
        >
          Cancel
        </Button>
      </strong>
    );
  };
  const editButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {}}
        >
          Edit
        </Button>
      </strong>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "library",
      headerName: "Library",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "roomId",
      headerName: "Room ID",
      width: 110,
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
      field: "time",
      headerName: "Time",
      width: 180,
      editable: false,
      sortable: false,
    },
    {
      field: "id",
      headerName: "BookingRef",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "cancel",
      headerName: "Cancel",
      editable: false,
      sortable: false,
      width: 120,
      renderCell: cancelButton,
    },
    {
      field: "edit",
      headerName: "Edit",
      editable: false,
      sortable: false,
      width: 120,
      renderCell: editButton,
    },
  ];

  const rows = [
    {
      id: "SHDYSB",
      capacity: 10,
      roomId:"1F1A",
      library:"Top Ryde Library",
      time:"10:00-12:30 05/08/2021" 
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
              value={dateRange}
              showToolbar={false}
              onChange={(newDateRange) => {
                if (newDateRange) {
                  setDateRange(newDateRange);
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
