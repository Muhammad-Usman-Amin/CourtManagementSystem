import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Grid,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Label,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getInstVsDispStats } from "../actions/cases";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
  },
  chartContainer: {
    margin: "0 auto",
  },
}));

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#B4FF33",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#F900A6",
  "#FFC300",
  "#FF33A6",
];

// const data = [
//   {
//     Month: "January",
//     Institutions: 40,
//     Disposal: 24,
//     // amt: 2400,
//   },
//   {
//     Month: "Feburary",
//     Institutions: 30,
//     Disposal: 13,
//     // amt: 2210,
//   },
//   {
//     Month: "March",
//     Institutions: 20,
//     Disposal: 78,
//     // amt: 2290,
//   },
//   {
//     Month: "April",
//     Institutions: 27,
//     Disposal: 39,
//     // amt: 2000,
//   },
//   {
//     Month: "May",
//     Institutions: 18,
//     Disposal: 48,
//     amt: 2181,
//   },
//   {
//     Month: "June",
//     Institutions: 23,
//     Disposal: 38,
//     amt: 2500,
//   },
//   {
//     Month: "July",
//     Institutions: 34,
//     Disposal: 98,
//     amt: 2100,
//   },
//   {
//     Month: "August",
//     Institutions: 31,
//     Disposal: 45,
//     amt: 2100,
//   },
//   {
//     Month: "September",
//     Institutions: 39,
//     Disposal: 27,
//     amt: 2100,
//   },
//   {
//     Month: "November",
//     Institutions: 49,
//     Disposal: 63,
//     amt: 2100,
//   },
//   {
//     Month: "December",
//     Institutions: 44,
//     Disposal: 51,
//     amt: 2100,
//   },
// ];

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 5,
          padding: 10,
          color: theme.palette.text.primary,
        }}
      >
        <p>{label}</p>
        <p style={{ color: "green" }}>{`Institutions: ${payload[0].value}`}</p>
        <p style={{ color: "red" }}>{`Disposals: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

const InstVsDispChart = () => {
  const classes = useStyles();
  const theme = useTheme();
  // const history = useHistory();
  const [year, setYear] = useState(new Date());

  const instVsDispStats = useSelector((state) => state.instVsDispStats);
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [year]);

  useEffect(() => {
    dispatch(
      getInstVsDispStats({ reqQuery: "InstVsDispStats", dateYear: year })
    );
  }, [year]);

  // useEffect(() => {
  //     console.log(instVsDispStats);
  // }, [instVsDispStats]);

  return instVsDispStats.length === 0 ? (
    // <div className={classes.root}>
    <>

      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={4}>
          <Typography variant="h5" gutterBottom>
            Institution & Disposal for the Year:
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} lg={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <KeyboardDatePicker
              // margin="normal"
              disableToolbar
              views={["year"]}
              id="date-picker-causeList"
              label="Select Year"
              autoOk
              variant="inline"
              format="yyyy"
              value={year}
              onChange={(date) => {
                setYear(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change year",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs="auto" md={6} lg={6}></Grid>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "50vh", width: "85vw" }}
      >
        <CircularProgress />
      </Grid>
    </>
    // </div>
  ) : (
    <div className={classes.root}>
      <Grid container justify="flex-end" alignItems="center" spacing={2}>
        <Grid item xs={6} md={4} lg={4}>
          <Typography variant="h5" gutterBottom>
            Institution & Disposal for the Year:
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} lg={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <KeyboardDatePicker
              // margin="normal"
              disableToolbar
              views={["year"]}
              id="date-picker-causeList"
              label="Select Year"
              autoOk
              variant="inline"
              format="yyyy"
              value={year}
              onChange={(date) => {
                setYear(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change year",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs="auto" md={6} lg={6}></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Monthly Institutions Vs Disposals
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                // width={500}
                // height={300}
                data={instVsDispStats}
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" />
                <YAxis>
                  <Label
                    angle={270}
                    position="insideLeft"
                    style={{
                      textAnchor: "middle",
                      fill: theme.palette.text.primary,
                    }}
                  >
                    Number of Cases
                  </Label>
                </YAxis>
                {/* <Tooltip /> */}
                <Tooltip content={<CustomTooltip theme={theme} />} />
                <Legend />
                <Bar
                  dataKey="Institutions"
                  fill="green"
                  // background={{ fill: theme.palette.background.paper }}
                  // activeBar={<Rectangle fill="pink" stroke="blue" />}
                >
                  <LabelList
                    dataKey="Institutions"
                    position="top"
                    fill={theme.palette.text.primary}
                  />
                </Bar>
                <Bar
                  dataKey="Disposals"
                  fill="red"
                  // activeBar={<Rectangle fill="gold" stroke="purple" />}
                >
                  <LabelList
                    dataKey="Disposals"
                    position="top"
                    fill={theme.palette.text.primary}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default InstVsDispChart;
