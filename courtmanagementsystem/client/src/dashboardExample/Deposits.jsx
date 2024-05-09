import React, {useEffect } from "react";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";
import { format} from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPendingCases } from "../actions/cases";
import { CircularProgress } from "@material-ui/core";

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});



export default function Deposits() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPendingCases({reqQuery:"PendingCases"}));
  // }, []);
  
  const pendingCases = useSelector((state) => state.pendingCases);
  // console.log(pendingCases);
  const classes = useStyles();
  return !pendingCases.length ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Title>Total Pending Cases</Title>
      <Typography component="p" variant="h2">
        {pendingCases.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        as of {format(Date.now(), "dd MMMM, yyy")}
      </Typography>
      <div>
        <MuiLink
          color="primary"
          component={Link}
          to="CasesListTable"
          //   onClick={preventDefault}
        >
          View Cases
        </MuiLink>
      </div>
    </React.Fragment>
  );
}
