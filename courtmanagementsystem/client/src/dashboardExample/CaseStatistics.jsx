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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  "#DAF7A6",
  "#FFC300",
  "#FF33A6",
];

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
        <p>{`Cases: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CaseStatistics = () => {
  const classes = useStyles();
  const theme = useTheme();

  const casesStatistics = useSelector((state) => state.casesStatistics);

  // const [suits, setSuits] = useState([]);
  // useEffect(() => {
  //   setSuits(
  //     pendingCases.filter(
  //       (item) =>
  //         item["Category Per PQS"] ===
  //         "Civil-001-Civil Suits (Original Jurisdiction)"
  //     )
  //   );
  // }, [pendingCases]);
  //   let pendingCasesData = [];
  const [pendingCasesStat, setPendingCasesStat] = useState([]);
  useEffect(() => {
    // console.log(casesStatistics);
    // if(casesStatistics?.pendingCases)
    if (casesStatistics && casesStatistics.length > 0) {
      // pendingCasesData = casesStatistics.map(item => item.pendingCases).flat()
      setPendingCasesStat(
        casesStatistics.map((item) => item.pendingCases).flat()
      );
      setPendingCasesStat((prevState) =>
        prevState.filter((caseItem) => caseItem.cases > 0)
      );
    }
    // console.log(pendingCasesData);
    // pendingCasesData.push(casesStatistics.pendingCases);
    // let arr = Object.values(pendingCasesData);

    //   data = [
    //     { name: "Suits", cases: pendingCasesData?.suits },
    //     { name: "Family", cases: pendingCasesData?.familyCases },
    //     { name: "Misc", cases: pendingCasesData?.applications },
    //     { name: "Custody of Miners", cases: pendingCasesData?.custodyOfMiners },
    //   ];
    // console.log(typeof pendingCasesData);
    // console.log(pendingCasesData);
    // console.log(pendingCasesData.length);
  }, [casesStatistics]);

  useEffect(() => {
    //   console.log(pendingCasesStat);
  }, [pendingCasesStat]);

  const pieData = [
    { name: "Suit", value: 400 },
    { name: "Family", value: 300 },
    { name: "Misc", value: 200 },
    { name: "Criminal", value: 100 },
  ];

  return pendingCasesStat.length === 0 ? (
    <Grid
      container
      justify="center"
      alignItems="center"
      //   style={{ height: "80vh", width: "80vw" }}
    >
      {/* <Grid item xs={12} sm={12} style={{ height: '100vh' }}> */}
      <CircularProgress />
      {/* </Grid> */}
    </Grid>
  ) : (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Cases Statistics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Total Cases by Type
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={pendingCasesStat}
                // className={classes.chartContainer}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                {/* <CartesianGrid ay="3strokeDasharr 3" /> */}
                {/* <CartesianGrid /> */}
                <XAxis
                  dataKey="name"
                  tick={{ angle: -30, textAnchor: "end" }}
                  interval={0}
                  height={80}
                />
                <YAxis />
                {/* <Tooltip /> */}
                <Tooltip content={<CustomTooltip theme={theme} />} />
                <Legend />
                {/* <Bar dataKey="cases" fill={theme.palette.primary.main} /> */}
                <Bar
                  dataKey="cases"
                  fill={theme.palette.primary.main}
                  background={{ fill: theme.palette.background.paper }}
                >
                  <LabelList
                    dataKey="cases"
                    position="top"
                    fill={theme.palette.text.primary}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Cases Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart className={classes.chartContainer}>
                <Pie
                  data={pendingCasesStat}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="cases"
                >
                  {pendingCasesStat.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                {/* <Tooltip /> */}
                <Tooltip content={<CustomTooltip theme={theme} />} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* <Grid item xs={12} md={12} lg={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Cases Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} className={classes.chartContainer}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke={theme.palette.primary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default CaseStatistics;
