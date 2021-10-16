import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

export default function Register(): JSX.Element {
    const classes = useStyles();
    const history = useHistory();
    const { updateLoginContext } = useAuth();
    const { updateSnackBarMessage } = useSnackBar();

    const handleSubmit = (
        { username, email, password }: { email: string; password: string; username: string },
        { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
    ) => {
        register(username, email, password).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
                setSubmitting(false);
                updateSnackBarMessage(data.error.message);
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
                    <Paper className={classes.signupPager}>
                        <Grid container>
                            <Grid item xs>
                                <Typography className={classes.welcome} component="h1" variant="h5">
                                    SIGN UP
                                </Typography>
                            </Grid>
                        </Grid>
                        <SignUpForm handleSubmit={handleSubmit} />
                        <Typography>Already have an account?</Typography>
                        <Button color="primary" onClick={() => history.push('/login')}>
                            Click to Login
                        </Button>
                    </Paper>
                </Box>
                <Box p={1} alignSelf="center" />
            </Box>
        </Grid>
    );
}