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

// Generate Sales Data
function createData(date, cases) {
  return { date, cases };
}

// Example data
const casesData = [
  { id: 1, name: "Case 1", institutionDate: "2024-03-01" },
  { id: 2, name: "Case 2", institutionDate: "2024-03-01" },
  { id: 3, name: "Case 3", institutionDate: "2024-03-02" },
  { id: 4, name: "Case 4", institutionDate: "2024-03-02" },
  { id: 5, name: "Case 5", institutionDate: "2024-03-02" },
];

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

const data = [
  createData("1 Mar", 2),
  createData("2 Mar", 3),
  createData("3 Mar", 1),
  createData("4 Mar", 0),
  createData("5 Mar", 5),
  createData("6 Mar", 4),
  createData("7 Mar", 2),
  createData("8 Mar", 2),
  createData("9 Mar", 3),
  createData("10 Mar", 5),
  createData("11 Mar", 0),
  createData("12 Mar", 2),
  createData("13 Mar", 3),
  createData("14 Mar", 5),
  createData("15 Mar", 1),
];

export default function Chart() {
  const theme = useTheme();

  const cases = useSelector((state) => state.cases);
  let lastEntries = cases.slice(-50);
  lastEntries = lastEntries.sort(
    (a, b) =>
      new Date(a["Date of Institution "]) - new Date(b["Date of Institution "])
  );

  const casesByDate = lastEntries.reduce((acc, cur) => {
    const date = new Date(cur["Date of Institution "]).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Convert the object to an array of objects with 'date' and 'amountOfCases' properties
  const result = Object.keys(casesByDate).map((date) => ({
    date,
    Cases: casesByDate[date],
  }));

  console.log(result);

  return (
    <React.Fragment>
      <Title>Cases Submitted on a Day</Title>
      <ResponsiveContainer>
        <LineChart
          data={result}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary}>
            <Label
              angle={0}
              position="insideBottom"
              style={{
                margin: 5,
                textAnchor: "middle",
                fill: theme.palette.text.primary,
              }}
            >
              Date
            </Label>
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Number of Cases
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="Cases"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
