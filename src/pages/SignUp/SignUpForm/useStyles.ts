import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
  },
  inputs: {
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    padding: 10,
    width: 160,
    height: 56,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default useStyles;