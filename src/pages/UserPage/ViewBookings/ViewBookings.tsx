import { Button, Grid, TextField, Typography } from "@mui/material";
import useStyles from "./useStyles";
import React, { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useAuth } from "../../../context/useAuthContext";
import getMyBookingList from "../../../helpers/user/getMyBookingList";
import { AdminBooking } from "../../../interface/Booking";
import userCancelBooking from "../../../helpers/user/userCancelBooking";
export default function ViewBookings(): JSX.Element {
  const { loggedInUser, token } = useAuth();
  const classes = useStyles();
  const now = new Date();
  const [bookingList, setBookingList] = useState<AdminBooking[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange<Date>>([
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
          onClick={() => {
            userCancelBooking({ reservationID: params.row.id, token });
          }}
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
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
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
  ];
  useEffect(() => {
    getMyBookingList({
      libraryID: loggedInUser?.library?.libraryID,
      username: loggedInUser?.username,
      startDate: dateRange[0]?.getDate.toString(),
      endDate: dateRange[1]?.getDate.toString(),
      token: token,
    }).then((response) => {
      if (response.success) {
        setBookingList(response.success);
      }
    });
  }, [loggedInUser, dateRange]);
  return (
    <Grid
      container
      component="main"
      className={classes.root}
      direction={"column"}
    >
      <Grid item container direction={"row"}>
        <Grid item xs={4}>
          <Typography variant={"h5"}>My Booking</Typography>
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
        rows={bookingList.map((booking) => {
          return { ...booking, id: booking.bookingID };
        })}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Grid>
  );
}
