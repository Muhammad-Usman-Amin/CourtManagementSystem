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
import { parseISO, format as dateFnsFormat, isValid } from "date-fns";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[4],
    },
  },
}));

const DailyTotalCases = ({ onPageChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rangeData = useSelector((state) => state.rangeCauseLists);

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
            <Grid
              item
              xs={6}
              sm={2}
              key={day.date}
              onClick={() => handleDateClick(day.date)}
            >
              <Paper className={classes.paper}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  {isValid(parseISO?.(day?.date))
                    ? dateFnsFormat(parseISO(day?.date), "dd-MM-yyyy")
                    : "Invalid Date"}{" "}
                  |{" "}
                  {isValid(new Date(day?.date))
                    ? new Date(day?.date).toLocaleDateString("ur", {
                        weekday: "long",
                      })
                    : "Invalid Date"}
                </Typography>
                <Divider></Divider>
                <Typography variant="body1">
                  Total Cases:{" "}
                  <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {day.data ? day.data.length : "N/A"}
                  </span>
                </Typography>
                <Typography variant="body2">
                  Attendance: {day.attendance ?? "N/A"}
                </Typography>
                <Typography variant="body2">
                  Evidence: {day.evidence ?? "N/A"}
                </Typography>
                <Typography variant="body2">
                  Arguments: {day.argument ?? "N/A"}
                </Typography>
                <Typography variant="body2">
                  Order Total: {day.order ?? "N/A"}
                </Typography>
                <Typography variant="body2">
                  Order On Application: {day.orderOnApplication ?? "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: day.finalOrder > 0 ? "red" : "inherit" }}
                >
                  Final Order: {day.finalOrder ?? "N/A"}
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
