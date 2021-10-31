import {
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import useStyles from "./useStyles";
import { useAuth } from "../../../context/useAuthContext";

export default function UserProfile(): JSX.Element {
  const { loggedInUser } = useAuth();
  const classes = useStyles();
  return (
    <Paper>
      <img className={classes.userImage} src="/userImage.png" />
      <Typography className={classes.username} variant="h6">
        {loggedInUser?.username ?? "username"}
      </Typography>
      <Typography className={classes.emailAndPhone}>
        {loggedInUser?.email ?? "email"}
      </Typography>
      <Typography className={classes.emailAndPhone}>
        {loggedInUser?.phone ?? "phone"}
      </Typography>
      <Grid container justifyContent="center">
      <Button href="/login">Sign out</Button>
</Grid>
   
    </Paper>
  );
}
