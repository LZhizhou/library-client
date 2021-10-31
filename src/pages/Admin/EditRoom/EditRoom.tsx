import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import useStyles from "./useStyles";
import { useCallback, useEffect, useState } from "react";

import {
  DataGrid,
  GridColDef,
  GridEditRowsModel,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import adminGetRoomList from "../../../helpers/admin/adminGetRoomList";
import { useAuth } from "../../../context/useAuthContext";
import updateTime from "../../../helpers/admin/updateTime";
import { useSnackBar } from "../../../context/useSnackbarContext";
import AddRoomForm from "./AddRoomForm/AddRoomForm";
import { FormikHelpers } from "formik";
import addRoom from "../../../helpers/admin/addRoom";
import { number } from "yup/lib/locale";

export interface AdminRoomGrid {
  id: string;
  roomName: string;
  capacity: number;
  openStatus: string;
  availableTime: string;
}
function validateAvailableTime(time: any) {
  const re =
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return re.test(String(time).replaceAll(" ", ""));
}
export default function EditRoom(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser, token } = useAuth();
  const [roomList, setRoomList] = useState<AdminRoomGrid[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [count,setCount]=useState<number>(0);
  useEffect(() => {
    adminGetRoomList({
      libraryID: loggedInUser?.library?.libraryID ?? "",
      token: token,
    }).then((response) => {
      if (response.success) {
        setRoomList(
          (response.success ?? []).map((room) => {
            return {
              id: room.roomID,
              roomName: room.roomName,
              capacity: room.capacity,
              openStatus: room.openStatus,
              availableTime: room.availableTime,
            };
          })
        );
      }
    });
  }, [loggedInUser,count]);
  const updateButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            updateTime({
              startTime: params.row.availableTime.split("-")[0],
              endTime: params.row.availableTime.split("-")[1],
              token,
              libraryID: loggedInUser?.library?.libraryID ?? "",
            }).then((response) => {
              if (response.success) {
                updateSnackBarMessage("update successfully!");
                setCount(count+1);
              } else {
                updateSnackBarMessage("update failed: " + response.error);
              }
            });
          }}
        >
          Update
        </Button>
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
      field: "roomName",
      headerName: "Room Name",
      width: 150,
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
      field: "open",
      headerName: "Open/Close",
      width: 130,
      editable: false,
      sortable: false,
      type: "boolean",
      valueGetter: (params: GridValueGetterParams) => {
        return params.getValue(params.id, "openStatus")?.valueOf() == "open";
      },
    },
    {
      field: "availableTime",
      headerName: "Available Time",
      editable: true,
      sortable: false,
      width: 120,
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
  const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});
  const handleEditRowsModelChange = useCallback(
    (newModel: GridEditRowsModel) => {
      const updatedModel = { ...newModel };
      Object.keys(updatedModel).forEach((id) => {
        if (updatedModel[id].availableTime) {
          const isValid = validateAvailableTime(
            updatedModel[id].availableTime.value
          );
          updatedModel[id].availableTime = {
            ...updatedModel[id].availableTime,
            error: !isValid,
          };
        }
      });
      setEditRowsModel(updatedModel);
    },
    []
  );
  const addRoomClick = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const handleSubmit = (
    {
      roomID,
      roomName,
      availableTime,
      capacity,
    }: {
      roomID: string;
      roomName: string;
      availableTime: string;
      capacity: number;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      roomID: string;
      roomName: string;
      availableTime: string;
      capacity: number;
    }>
  ) => {
    addRoom({
      roomID,
      roomName,
      availableTime,
      capacity,
      openStatus: "open",
    },token).then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        updateSnackBarMessage(data.error);
      } else if (data.success) {
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    }).finally(()=>{
      setDialogOpen(false);
      setCount(count+1);
    });
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
        <Grid item xs={4}>
          <Button variant="contained" color="primary" onClick={addRoomClick}>
            Add room
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        rows={roomList}
        columns={columns}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onEditRowsModelChange={handleEditRowsModelChange}
        editRowsModel={editRowsModel}
      />
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogContent>
          <AddRoomForm handleSubmit={handleSubmit}/>
        </DialogContent>

      </Dialog>
    </Grid>
  );
}
