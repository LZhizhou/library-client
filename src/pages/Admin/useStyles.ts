import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        '& .MuiInput-underline:before': {
          borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
          direction:"row",

        },
        
      },
}));

export default useStyles;