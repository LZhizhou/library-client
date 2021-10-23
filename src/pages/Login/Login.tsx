import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@mui/material/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import React from 'react';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { username, password }: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>,
  ) => {
    login(username, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Box width="100%" className={classes.authWrapper}>
        <Box width="100%" maxWidth={450} p={3} alignSelf="center">
          <Paper className={classes.loginPaper}>
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  SIGN IN
                </Typography>
              </Grid>
            </Grid>
            <LoginForm handleSubmit={handleSubmit} />
            <Typography>Don't have An account Yet?</Typography>
            <Button color="primary" onClick={() => history.push('/signup')}>
              Sign up now
            </Button>
          </Paper>
        </Box>
        <Box p={1} alignSelf="center" />
      </Box>
    </Grid>
  );
}