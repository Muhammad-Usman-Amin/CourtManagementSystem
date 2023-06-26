import React from "react";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const employeeData = useSelector((state) => state.employeeData);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Number of Employees</Title>
      <Typography component="p" variant="h2">
        {employeeData?.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {format(Date.now(), "dd MMMM, yyy")}
      </Typography>
      <div>
        <MuiLink
          color="primary"
          component={Link}
          to="EmployeeListTable"
          //   onClick={preventDefault}
        >
          View Employees
        </MuiLink>
      </div>
    </React.Fragment>
  );
}
