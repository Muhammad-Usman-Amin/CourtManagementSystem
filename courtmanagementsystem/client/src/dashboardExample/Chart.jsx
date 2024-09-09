import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import BarChartIcon from '@material-ui/icons/BarChart'; // Importing a bar chart icon
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  iconButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem', // Smaller font size for the text beside the icon
  },
  squareContainer: {
    position: "relative",
    // padding: theme.spacing(1),
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  iconTextWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: theme.spacing(1), // Space between the icon button and the text
    fontSize: '0.687rem',
  },
}));
// Generate Sales Data
// function createData(date, cases) {
//   return { date, cases };
// }

// Example data
// const casesData = [
//   { id: 1, name: "Case 1", institutionDate: "2024-03-01" },
//   { id: 2, name: "Case 2", institutionDate: "2024-03-01" },
//   { id: 3, name: "Case 3", institutionDate: "2024-03-02" },
//   { id: 4, name: "Case 4", institutionDate: "2024-03-02" },
//   { id: 5, name: "Case 5", institutionDate: "2024-03-02" },
// ];

// Process data to find number of cases instituted on each day
// const casesByDate = casesData.reduce((acc, cur) => {
//   const date = new Date(cur.institutionDate).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//   });
//   acc[date] = (acc[date] || 0) + 1;
//   return acc;
// }, {});

// // Convert the object to an array of objects with 'date' and 'amountOfCases' properties
// const result = Object.keys(casesByDate).map((date) => ({
//   date,
//   amountOfCases: casesByDate[date],
// }));

// console.log(result);

// const data = [
//   createData("1 Mar", 2),
//   createData("2 Mar", 3),
//   createData("3 Mar", 1),
//   createData("4 Mar", 0),
//   createData("5 Mar", 5),
//   createData("6 Mar", 4),
//   createData("7 Mar", 2),
//   createData("8 Mar", 2),
//   createData("9 Mar", 3),
//   createData("10 Mar", 5),
//   createData("11 Mar", 0),
//   createData("12 Mar", 2),
//   createData("13 Mar", 3),
//   createData("14 Mar", 5),
//   createData("15 Mar", 1),
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
        <p>{`Cases: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Chart() {
  const history = useHistory();
  const theme = useTheme();

  const institutionsStatistics = useSelector(
    (state) => state.institutionsStatistics
  );
  const handleGraphButtonClick = () => {
    history.push("/InstVsDispChart"); // Replace with the actual route to the graphs screen
  };
  // below is archived code which count cases submitted on each day
  // let lastEntries = cases.slice(-192);
  // // let lastEntries = cases;
  // lastEntries = lastEntries.sort(
  //   (a, b) =>
  //     new Date(a["Date of Institution "]) - new Date(b["Date of Institution "])
  // );

  // const casesByDate = lastEntries.reduce((acc, cur) => {
  //   const date = new Date(cur["Date of Institution "]).toLocaleDateString(
  //     "en-US",
  //     {
  //       month: "short",
  //       day: "numeric",
  //     }
  //   );
  //   acc[date] = (acc[date] || 0) + 1;
  //   return acc;
  // }, {});

  // // Convert the object to an array of objects with 'date' and 'amountOfCases' properties
  // const result = Object.keys(casesByDate).map((date) => ({
  //   date,
  //   Cases: casesByDate[date],
  // }));

  // console.log(result);
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.squareContainer}>
      <Title>Monthly Wise Pendency</Title>
      <div className={classes.iconTextWrapper}>
      <Button
        variant="outlined"
        // color="primary"
        size="small"
        onClick={handleGraphButtonClick}
        className={classes.iconButton}
        startIcon={<BarChartIcon />}
      >
        <span variant="body2" className={classes.iconText}>
        View Monthly Wise Institution Vs Disposal Chart
        </span>
      </Button>
      {/* <IconButton
          className={classes.iconButton}
          color="primary"
          // onClick={handleGraphButtonClick}
          title="View Monthly Wise Institution Vs Disposal Graph"
        >
          <BarChartIcon />
        <span variant="body2" className={classes.iconText}>
        View Monthly Wise Institution Vs Disposal Graph
        </span>
        </IconButton> */}
        </div>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={institutionsStatistics}
          margin={{
            top: 16,
            right: 16,
            bottom: 18,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            tick={{ angle: -60, textAnchor: "end" }}
            interval={0} // Ensures all labels are displayed
            height={60} // Increases height to provide more space for labels
          >
            <Label
              angle={0}
              position="insideBottom"
              offset={-15} //Adjusted the vertical position of the "Date" label
              style={{
                margin: 5,
                textAnchor: "middle",
                fill: theme.palette.text.primary,
              }}
            >
              Month
            </Label>
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            // tickFormatter={(value) => Math.ceil(value)} // Function to remove decimals
          >
            <Label
              angle={270}
              position="insideLeft"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Total Cases
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="cases"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          {/* <Tooltip /> */}
          <Tooltip content={<CustomTooltip theme={theme} />} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
