import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import useStyles from "./useStyles";
import { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import getRoomList from "../../../helpers/admin/getRoomList";
import { useAuth } from "../../../context/useAuthContext";
import { Room } from "../../../interface/RoomApiData";
export default function EditRoom(): JSX.Element {
  const classes = useStyles();
  const tempOpenUntill = new Date(2021, 11, 31);
  const openTime = new Date(2021, 11, 31, 8);
  const closeTime = new Date(2021, 11, 31, 22);
  const {loggedInUser,token}=useAuth();
  const [roomList,setRoomList] = useState<Room[]>([]);
  useEffect(() => {
    getRoomList({
      libraryID: loggedInUser?.library?.libraryID??'',
      token: token,
    }).then((response) => {
      if (response.success) {
        setRoomList(response.success??[]);
      }
    });
  }, [loggedInUser]);
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
    if (params.row.open) {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            value={params.row.openUntill}
            onChange={(newValue) => {}}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    } else {
      return "N/A";
    }
  };
  const hourPickers = (params: GridRenderCellParams) => {
    if (params.row.open) {
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
    } else {
      return "N/A";
    }
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
      field: "available",
      headerName: "Open/Close",
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: "openingHours",
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


  return (
    <Grid
      container
      component="main"
      className={classes.root}
      direction={"column"}
    >
      <Grid item xs={4}>
        <Typography variant={"h5"}>Room List</Typography>
      </Grid>

      <DataGrid
        rows={roomList.map((room)=>{return {...room,id:room.roomID}})}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Grid>
  );
}
