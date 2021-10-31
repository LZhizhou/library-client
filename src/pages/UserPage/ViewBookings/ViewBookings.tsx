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
import { UserBooking } from "../../../interface/Booking";
import userCancelBooking from "../../../helpers/user/userCancelBooking";
import moment from "moment";
import { useSnackBar } from "../../../context/useSnackbarContext";
export default function ViewBookings(): JSX.Element {
  const { loggedInUser, token } = useAuth();
  const classes = useStyles();
  const now = new Date();
  const [bookingList, setBookingList] = useState<UserBooking[]>([]);
  const [dateRange, setDateRange] = React.useState<DateRange<Date>>([
    new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
    new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  ]);
  const [count,setCount]= useState<number>(0);
  const {updateSnackBarMessage} = useSnackBar();

  const cancelButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            userCancelBooking({ reservationID: params.row.id, token }).then((response)=>{
              if(response.success){
                updateSnackBarMessage("cancel the booking successfully!");
              }else{
                updateSnackBarMessage("fail to cancel: "+response.error);
              }
            }).finally(()=>{
              setCount(count+1);
            })
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
    { field: "libraryID", headerName: "Library ID", width: 110, sortable: false },
    {
      field: "startTime",
      headerName: "start time",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "endTime",
      headerName: "end time",
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
      username: loggedInUser?.username??'',
      startTime: moment(dateRange[0]).format("YYYY-MM-DD"),
      endTime: moment(dateRange[1]).format("YYYY-MM-DD"),
      token
    }).then((response) => {
      if (response.success) {
        setBookingList(response.success);
      }
    });
  }, [count,loggedInUser, dateRange,token]);
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
          return { ...booking, id: booking.reservationID };
        })}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Grid>
  );
}
