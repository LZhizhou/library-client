import { Button, Grid, Typography } from "@mui/material";
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
import { AdminRoom } from "../../../interface/RoomApiData";
import updateTime from "../../../helpers/admin/updateTime";

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
  }, [loggedInUser]);
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
              libraryID:loggedInUser?.library?.libraryID??''
            }).then((response)=>{
              if(response.success){
                
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
        rows={roomList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onEditRowsModelChange={handleEditRowsModelChange}
        editRowsModel={editRowsModel}
      />
    </Grid>
  );
}
