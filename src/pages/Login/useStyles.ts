import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  loginPaper: {
    padding: '3em',
    textAlign: 'center',
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    boxShadow: 'none',
    fontFamily: "'Open Sans'",
  },
  signup: {
    padding: '1.75em',
    margin: '1.5em',
  },
}));

export default useStyles;