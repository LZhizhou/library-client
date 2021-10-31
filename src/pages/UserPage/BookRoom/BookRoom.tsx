import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
import { AdminLibrary, UserLibrary } from "../../../interface/Library";
import getLibraryList from "../../../helpers/user/getLibraryList";
import { useAuth } from "../../../context/useAuthContext";
import adminGetRoomList from "../../../helpers/admin/adminGetRoomList";
import { AdminRoom } from "../../../interface/RoomApiData";
import bookRoom from "../../../helpers/user/bookRoom";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useSnackBar } from "../../../context/useSnackbarContext";
import userGetRoomList from "../../../helpers/user/userGetRoomList";
export default function BookRoom(): JSX.Element {
  const [libraryList, setLibraryList] = useState<UserLibrary[]>([]);
  const [roomList, setRoomList] = useState<AdminRoom[]>([]);
  const classes = useStyles();
  const { token, loggedInUser } = useAuth();
  const [selectedLibraryID, setLibraryID] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [bookDate, setBookDate] = useState<Date>(new Date());
  const { updateSnackBarMessage } = useSnackBar();
  useEffect(() => {
    getLibraryList(token).then((response) => {
      if (response.error) {
        updateSnackBarMessage(
          "get Library Info failed, error: " + response.error
        );
      }
      const fetchLibraries: UserLibrary[] = response.success ?? [];
      setLibraryList(fetchLibraries);
      if (fetchLibraries.length > 0) {
        setLibraryID(fetchLibraries[0].libraryID);
      }
    });
  }, [token]);
  useEffect(() => {
    userGetRoomList({ token, libraryID: selectedLibraryID ?? "" }).then(
      (response) => {
        if (response.success) {
          setRoomList(response.success ?? []);
        }
      }
    );
  }, [token, selectedLibraryID]);
  const bookButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Book
        </Button>
        <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of booking"
                minDate={new Date()}
                value={bookDate}
                onChange={(newValue) => {
                  if (newValue) {
                    setBookDate(newValue);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button
              onClick={() => {
                bookRoom({
                  username: loggedInUser?.username ?? "",
                  date: bookDate.toLocaleDateString().replaceAll('/','-'),
                  libraryID: selectedLibraryID ?? "",
                  roomID: params.row.roomID,
                  token,
                }).then((response) => {
                  if (response.success) {
                    updateSnackBarMessage("booked successfully");
                  } else {
                    updateSnackBarMessage("book failed: " + response.error);
                  }
                }).finally(closeDialog);
              }}
            >
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </strong>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Room ID",
      width: 120,
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
      field: "openStatus",
      headerName: "Open/closed",
      editable: false,
      sortable: false,
      width: 150,
    },
    {
      field: "availableTime",
      headerName: "Available Time",
      editable: false,
      sortable: false,
      width: 150,
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
