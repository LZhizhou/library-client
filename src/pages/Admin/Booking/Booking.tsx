import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import useStyles from "../useStyles";
import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
export default function Booking(): JSX.Element {
  const classes = useStyles();
  const now = new Date();
  const [value, setValue] = React.useState<DateRange<Date>>([
    now,
    new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  ]);
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
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Booking Ref",
      width: 130,
      editable: false,
      sortable: false,
    },
    { field: "roomID", headerName: "Room ID", width: 110, sortable: false },
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
      field: "username",
      headerName: "Username",
      editable: false,
      sortable: false,
      width: 120,
    },
    {
      field: "phone",
      headerName: "phone No.",
      editable: false,
      sortable: false,
      width: 130,
    },
    {
      field: "cancel",
      headerName: "Cancel",
      editable: false,
      sortable: false,
      width: 120,
      renderCell: cancelButton,
    },
  ];

  const rows = [
    {
      roomID: "1F1A",
      capacity: 10,
      time: "10:00-12:30 05/08/2021",
      id: "SHDYSB",
      username: "Andy",
      phone: "+61 412 345 678",
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
          Incoming Booking
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
