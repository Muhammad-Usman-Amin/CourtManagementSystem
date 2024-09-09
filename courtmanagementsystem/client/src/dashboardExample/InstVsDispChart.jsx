import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { selectPendingCases } from "../selectors/caseStatisticsSelector";

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
  "#F900A6",
  "#FFC300",
  "#FF33A6",
];

const data = [
  {
    Month: "January",
    Institutions: 40,
    Disposal: 24,
    // amt: 2400,
  },
  {
    Month: "Feburary",
    Institutions: 30,
    Disposal: 13,
    // amt: 2210,
  },
  {
    Month: "March",
    Institutions: 20,
    Disposal: 78,
    // amt: 2290,
  },
  {
    Month: "April",
    Institutions: 27,
    Disposal: 39,
    // amt: 2000,
  },
  {
    Month: "May",
    Institutions: 18,
    Disposal: 48,
    amt: 2181,
  },
  {
    Month: "June",
    Institutions: 23,
    Disposal: 38,
    amt: 2500,
  },
  {
    Month: "July",
    Institutions: 34,
    Disposal: 98,
    amt: 2100,
  },
  {
    Month: "August",
    Institutions: 31,
    Disposal: 45,
    amt: 2100,
  },
  {
    Month: "September",
    Institutions: 39,
    Disposal: 27,
    amt: 2100,
  },
  {
    Month: "November",
    Institutions: 49,
    Disposal: 63,
    amt: 2100,
  },
  {
    Month: "December",
    Institutions: 44,
    Disposal: 51,
    amt: 2100,
  },
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

const InstVsDispChart = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const instVsDispStats = useSelector((state) => state.instVsDispStats);

  // const pendingCasesFromRedux = useSelector(selectPendingCases);
  const [pendingCasesData, setPendingCasesData] = useState([]);

  // useEffect(() => {
  //   if (pendingCasesFromRedux) {
  //     setPendingCasesData(pendingCasesFromRedux);
  //   }
  // }, [pendingCasesFromRedux]);

  const handleBarClick = (data, index) => {
    // console.log(index);
    // console.log(data);
    // history.push(`/cases/${data.category}`);
    history.push(`/PrintGroupedCases/${data.name}`);
  };

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
  //   const [pendingCasesStat, setPendingCasesStat] = useState([]);
  //   useEffect(() => {
  //     // console.log(casesStatistics);
  //     // if(casesStatistics?.pendingCases)
  //     if (casesStatistics && casesStatistics.length > 0) {
  //       // pendingCasesData = casesStatistics.map(item => item.pendingCases).flat()
  //       setPendingCasesStat(
  //         casesStatistics.map((item) => item.pendingCases).flat()
  //       );
  //       setPendingCasesStat((prevState) =>
  //         prevState.filter((caseItem) => caseItem.cases > 0)
  //       );
  //     }
  //     // console.log(pendingCasesData);
  //     // pendingCasesData.push(casesStatistics.pendingCases);
  //     // let arr = Object.values(pendingCasesData);

  //     //   data = [
  //     //     { name: "Suits", cases: pendingCasesData?.suits },
  //     //     { name: "Family", cases: pendingCasesData?.familyCases },
  //     //     { name: "Misc", cases: pendingCasesData?.applications },
  //     //     { name: "Custody of Miners", cases: pendingCasesData?.custodyOfMiners },
  //     //   ];
  //     // console.log(typeof pendingCasesData);
  //     // console.log(pendingCasesData);
  //     // console.log(pendingCasesData.length);
  //   }, [casesStatistics]);

  useEffect(() => {
      console.log(instVsDispStats);
  }, [instVsDispStats]);
  //   useEffect(() => {
  //       console.log(pendingCasesStat);
  //   }, [pendingCasesStat]);

  //   const pieData = [
  //     { name: "Suit", value: 400 },
  //     { name: "Family", value: 300 },
  //     { name: "Misc", value: 200 },
  //     { name: "Criminal", value: 100 },
  //   ];

  return pendingCasesData.length == 0 ? (
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
      <Typography variant="h5" gutterBottom>
        Institution & Disposal this Year so far
      </Typography>

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
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
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
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Institutions"
                  fill="green"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                >
                  <LabelList
                    dataKey="Institutions"
                    position="top"
                    fill={theme.palette.text.primary}
                  />
                </Bar>
                <Bar
                  dataKey="Disposal"
                  fill="red"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                >
                  <LabelList
                    dataKey="Disposal"
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
