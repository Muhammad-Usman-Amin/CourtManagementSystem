import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Chart from "./Chart";
import Deposits from "./Deposits";
import RecentCases from "./RecentCases";
import useStyles from "./dashboard";
import { useDispatch, useSelector } from "react-redux";
// import store from '../index';
import MonthlyStats from "./MonthlyStats";
import { getControlCenter } from "../actions/controlCenter";
import {
  getCasesStatistics,
  getDisposalCases,
  getGroupedCases,
  getInstitutionCases,
  getInstitutionsStatistics,
  getInstVsDispStats,
  getPendingCases,
} from "../actions/cases";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/PlayU2U">
        PlayU2U
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// function openFindWindow() {
//   const event = new KeyboardEvent('keydown', {
//     ctrlKey: true,
//     key: 'f',
//     shiftKey: false,
//     altKey: false,
//     metaKey: false,
//   });

//   document.dispatchEvent(event);
// }
const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     toolbar: {
//         paddingRight: 24, // keep right padding when drawer closed
//     },
//     toolbarIcon: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         padding: '0 8px',
//         ...theme.mixins.toolbar,
//     },
//     appBar: {
//         zIndex: theme.zIndex.drawer + 1,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//     },
//     appBarShift: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     },
//     menuButton: {
//         marginRight: 36,
//     },
//     menuButtonHidden: {
//         display: 'none',
//     },
//     title: {
//         flexGrow: 1,
//     },
//     drawerPaper: {
//         position: 'relative',
//         whiteSpace: 'nowrap',
//         width: drawerWidth,
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     },
//     drawerPaperClose: {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//             width: theme.spacing(9),
//         },
//     },
//     appBarSpacer: theme.mixins.toolbar,
//     content: {
//         flexGrow: 1,
//         height: '100vh',
//         overflow: 'auto',
//     },
//     container: {
//         paddingTop: theme.spacing(4),
//         paddingBottom: theme.spacing(4),
//     },
//     paper: {
//         padding: theme.spacing(2),
//         display: 'flex',
//         overflow: 'auto',
//         flexDirection: 'column',
//     },
//     fixedHeight: {
//         height: 240,
//     },
// }));

export default function Dashboard({ onPageChange }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const employeeData = useSelector((state) => state.employeeData);
  // const cases = useSelector((state) => state.cases);
  useEffect(() => {
    onPageChange("Dashboard");
  }, [onPageChange]);

  useEffect(() => {
    dispatch(getControlCenter());
    dispatch(getInstitutionsStatistics({ reqQuery: "InstitutionsStatistics" }));
    dispatch(
      getPendingCases({ reqQuery: "PendingCases", datePendency: new Date() })
    );
    dispatch(
      getGroupedCases({ reqQuery: "GroupedCases", datePendency: new Date() })
    );
    dispatch(
      getInstitutionCases({
        reqQuery: "InstitutionCases",
        dateInstitution: new Date(),
      })
    );
    dispatch(
      getDisposalCases({ reqQuery: "DisposalCases", dateDisposal: new Date() })
    );
    dispatch(getCasesStatistics({ reqQuery: "CaseStatistics" }));
    dispatch(
      getInstVsDispStats({ reqQuery: "InstVsDispStats", dateYear: new Date() })
    );
  }, []);

  // const [shouldRefresh, setShouldRefresh] = useState(true); // Replace with your condition
  // useEffect(() => {
  //   // Check some condition (e.g., user navigates to a specific page)

  //   if (shouldRefresh) {
  //     window.location.reload();
  //     setShouldRefresh(false);
  //   }
  // }, []);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <MonthlyStats />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>{/* <CaseStatistics /> */}</Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecentCases />
          </Paper>
        </Grid>
      </Grid>
      {/* <React.Fragment container xs={12} md={12} lg={12}>
          <CaseStatistics />
        </React.Fragment> */}

      {/* <Grid item xs={6} md={6}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => console.log(employeeData)}
        >
          employeeData
        </Button>
        <Button fullWidth variant="outlined" onClick={() => console.log(cases)}>
          Cases Data
        </Button>
        {/* <Button fullWidth variant='outlined' onClick={() => console.log(store.getState())}>Store State</Button>
      </Grid>*/}
      {/* <Button fullWidth variant="outlined" onClick={openFindWindow}>Open Find Window</Button> */}
      <Box pt={4}>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
