import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import useStyles from "../useStyles";
import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { MenuItem } from "@material-ui/core";
export default function BookRoom(): JSX.Element {
  const classes = useStyles();
  const now = new Date();
  const [dateRange, setDateRange] = React.useState<DateRange<Date>>([
    now,
    new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
  ]);
  const bookButton = (params: GridRenderCellParams) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {}}
        >
          Book
        </Button>
      </strong>
    );
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Room No.",
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
      field: "time",
      headerName: "Time",
      width: 180,
      editable: false,
      sortable: false,
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
  const [selectedLibrary, setLibrary] = useState<string>();

  const rows = [
    {
      id: "1F1A",
      capacity: 10,
      time: "10:00-12:30 05/08/2021",
    },
  ];
  const libraries = [
    "Top Ryde Library",
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const handleLibraryChange = (
    event: SelectChangeEvent<typeof selectedLibrary>
  ) => {
    const {
      target: { value },
    } = event;
    setLibrary(value);
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
            value={selectedLibrary}
            label="Selected Library"
            defaultValue={libraries[0]}
          >
            {libraries.map((library) => (
              <MenuItem key={library} value={library}>
                {library}
              </MenuItem>
            ))}
          </Select>
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
