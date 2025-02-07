import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Grid,
  // useMediaQuery,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getDisposalCases, getInstitutionCases } from "../actions/cases";
import { useHistory } from "react-router-dom";

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
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  statBox: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  },
  statTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  paperLink: {
    // padding: theme.spacing(1),
    // color: theme.palette.text.secondary,
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[4],
    },
  },
}));

const MonthlyStats = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleInstButtonClick = () => {
    history.push("/CasesListTable", {
      tabValue: 2,
      dateSelected: selectedDate,
    }); // Replace with the actual route to the graphs screen
  };
  const handleDispButtonClick = () => {
    history.push("/CasesListTable", {
      tabValue: 3,
      dateSelected: selectedDate,
    }); // Replace with the actual route to the graphs screen
  };
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const getData = async (data) => {
    // console.log(data);
    dispatch(
      getInstitutionCases({
        reqQuery: "InstitutionCases",
        dateInstitution: data,
      })
    );
    dispatch(
      getDisposalCases({ reqQuery: "DisposalCases", dateDisposal: data })
    );
  };

  useEffect(() => {
    getData(selectedDate);
  }, [selectedDate]);

  const [totalInstitutionA, setTotalInstitutionA] = useState(0);
  const [totalRestoredRemandedA, setTotalRestoredRemandedA] = useState(0);
  const [totalDisposalsA, setTotalDisposalsA] = useState(0);
  const [totalTransferredInA, setTotalTransferredInA] = useState(0);
  const [totalTransferredOutA, setTotalTransferredOutA] = useState(0);
  const [totalContestedA, setTotalContestedA] = useState(0);
  const [totalTrialBasedA, setTotalTrialBasedA] = useState(0);
  const [totalUncontestedA, setTotalUncontestedA] = useState(0);
  const [totalInDefaultA, setTotalInDefaultA] = useState(0);
  const [totalDisposalPercentA, setTotalDisposalPercentA] = useState(0);

  const [totalIns, setTotalIns] = useState(0);
  const [totalRestoredRemanded, setTotalRestoredRemanded] = useState([]);
  const [totalContested, setTotalContested] = useState([]);
  const [totalTrialBased, setTotalTrialBased] = useState([]);
  const [totalUncontested, setTotalUncontested] = useState([]);
  const [totalInDefault, setTotalInDefault] = useState([]);
  const [totalDisposalPercent, setTotalDisposalPercent] = useState(0);

  const totalInstitutions = useSelector((state) => state.institutionCases);
  // const totalDisposal = useSelector((state) => state.disposalCases.length);
  const totalDisposal = useSelector((state) => state.disposalCases);
  const [totalTransferedOut, setTotalTransferedOut] = useState([]);
  const [totalTransferedIn, setTotalTransferedIn] = useState([]);

  useEffect(() => {
    setTotalIns(totalInstitutions.length);
    // console.log(totalInstitutions.length);
    setTotalRestoredRemanded(
      totalInstitutions.filter((item) => {
        // Extract month and year from field
        // let dateOfOtherInstitution;
        if (item?.["Institution Flag"] !== "") {
          const dateOfOtherInstitution = new Date(
            item["Date of Other Institution"]
          );
          const month = dateOfOtherInstitution.getMonth() + 1; // getMonth() returns 0-based index
          const year = dateOfOtherInstitution.getFullYear();

          // Get current month and year
          // const currentDate = new Date();
          const currentDate = selectedDate;
          const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-based index
          const currentYear = currentDate.getFullYear();

          // Return true if month and year match current month and year
          return month === currentMonth && year === currentYear;
        }
        return;
      })
    );

    // setTotalTransferedIn(totalInstitutions.filter(item => item['Date of Transfer In']));
    setTotalTransferedIn(
      totalInstitutions.filter((item) => {
        // Extract month and year from 'Date of Transfer In' field
        // let dateOfTransferIn;
        if (item?.["Date of Transfer In"]) {
          const dateOfTransferIn = new Date(item["Date of Transfer In"]);
          const month = dateOfTransferIn.getMonth() + 1; // getMonth() returns 0-based index
          const year = dateOfTransferIn.getFullYear();

          // Get current month and year
          const currentDate = selectedDate;
          const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-based index
          const currentYear = currentDate.getFullYear();

          // Return true if month and year match current month and year
          return month === currentMonth && year === currentYear;
        }
        return;
      })
    );
  }, [totalInstitutions, selectedDate]);

  useEffect(() => {
    setTotalTransferedOut(
      totalDisposal.filter(
        (item) => item["Disposal Mode Flag"] === "Transfer Out"
      )
    );
    return () => {
      // console.log('totalDisposal useeffect return called');
    };
  }, [totalDisposal, selectedDate]);

  useEffect(() => {
    // setTotalDisposalPercent((totalDisposal.length * 100) / totalInstitutions.length);
    const percent =
      totalInstitutions.length <= 0 || totalDisposal.length < 0
        ? 0
        : Math.round(((totalDisposal.length - totalTransferedOut.length) * 100) / (totalInstitutions.length - totalRestoredRemanded.length));
    setTotalDisposalPercent(percent);
  }, [totalInstitutions, totalDisposal, totalTransferedIn, totalRestoredRemanded, totalTransferedOut]);

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
  }, [totalDisposal, selectedDate]);

  const timerDuration = 1000;
  useEffect(() => {
    // console.log(totalInstitutions.length);
    const timer = setTimeout(() => {
      // console.log('This runs after 2 seconds');

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

      animateNumber(
        0,
        totalContested.length,
        setTotalContestedA,
        timerDuration
      );
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
      animateNumber(
        0,
        totalInDefault.length,
        setTotalInDefaultA,
        timerDuration
      );
      animateNumber(
        0,
        totalDisposalPercent,
        setTotalDisposalPercentA,
        timerDuration
      );
    }, 1500);
    // Cleanup the timer in case the component unmounts before the timeout finishes
    return () => clearTimeout(timer);
  }, [
    totalInDefault,
    totalInstitutions,
    totalDisposal,
    totalTransferedOut,
    totalTransferedIn,
    totalRestoredRemanded,
    selectedDate,
    totalInstitutions,
    totalDisposal,
    totalDisposalPercent,
  ]);

  const animateNumber = (start, end, setter, duration) => {
    // console.log(end);
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
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Typography variant="h6" className={classes.header}>
                  THIS MONTH'S TOTAL
                </Typography>
              </Grid>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                  <KeyboardDatePicker
                    // margin="normal"
                    views={["month"]}
                    id="date-picker-causeList"
                    label="Select Month"
                    autoOk
                    variant="inline"
                    // variant="dialog"
                    format="MMMM yyyy"
                    value={selectedDate}
                    onChange={(date) => {
                      // setCaseId(caseFile._id);
                      // setCurrentId(caseFile._id);
                      setSelectedDate(date);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: "10px" }}>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Fresh Institutions
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalInstitutionA -
                      (totalTransferredInA + totalRestoredRemandedA)}
                    {/* (totalTransferedIn + totalRestoredRemanded)} */}
                  </Typography>
                  {/* <Typography className={classes.statValue}>{totalInstitutionA}</Typography> */}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
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
                    Transferred In
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalTransferredInA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper
                  // className={classes.statBox}
                  className={`${classes.statBox} ${classes.paperLink}`}
                  onClick={handleInstButtonClick}
                >
                  <Typography className={classes.statTitle}>
                    Total Institutions
                  </Typography>
                  <Typography className={classes.statValue} style={{ fontWeight: "bold", color: "green" }}>
                    {totalInstitutionA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper
                  // className={classes.statBox}
                  className={`${classes.statBox} ${classes.paperLink}`}
                  onClick={handleDispButtonClick}
                >
                  <Typography className={classes.statTitle}>
                    Disposals
                  </Typography>
                  <Typography className={classes.statValue} style={{ fontWeight: "bold", color: "red" }}>
                    {totalDisposalsA - totalTransferredOutA}
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
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Total Contested
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalContestedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Trial Based
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalTrialBasedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Non-Trial Based
                  </Typography>
                  <Typography className={classes.statValue}>
                    {isNaN(totalContestedA - totalTrialBasedA)
                      ? null
                      : totalContestedA - totalTrialBasedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    Uncontested
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalUncontestedA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography className={classes.statTitle}>
                    In Default
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalInDefaultA}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper className={classes.statBox}>
                  <Typography
                    className={classes.statTitle}
                    style={{ fontSize: "0.9rem" }}
                  >
                    Disposal % (Req 110%)
                  </Typography>
                  <Typography className={classes.statValue}>
                    {totalDisposalPercentA}%
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
