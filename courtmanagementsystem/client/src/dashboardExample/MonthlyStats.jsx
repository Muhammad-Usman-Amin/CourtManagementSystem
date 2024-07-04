import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Grid,
  // useMediaQuery,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  statBox: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  },
  statTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
}));

const MonthlyStats = () => {
  const classes = useStyles();
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [totalInstitutionA, setTotalInstitutionA] = useState(0);
  const [totalRestoredRemandedA, setTotalRestoredRemandedA] = useState(0);
  const [totalDisposalsA, setTotalDisposalsA] = useState(0);
  const [totalTransferredInA, setTotalTransferredInA] = useState(0);
  const [totalTransferredOutA, setTotalTransferredOutA] = useState(0);
  const [totalContestedA, setTotalContestedA] = useState();
  const [totalTrialBasedA, setTotalTrialBasedA] = useState();
  const [totalUncontestedA, setTotalUncontestedA] = useState();
  const [totalInDefaultA, setTotalInDefaultA] = useState();

  const [totalIns, setTotalIns] = useState(0);
  const [totalRestoredRemanded, setTotalRestoredRemanded] = useState([]);
  const [totalContested, setTotalContested] = useState([]);
  const [totalTrialBased, setTotalTrialBased] = useState([]);
  const [totalUncontested, setTotalUncontested] = useState([]);
  const [totalInDefault, setTotalInDefault] = useState([]);

  const totalInstitutions = useSelector((state) => state.institutionCases);
  // const totalDisposal = useSelector((state) => state.disposalCases.length);
  const totalDisposal = useSelector((state) => state.disposalCases);
  const [totalTransferedOut, setTotalTransferedOut] = useState([]);
  const [totalTransferedIn, setTotalTransferedIn] = useState([]);

  useEffect(() => {
    setTotalIns(totalInstitutions.length);
    setTotalRestoredRemanded(
      totalInstitutions.filter((item) => item?.["Institution Flag"] !== "")
    );

    setTotalTransferedOut(
      totalInstitutions.filter(
        (item) => item["Disposal Mode Flag"] === "Transfer Out"
      )
    );
    // setTotalTransferedIn(totalInstitutions.filter(item => item['Date of Transfer In']));
    setTotalTransferedIn(
      totalInstitutions.filter((item) => {
        // Extract month and year from 'Date of Transfer In' field
        const dateOfTransferIn = new Date(item["Date of Transfer In"]);
        const month = dateOfTransferIn.getMonth() + 1; // getMonth() returns 0-based index
        const year = dateOfTransferIn.getFullYear();

        // Get current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-based index
        const currentYear = currentDate.getFullYear();

        // Return true if month and year match current month and year
        return month === currentMonth && year === currentYear;
      })
    );
  }, [totalInstitutions]);

  // useEffect(()=> {
  //   // console.log(totalRestoredRemanded);
  //   console.log(totalTransferedIn.length);
  //   setTotalIns(totalIns - (totalRestoredRemanded.length + totalTransferedIn.length));
  // },[ totalRestoredRemanded, totalTransferedIn])

  // useEffect(()=> {
  //     console.log(totalIns);
  //   },[totalIns])

  // useEffect(()=> {
  //   console.log(totalRestoredRemanded);
  // },[totalRestoredRemanded])
  //   useEffect(()=> {
  //     console.log(totalTransferedOut);
  //   },[totalTransferedOut])

  //   useEffect(()=> {
  //     console.log(totalTransferedIn);
  //   },[totalTransferedIn])

  useEffect(() => {
    setTotalContested(
      totalDisposal.filter((item) =>
        item["Disposal Mode Flag"].includes("Contested-")
      )
    );
    setTotalTrialBased(
      totalDisposal.filter((item) =>
        item["Disposal Mode Flag"].includes("Contested-Trial Based")
      )
    );
    setTotalUncontested(
      totalDisposal.filter((item) =>
        item["Disposal Mode Flag"].includes("Uncontested")
      )
    );
    setTotalInDefault(
      totalDisposal.filter((item) =>
        item["Disposal Mode Flag"].includes("In Default")
      )
    );
  }, [totalDisposal]);

  const timerDuration = 1000;
  useEffect(() => {
    animateNumber(
      0,
      totalInstitutions.length,
      setTotalInstitutionA,
      timerDuration
    );
    // animateNumber(0, totalIns, setTotalInstitutionA, timerDuration);
    animateNumber(
      0,
      totalRestoredRemanded.length,
      setTotalRestoredRemandedA,
      timerDuration
    );
    animateNumber(0, totalDisposal.length, setTotalDisposalsA, timerDuration);
    animateNumber(
      0,
      totalTransferedIn.length,
      setTotalTransferredInA,
      timerDuration
    );
    animateNumber(
      0,
      totalTransferedOut.length,
      setTotalTransferredOutA,
      timerDuration
    );

    animateNumber(0, totalContested.length, setTotalContestedA, timerDuration);
    animateNumber(
      0,
      totalTrialBased.length,
      setTotalTrialBasedA,
      timerDuration
    );
    animateNumber(
      0,
      totalUncontested.length,
      setTotalUncontestedA,
      timerDuration
    );
    animateNumber(0, totalInDefault.length, setTotalInDefaultA, timerDuration);
  }, [
    totalInDefault,
    totalInstitutions,
    totalDisposal,
    totalTransferedOut,
    totalTransferedIn,
    totalRestoredRemanded,
  ]);

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
      setter(value);
      if (value !== end) {
        timer = setTimeout(runAnimation, stepTime);
      }
    };

    runAnimation();
    return () => clearTimeout(timer);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.header}>
              THIS MONTH'S TOTAL
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Fresh Institutions
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalInstitutionA -
                      (totalTransferredInA + totalRestoredRemandedA)}
                  </Typography>
                  {/* <Typography className={classes.statValue}>{totalInstitutionA}</Typography> */}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Restored/Remanded
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalRestoredRemandedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Disposals
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalDisposalsA - totalTransferredOutA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Transferred In
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalTransferredInA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Transferred Out
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalTransferredOutA}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography variant="h6" className={classes.header}>
              Disposals
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Total Contested
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalContestedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Trial Based
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalTrialBasedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Uncontested
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalUncontestedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    In Default
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalInDefaultA}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MonthlyStats;
