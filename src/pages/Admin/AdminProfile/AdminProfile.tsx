import {
  Paper,
  Typography,
} from "@mui/material";

import useStyles from "./useStyles";
import { useAuth } from "../../../context/useAuthContext";

export default function AdminProfile(): JSX.Element {
  const {loggedInUser} = useAuth();
  const classes = useStyles();
  return (

      <Paper>
        <img className={classes.userImage} src="/userImage.png" />
        <Typography className={classes.username} variant="h6">{loggedInUser?.username??'username'}</Typography>
        <Typography className={classes.emailAndPhone}>{loggedInUser?.library?.email??'email'}</Typography>
        <Typography>Library Name :{loggedInUser?.library?.name}</Typography>
      </Paper>

  );
}
