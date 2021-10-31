import {
  Button,
  Dialog,
  Grid,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import useStyles from "../useStyles";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { MenuItem } from "@material-ui/core";
import { AdminLibrary, Library } from "../../../interface/Library";
import getLibraryList from "../../../helpers/user/getLibraryList";
import { useAuth } from "../../../context/useAuthContext";
import getRoomList from "../../../helpers/admin/getRoomList";
import { Room } from "../../../interface/RoomApiData";
import bookRoom from "../../../helpers/user/bookRoom";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
export default function BookRoom(): JSX.Element {
  const [libraryList, setLibraryList] = useState<Library[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const classes = useStyles();
  const { token, loggedInUser } = useAuth();
  const [selectedLibraryID, setLibraryID] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [bookDate, setBookDate] = useState<Date>(new Date());
  useEffect(() => {
    getLibraryList(token).then((response) => {
      if (response.success) {
        setLibraryList(response.success ?? []);
      }
    });
  }, [token]);
  useEffect(() => {
    getRoomList({ token, libraryID: selectedLibraryID ?? "" }).then(
      (response) => {
        if (response.success) {
          setRoomList(response.success ?? []);
        }
      }
    );
  }, [token]);
  const bookButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setDialogOpen(true);
            // bookRoom({
            //   username: loggedInUser?.username ?? "",
            //   date: params.row.openingHours,
            //   libraryID: selectedLibraryID ?? "",
            //   roomID: params.row.roomID,
            //   token: token,
            // });
          }}
        >
          Book
        </Button>
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of booking"
              value={bookDate}
              onChange={(newValue) => {
                if (newValue) {
                  setBookDate(newValue);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Dialog>
      </strong>
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
      field: "openingHours",
      headerName: "Opening hours",
      editable: false,
      sortable: false,
      width: 250,
    },
    {
      field: "book",
      headerName: "Book",
      editable: false,
      sortable: false,
      width: 120,
      renderCell: bookButton,
    },
  ];

  const handleLibraryChange = (event: SelectChangeEvent<string>) => {
    setLibraryID(event.target.value);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

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
          <Select
            onChange={handleLibraryChange}
            value={selectedLibraryID}
            label="Selected Library"
          >
            {libraryList.map((library) => (
              <MenuItem key={library.libraryID} value={library.libraryID}>
                {library.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <DataGrid
        rows={roomList.map((room) => {
          return { ...room, id: room.roomID };
        })}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Grid>
  );
}
