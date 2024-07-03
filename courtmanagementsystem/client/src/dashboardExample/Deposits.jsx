import React, { useEffect, useState, useRef } from "react";
import MuiLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, IconButton } from "@material-ui/core";
import BarChartIcon from '@material-ui/icons/BarChart'; // Importing a bar chart icon

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  iconButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  squareContainer: {
    position: "relative",
    padding: theme.spacing(2),
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

export default function Deposits() {
  const pendingCases = useSelector((state) => state.pendingCases);
  const [totalPending, setTotalPending] = useState(0);

  const isMounted = useRef(false);
  const timerDuration = 1500;
  useEffect(() => {
    animateNumber(0, pendingCases.length, setTotalPending, timerDuration);
  }, [pendingCases]);

  useEffect(() => {
    isMounted.current = true;
    animateNumber(0, pendingCases.length, setTotalPending, timerDuration);

    return () => {
      isMounted.current = false;
    };
  }, [pendingCases]);

  const animateNumber = (start, end, setter, duration) => {
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    const runAnimation = () => {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - remaining * range);
      // setter(value);
      // if (value !== end) {
      //   timer = setTimeout(runAnimation, stepTime);
      // }
      if (isMounted.current) {
        setter(value);
      }
      if (value !== end && isMounted.current) {
        timer = setTimeout(runAnimation, stepTime);
      }
    };

    runAnimation();
    return () => clearTimeout(timer);
  };

  // const dispatch = useDispatch();
  const history = useHistory();

  const handleGraphButtonClick = () => {
    history.push("/CaseStatistics"); // Replace with the actual route to the graphs screen
  };

  const classes = useStyles();
  return !pendingCases.length ? (
    <CircularProgress />
  ) : (
    <React.Fragment>
      <div className={classes.squareContainer}>
        <IconButton
          className={classes.iconButton}
          color="primary"
          onClick={handleGraphButtonClick}
          title="View Graphs"
        >
          <BarChartIcon />
        </IconButton>
        <Title>Total Pending Cases</Title>
        <Typography component="p" variant="h2">
          {totalPending}
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          as of {format(Date.now(), "dd MMMM, yyy")}
        </Typography>
        <div>
          <MuiLink
            color="primary"
            component={Link}
            to="CasesListTable"
          >
            View Cases
          </MuiLink>
        </div>
      </div>
    </React.Fragment>
  );
}





// import React, {useEffect, useState } from "react";
// import MuiLink from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Title from "./Title";
// import { useSelector } from "react-redux";
// import { format} from "date-fns";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getPendingCases } from "../actions/cases";
// import { Button, CircularProgress } from "@material-ui/core";

// // function preventDefault(event) {
// //   event.preventDefault();
// // }

// const useStyles = makeStyles({
//   depositContext: {
//     flex: 1,
//   },
// });



// export default function Deposits() {
//   const pendingCases = useSelector((state) => state.pendingCases);
//   const [totalPending, setTotalPending] = useState(0);

//   const timerDuration = 2000;
//   useEffect(() => {
//     animateNumber(0, pendingCases.length, setTotalPending, timerDuration);
//   }, [pendingCases]);

//   const animateNumber = (start, end, setter, duration) => {
//     const range = end - start;
//     const stepTime = Math.abs(Math.floor(duration / range));
//     const startTime = new Date().getTime();
//     const endTime = startTime + duration;
//     let timer;

//     const runAnimation = () => {
//       const now = new Date().getTime();
//       const remaining = Math.max((endTime - now) / duration, 0);
//       const value = Math.round(end - (remaining * range));
//       setter(value);
//       if (value !== end) {
//         timer = setTimeout(runAnimation, stepTime);
//       }
//     };

//     runAnimation();
//     return () => clearTimeout(timer);
//   };
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(getPendingCases({reqQuery:"PendingCases"}));
//   // }, []);
  
//   // console.log(pendingCases);
//   const classes = useStyles();
//   return !pendingCases.length ? (
//     <CircularProgress />
//   ) : (
//     <React.Fragment>
//       <Title>Total Pending Cases</Title>
//       <Typography component="p" variant="h2">
//         {/* {pendingCases.length} */}
//         {totalPending}
//       </Typography>
//       <Typography color="textSecondary" className={classes.depositContext}>
//         as of {format(Date.now(), "dd MMMM, yyy")}
//       </Typography>
//       <div style={{backgroundColor: 'red'}}>
//         <MuiLink
//           color="primary"
//           component={Link}
//           to="CasesListTable"
//           //   onClick={preventDefault}
//         >
//           View Cases
//         </MuiLink>
//       </div>
//     </React.Fragment>
//   );
// }
