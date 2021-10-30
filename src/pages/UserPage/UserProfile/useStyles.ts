import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    "& .MuiInput-underline:before": {
      borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)",
    },
  },
  userImage: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  username: {
    textAlign: "center",
    variant: "h6",
  },
  emailAndPhone: {
    textAlign: "center",
    variant: "subtitle2",
  },
}));

export default useStyles;
