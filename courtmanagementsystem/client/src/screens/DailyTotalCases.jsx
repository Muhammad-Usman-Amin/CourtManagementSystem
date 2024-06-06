// // import React, { useState, useEffect } from 'react';
// // import { Box, Typography, Grid, Card, CardContent, CardHeader } from '@material-ui/core';

// // const DailyTotalCases = () => {
// //   const [dailyCases, setDailyCases] = useState([
// //     { day: 'Saturday', totalCases: 15, attendance: 8, evidence: 4, order: 3 },
// //     { day: 'Monday', totalCases: 13, attendance: 7, evidence: 3, order: 3 },
// //     { day: 'Tuesday', totalCases: 18, attendance: 10, evidence: 5, order: 3 },
// //     // ... Add data for the next 27 days (replace with your actual data)
// //   ]);

// //   return (
// //     <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
// //       {dailyCases.slice(0, 30).map((dayData, index) => (
// //         <Card key={index} sx={{ width: 200, margin: 1 }}>
// //           <CardHeader title={`Day ${index + 1} - ${dayData.day}`} />
// //           <CardContent>
// //             <Typography variant="body2">Total Cases: {dayData.totalCases}</Typography>
// //             <Grid container spacing={1}>
// //               <Grid item xs={6}>
// //                 <Typography variant="caption">Attendance</Typography>
// //                 <Typography variant="body2">{dayData.attendance}</Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography variant="caption">Evidence</Typography>
// //                 <Typography variant="body2">{dayData.evidence}</Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography variant="caption">Order</Typography>
// //                 <Typography variant="body2">{dayData.order}</Typography>
// //               </Grid>
// //             </Grid>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </Box>
// //   );
// // };

// // export default DailyTotalCases;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRangeCauseLists } from "../actions/causeLists";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[4],
    },
  },
}));

const daysData = [
  { day: "پیر", total: 13, attendance: 5, evidence: 4, order: 4 },
  { day: "منگل", total: 20, attendance: 7, evidence: 6, order: 7 },
  { day: "بدھ", total: 13, attendance: 5, evidence: 4, order: 4 },
  { day: "جمرات", total: 20, attendance: 7, evidence: 6, order: 7 },
  { day: "جمعہ", total: 13, attendance: 5, evidence: 4, order: 4 },
  { day: "ہفتہ", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "پیر", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "منگل", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "بدھ", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "جمعرات", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "جمعہ", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "ہفتہ", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "پیر", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "منگل", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "بدھ", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "جمرات", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "جمعہ", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "ہفتہ", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "پیر", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "منگل", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "بدھ", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "جمعرات", total: 13, attendance: 5, evidence: 4, order: 4 },
  //   { day: "جمعہ", total: 20, attendance: 7, evidence: 6, order: 7 },
  //   { day: "ہفتہ", total: 13, attendance: 5, evidence: 4, order: 4 },
  // Add data for other days here...
];

const DailyTotalCases = ({ onPageChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rangeData = useSelector((state) => state.rangeCauseLists);

  //   useEffect(()=> {
  //     if(data)
  //     console.log(data);
  //   },[data])

  useEffect(() => {
    dispatch(getRangeCauseLists({ range: "range" }));
  }, [dispatch]);
  useEffect(() => {
    onPageChange("Daily Total Cases");
  }, [onPageChange]);

  const history = useHistory();
  const handleDateClick = (date) => {
    history.push({
      pathname: "/CauseLists",
      state: { selectedDate: date },
    });
  };

  return !rangeData.length ? (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "75vh", width: "75vw" }}
    >
      <CircularProgress />
    </Grid>
  ) : (
    <>
      <div className={classes.root}>
        <Grid container spacing={1}>
          {rangeData.map((day) => (
            <Grid item xs={6} sm={2} key={day.date} onClick={() => handleDateClick(day.date)}>
              <Paper className={classes.paper}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  {format?.(parseISO?.(day?.date), "dd-MM-yyy")} |
                  {new Date(day?.date).toLocaleDateString("ur", {
                    weekday: "long",
                  })}
                  {/* {day.date} | دن */}
                </Typography>
                <Divider></Divider>
                <Typography variant="body1">
                  Total Cases:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {day.data.length}
                  </span>
                </Typography>
                <Typography variant="body2">
                  Attendance: {day.attendance}
                </Typography>
                <Typography variant="body2">
                  Evidence: {day.evidence}
                </Typography>
                <Typography variant="body2">
                  Arguments: {day.argument}
                </Typography>
                <Typography variant="body2">
                  Order Total: {day.order}
                </Typography>
                <Typography variant="body2">
                  Order On Application: {day.orderOnApplication}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: day.finalOrder > 0 ? "red" : "inherit" }}
                >
                  Final Order: {day.finalOrder}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default DailyTotalCases;

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { Typography, Paper, Grid } from "@material-ui/core";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRangeCauseLists } from "../actions/causeLists";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(1),
//     // textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));

// const daysData = [
//   // ... your data here
// ];

// const DailyTotalCases = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const rangeData = useSelector((state) => state.rangeCauseLists);

//   useEffect(() => {
//     dispatch(getRangeCauseLists({ range: "range" }));
//   }, [dispatch]);

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={1}>
//         {rangeData.map((day, index) => {
//           let att = 1; // Declare and initialize att to 0 for each iteration
//           let evd = 1; // Declare and initialize evd to 0 for each iteration
//           let arg = 1; // Declare and initialize arg to 0 for each iteration
//           let ord = 1; // Declare and initialize ord to 0 for each iteration

//           return (
//             <Grid item xs={6} sm={2} key={day.date}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   {day.date} | دن
//                 </Typography>
//                 <Typography variant="body1">
//                   Total Cases:{" "}
//                   <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
//                     {day.data.length}
//                   </span>
//                 </Typography>
//                 <Typography>
//                 Attendance: {day.data.map((file) => (
//                   file.actionAbstract.includes('حاضری') && (att+=1)
//                 ))}{att}
//                 </Typography>
//                 {/* Use att, evd, arg, and ord for your calculations or logging */}
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </div>
//   );
// };

// export default DailyTotalCases;
