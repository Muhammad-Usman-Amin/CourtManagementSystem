import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  // FormControlLabel,
  FormControl,
  // FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
//CircularProgress,

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCase } from "../../actions/cases";
import { getCauseList } from "../../actions/causeLists";
// import useStyles2 from "../../dashboardExample/dashboard";
import { addDays } from "date-fns";
import { useLocation } from "react-router-dom";
import { serialNumbers, selectCauseListCases } from "../../selectors/caseStatisticsSelector";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
  boldThis: {
    fontWeight: "bold",
  },
  uFont: {
    fontFamily: "Jameel Noori Nastaleeq",
    fontSize: 20,
    direction: "rtl",
  },
});

const CauseList = ({ currentId, setCurrentId, onPageChange }) => {
  // const classes2 = useStyles2();

  // const cases = useSelector((state) => state.cases);
  // const cases = useSelector((state) => state.causeLists);
  // const cases = useSelector(selectCauseListCases);
  const cases = useSelector((state) => state.causeLists.cases);
  const serialNumbers = useSelector((state) => state.causeLists.serialNumbers);

  const location = useLocation();
  const selectedDate = location.state?.selectedDate ? new Date(location.state.selectedDate) : new Date();
  // console.log(selectedDate);

  // console.log(cases);
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [orderDate, setOrderDate] = useState(new Date("2023-06-19"));
  // const [dateCauseList, setDateCauseList] = useState(addDays(new Date(), 0));
  const [dateCauseList, setDateCauseList] = useState(selectedDate);
  const [orderDate, setOrderDate] = useState(dateCauseList);
  useEffect(() => {
    setOrderDate(dateCauseList);
  }, [dateCauseList]);

  // const [nextDate, setNextDate] = useState(new Date());
  // const [caseData, setCaseData] = useState({
  //   orderDate: new Date(), orderNumber: '', nextDate: nextDate, actionAbstract: '',
  // });
  const [orderNumber] = useState({
    orderDate: orderDate,
    orderNumber: "",
  });
  const [actionAbstract, setActionAbstract] = useState({
    orderDate: orderDate,
    actionAbstract: "",
  });
  const [nextDate, setNextDate] = useState({
    orderDate: orderDate,
    nextDate: new Date(),
  });
  // const [caseData, setCaseData] = useState({
  //   causeListEntries: {
  //     causeListEntry: {
  //       orderNumber: '',
  //       nextDate: Date,
  //       actionAbstract: '',
  //     }
  //   }
  // });
  const [caseId, setCaseId] = useState(null);

  // useEffect(() => {
  //   console.log(typeof cases);
  // }, []);

  const handleSubmit = async (data) => {
    // console.log(e.target.value);
    console.log(data);
    // cases.forEach(caseFile => {
    //   if (caseFile._id === caseId) {
    //     // console.log(caseFile._id === caseId);
    //     setNextDate(caseFile.nextDate);
    //     setCaseData({ ...caseData, nextDate: nextDate });
    //   }
    // });
    // console.log(data);
    dispatch(updateCase(caseId, data));
    console.log(cases);
  };

  useEffect(() => {
    onPageChange("Daily Cause List");
    // dispatch(getCauseList(params));
  }, [onPageChange]);

  useEffect(() => {
    // console.log("orederNumber onblurred useEffectcalled:" + orderNumber);
    if (caseId) handleSubmit(orderNumber);
  }, [orderNumber]);

  useEffect(() => {
    if (caseId) handleSubmit(actionAbstract);
  }, [actionAbstract]);

  useEffect(() => {
    if (caseId) handleSubmit(nextDate);
  }, [nextDate]);

  const [serialNo, setSerialNo] = useState([]);
  let index = 0;
  // const [ind, setInd] = useState(0);
  // let sno = [];
  useEffect(() => {
    index = 0;
    dispatch(getCauseList({ dateCauseList: dateCauseList }));
  }, [dispatch, dateCauseList]);

  useEffect(() => {
    dispatch(getCauseList({ dateCauseList: dateCauseList }));
  }, []);
  useEffect(() => {
    console.log(cases);
    for (let i = 1; i <= cases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    // console.log(serialNo);
  }, [cases]);
  useEffect(() => {
    for (let i = 1; i <= cases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    // console.log(serialNo);
  }, [dateCauseList]);

  function getSecondToLastElementCategory(array) {
    if (array.length === 0) {
      return null;
    }
    if (array.length > 1) {
      if (
        new Date(array[array.length - 1].orderDate).toDateString() ===
        new Date(orderDate).toDateString()
      ) {
        // console.log(
        //   new Date(array[array.length - 1].orderDate).toDateString() ===
        //     new Date(orderDate).toDateString()
        // );
        return array[array.length - 2];
      }
    }
    // console.log("-1 exec");
    return array[array.length - 1]; // or any other appropriate value or action
  }
  function getSecondToLastElement(array) {
    if (array.length === 0) {
      return null;
    }
    if (array.length > 1) {
      if (
        new Date(array[array.length - 1].orderDate).toDateString() ===
        new Date(orderDate).toDateString()
      ) {
        // console.log(
        //   new Date(array[array.length - 1].orderDate).toDateString() ===
        //     new Date(orderDate).toDateString()
        // );
        return array[array.length - 2];
      }
    }
    // console.log("-1 exec");
    return array[array.length - 1]; // or any other appropriate value or action
  }

  const sortedCases = cases.slice().sort((a, b) => {
    const sortingKeywords = [
      "حاضری",
      "حاضری، ریکارڈ",
      "مختارنامہ، حاضری",
      "تقرری وکیل، حاضری",
      "حاضری، وکالت نامہ، حاضری",
      "حاضری، جواب دعویٰ، حاضری",
      "جواب دعویٰ، حاضری",
    ]; // Add more keywords here as needed
    // Loop through sortingKeywords
    for (const keyword of sortingKeywords) {
      // const hasKeywordA = a.abstract?.toLowerCase().startsWith(keyword);
      // const hasKeywordB = b.abstract?.toLowerCase().startsWith(keyword);
      const hasKeywordA = getSecondToLastElement(a.causeListEntries).actionAbstract?.startsWith(keyword);
     const hasKeywordB = getSecondToLastElement(b.causeListEntries).actionAbstract?.startsWith(keyword);

      // Prioritize cases with the current keyword at the beginning
      if (hasKeywordA && !hasKeywordB) return -1; // Case A with keyword comes before Case B without
      if (!hasKeywordA && hasKeywordB) return 1; // Case B with keyword comes after Case A without
    }

    // If none of the sorting keywords are found, sort by any other criteria (optional)
    // return a.someOtherProperty.localeCompare(b.someOtherProperty);

    return 0; // Cases are considered equal based on keywords
  });

  // const sortedCases = cases.slice().sort((a, b) => {
  //   // Check if "attendance" exists in abstract (case-insensitive)

  //   // {caseFile.causeListEntries &&
  //   //   getSecondToLastElement(caseFile.causeListEntries)
  //   //     .actionAbstract}

  //   // const hasAttendanceA = a.abstract?.toLowerCase().includes('attendance');
  //   // const hasAttendanceB = b.abstract?.toLowerCase().includes('attendance'); .includes('حاضری')
  //   const hasAttendanceA = getSecondToLastElement(a.causeListEntries).actionAbstract?.startsWith('حاضری');
  //   const hasAttendanceB = getSecondToLastElement(b.causeListEntries).actionAbstract?.startsWith('حاضری');

  //   // Prioritize cases with "attendance"
  //   if (hasAttendanceA) return -1; // Case A with "attendance" comes before anything else
  //   if (hasAttendanceB) return 1; // Case B with "attendance" comes after cases without

  //   // If neither has "attendance", sort by any other criteria (optional)
  //   // return a.someOtherProperty.localeCompare(b.someOtherProperty);

  //   return 0; // Cases are considered equal based on keywords
  // });

  return (
    <>
      <Grid justify="space-between" container spacing={1} alignItems="center">
        <Grid item xs={12} sm={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <KeyboardDatePicker
              // margin="normal"
              id="date-picker-causeList"
              label="CauseList Date"
              autoOk
              variant="inline"
              format="dd/MM/yyyy"
              value={dateCauseList}
              onChange={(date) => {
                // setCaseId(caseFile._id);
                // setCurrentId(caseFile._id);
                setDateCauseList(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <KeyboardDatePicker
              // margin="normal"
              id="date-picker-causeList-orderDate"
              label="Order Date"
              autoOk
              variant="inline"
              format="dd/MM/yyyy"
              value={orderDate}
              onChange={(date) => {
                // setCaseId(caseFile._id);
                // setCurrentId(caseFile._id);
                setOrderDate(date);
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider> */}
          <Button
            variant="contained"
            component={Link}
            to={{
              pathname: "/DailyTotalCases",
              // state: {
              //   nextDate: nextDate,
              //   orderDate: orderDate,
              //   dateCauseList: dateCauseList,
              // },
            }}
          >
            View Daily Totals
          </Button>

        </Grid>

        <Grid item container justify="space-between" xs={12} sm={3}>
          <Divider orientation="vertical" flexItem />
          <Button
            variant="contained"
            component={Link}
            to={{
              pathname: "/PrintCauseList",
              state: {
                nextDate: nextDate,
                orderDate: orderDate,
                dateCauseList: dateCauseList,
              },
            }}
          >
            Print CauseList
          </Button>
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid item xs={12} sm={4} container justify="space-between">
          <Typography
            style={{ textAlign: "left", direction: "ltr", fontSize: "1.2rem" }}
            className={[classes.boldThis]}
          >
            Day:{" "}
            {dateCauseList.toLocaleDateString("en-US", { weekday: "long" })} |{" "}
            {dateCauseList.toLocaleDateString("ur", {
              weekday: "long",
            })}
          </Typography>
          {!cases.length && (
            <Typography>
              Searching Cases for....
              {dateCauseList.toLocaleDateString()}
            </Typography>
          )}
          {cases.length && (
            <Typography
              style={{ fontSize: "1.2rem" }}
              className={[classes.boldThis]}
            >
              Total Cases : {cases.length}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "8px" }}>
          <Divider orientation="horizontal" />
        </Grid>
      </Grid>
      {!cases.length ? (
        <Box sx={{ width: "100%" }} style={{ margin: "8px 0px" }}>
          <LinearProgress />
        </Box>
      ) : (
        <React.Fragment>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              size="small"
              className={classes.table}
              aria-label="CauseList table"
              dir="rtl"
              style={{ border: "2px solid lightblue" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ direction: "rtl" }}
                    className={[classes.uFont, classes.boldThis]}
                  >
                    نمبرشمار
                  </TableCell>
                  <TableCell
                    className={[classes.uFont, classes.boldThis]}
                    style={{ textAlign: "center" }}
                  >
                    مقدمہ نمبر
                  </TableCell>
                  <TableCell
                    className={[classes.uFont, classes.boldThis]}
                    align="center"
                    style={{ minWidth: 100 }}
                  >
                    تاریخ رجوعہ
                  </TableCell>
                  <TableCell
                    className={[classes.uFont, classes.boldThis]}
                    style={{ minWidth: 130 }}
                    align="center"
                  >
                    عنوان
                  </TableCell>
                  <TableCell
                    align="center"
                    className={[classes.uFont, classes.boldThis]}
                  >
                    کاروائی
                  </TableCell>
                  <TableCell
                    className={[classes.uFont, classes.boldThis]}
                    align="center"
                  >
                    سابقہ تاریخ
                  </TableCell>
                  {/* <TableCell align="center" style={{ maxWidth: 10 }}>
                    Order No
                  </TableCell> */}
                  <TableCell
                    className={[classes.uFont, classes.boldThis]}
                    align="left"
                    style={{ direction: "rtl", width: "200px" }}
                  >
                    آئیندہ تاریخ پیشی
                  </TableCell>
                  <TableCell
                    className={[classes.uFont, classes.boldThis]}
                    style={{ minWidth: 140 }}
                    align="center"
                  >
                    خلاصہ کاروائی
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={9}
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontStyle: "",
                      fontWeight: "bold",
                      backgroundColor: "lightblue",
                    }}
                  >
                    حاضری
                  </TableCell>
                </TableRow>

                {sortedCases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("حاضری") ? (
                      <TableRow key={caseFile._id}>
                        {/* <TableCell align="right">{serialNo[index++]}</TableCell> */}
                        <TableCell align="right">{serialNumbers[index++]}</TableCell>
                        <TableCell align="center">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 24,
                          }}
                        >
                          {/* {caseFile["Case Title"]} */}
                          {caseFile.urduTitle}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 20,
                            direction: "rtl",
                          }}
                        >
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile.causeListEntries &&
                            format?.(
                              parseISO(
                                getSecondToLastElement(
                                  caseFile.causeListEntries
                                ).orderDate
                              ),
                              "dd-MM-yyy"
                            )}
                        </TableCell>
                        {/* <TableCell align="center">
                          <TextField
                            name="Order No"
                            variant="outlined"
                            label="Order No"
                            fullWidth
                            value={
                              caseFile.orderNumber
                                ? caseFile.orderNumber
                                : "null"
                              // caseFile.causeListEntries[
                              //   caseFile.causeListEntries.length - 1
                              // ].orderNumber
                            }
                            onChange={(e) => {
                              // console.log("onblurred input: " + e.target.value);
                              setCaseId(caseFile._id);
                              // setCurrentId(caseFile._id);
                              setOrderNumber({
                                orderDate: orderDate,
                                orderNumber: e.target.value,
                              });
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          style={{
                            direction: "ltr",
                          }}
                        >
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              disableToolbar
                              label="Next Date"
                              id="date-picker-inline"
                              variant="inline"
                              autoOk
                              format="dd/MM/yyyy"
                              value={
                                caseFile.nextDate
                                  ? caseFile.nextDate
                                  : orderDate
                              }
                              onChange={(date) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setNextDate({
                                  orderDate: orderDate,
                                  nextDate: date,
                                });
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            direction: "rtl",
                          }}
                        >
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.uFont}
                              id="demo-simple-select-outlined-label"
                            >
                              خلاصہ کاروائی
                            </InputLabel>
                            <Select
                              align="center"
                              className={classes.uFont}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={
                                caseFile.actionAbstract
                                  ? caseFile.actionAbstract
                                  : "null"
                              }
                              onChange={(e) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setActionAbstract({
                                  orderDate: orderDate,
                                  actionAbstract: e.target.value,
                                });
                              }}
                              label="خلاصہ کاروائی"
                            >
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgray" }}
                              >
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری"}
                              >
                                حاضری
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"بحث"}>
                                بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت"}
                              >
                                شہادت
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"حکم"}>
                                حکم
                              </MenuItem>
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgrey" }}
                              >
                                <em>All Categories</em>
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightblue" }}
                                value={"حاضری، ریکارڈ"}
                              >
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مختارنامہ، حاضری"}
                              >
                                مختارنامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تقرری وکیل، حاضری"}
                              >
                                تقرری وکیل، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، اشتہار"}
                              >
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، جواب دعویٰ، حاضری"}
                              >
                                حاضری، جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب دعویٰ، حاضری"}
                              >
                                جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب درخواست، حاضری"}
                              >
                                جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ جات، حاضری"}
                              >
                                پروفارمہ جات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ ای، حاضری"}
                              >
                                پرفارمہ ای
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ سی، حاضری"}
                              >
                                پرفارمہ سی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد جرم، حاضری"}
                              >
                                فرد جرم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد تعلیقہ، حاضری"}
                              >
                                فرد تعلیقہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حاضری"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیلف رپورٹ، حاضری"}
                              >
                                بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، بیلف رپورٹ، حاضری"}
                              >
                                حاضری، بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نیلامی، حاضری"}
                              >
                                نیلامی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نادرا رپورٹ، حاضری"}
                              >
                                نادرا رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا آدائیگی، حاضری"}
                              >
                                بقایا آدائیگی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مزید کاروائی، حاضری"}
                              >
                                مزید کاروائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"انتظار مسل، حاضری"}
                              >
                                انتظار مسل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"کمنٹس، حاضری"}
                              >
                                کمنٹس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ SHO، حاضری"}
                              >
                                رپورٹ SHO
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان DFC, حاضری"}
                              >
                                بیان DFC
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبی انکوائری، حاضری"}
                              >
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی عرضیدعویٰ، حاضری"}
                              >
                                ترمیمی عرضیدعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب دعویٰ، حاضری"}
                              >
                                ترمیمی جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب درخواست، حاضری"}
                              >
                                ترمیمی جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، رپورٹ اہل کمیشن"}
                              >
                                حاضری، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ اہل کمیشن، حاضری"}
                              >
                                رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، عزرات"}
                              >
                                حاضری، عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"عزرات، حاضری"}
                              >
                                عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شیڈولنگ کانفرنس، حاضری"}
                              >
                                شیڈولنگ کانفرنس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="جواب الجواب، حاضری"
                              >
                                جواب الجواب
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="شوکازنوٹس، حاضری"
                              >
                                شوکازنوٹس
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightgreen" }}
                                value={"شہادت مدعی"}
                              >
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تنقیحات، شہادت"}
                              >
                                تنقیحات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیہ"}
                              >
                                شہادت مدعیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہ"}
                              >
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہا"}
                              >
                                شہادت مدعا علیہا
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیان"}
                              >
                                شہادت مدعیان
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعاعلیہم"}
                              >
                                شہادت مدعا علیہم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت سائیل"}
                              >
                                شہادت سائیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مسئول الیہ"}
                              >
                                شہادت مسئول الیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبیدہ گواہان، شہادت"}
                              >
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہان، شہادت"}
                              >
                                جرح بر گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت استغاثہ"}
                              >
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ شہادت"}
                              >
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہ، شہادت"}
                              >
                                جرح بر گواہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، شہادت"}
                              >
                                ہمراہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان اہل کمیشن، شہادت"}
                              >
                                بیان اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، شہادت"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{
                                  backgroundColor: "lightsalmon",
                                }}
                                value={"ابتدائی بحث"}
                              >
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب و بحث"}
                              >
                                جواب و بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر درخواست"}
                              >
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نکتہ"}
                              >
                                بحث بر نکتہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ بحث"}
                              >
                                یکطرفہ بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر مقدمہ"}
                              >
                                بحث بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا بحث"}
                              >
                                بقایا بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث، ریکارڈ"}
                              >
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر اپیل"}
                              >
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نگرانی"}
                              >
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ابتدائی، بحث"}
                              >
                                مصالحت ابتدائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ثانی، بحث"}
                              >
                                مصالحت ثانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، بحث"}
                              >
                                ہمراہ، بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر رپورٹ"}
                              >
                                بحث بر رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، بحث"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightcoral" }}
                                value={"حکم بر درخواست"}
                              >
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر کمیشن"}
                              >
                                حکم بر کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم یکطرفہ"}
                              >
                                حکم یکطرفہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر مقدمہ"}
                              >
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حکم"}
                              >
                                راضی نامہ، حکم
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
                      </TableRow>
                    ) : null}
                    {/* {(index += 1)} */}
                    {/* {setSerialNo((prevIndex) => prevIndex + 1)} */}
                  </>
                ))}

                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={9}
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontStyle: "",
                      fontWeight: "bold",
                      backgroundColor: "lightgreen",
                    }}
                  >
                    شہادت
                  </TableCell>
                </TableRow>

                {cases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("شہادت") ? (
                      <TableRow key={caseFile._id}>
                      <TableCell align="right">{serialNumbers[index++]}</TableCell>
                        {/* <TableCell component="th" scope="row" align="right">
                          {serialNo[index++]}
                        </TableCell> */}
                        <TableCell align="center">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 24,
                          }}
                        >
                          {/* {caseFile["Case Title"]} */}
                          {caseFile.urduTitle}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 20,
                          }}
                        >
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile.causeListEntries &&
                            format?.(
                              parseISO(
                                getSecondToLastElement(
                                  caseFile.causeListEntries
                                ).orderDate
                              ),
                              "dd-MM-yyy"
                            )}
                        </TableCell>
                        {/* <TableCell align="center">
                          <TextField
                            name="Order No"
                            variant="outlined"
                            label="Order No"
                            fullWidth
                            value={
                              caseFile.orderNumber
                                ? caseFile.orderNumber
                                : "null"
                              // caseFile.causeListEntries[
                              //   caseFile.causeListEntries.length - 1
                              // ].orderNumber
                            }
                            onChange={(e) => {
                              // console.log("onblurred input: " + e.target.value);
                              setCaseId(caseFile._id);
                              // setCurrentId(caseFile._id);
                              setOrderNumber({
                                orderDate: orderDate,
                                orderNumber: e.target.value,
                              });
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          style={{
                            direction: "ltr",
                          }}
                        >
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-inline"
                              disableToolbar
                              label="Next Date"
                              variant="inline"
                              autoOk
                              format="dd/MM/yyyy"
                              value={
                                caseFile.nextDate
                                  ? caseFile.nextDate
                                  : orderDate
                              }
                              onChange={(date) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setNextDate({
                                  orderDate: orderDate,
                                  nextDate: date,
                                });
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell align="center">
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.uFont}
                              id="demo-simple-select-outlined-label"
                            >
                              خلاصہ کاروائی
                            </InputLabel>
                            <Select
                              align="center"
                              className={classes.uFont}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={
                                caseFile.actionAbstract
                                  ? caseFile.actionAbstract
                                  : "null"
                              }
                              onChange={(e) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setActionAbstract({
                                  orderDate: orderDate,
                                  actionAbstract: e.target.value,
                                });
                              }}
                              label="خلاصہ کاروائی"
                            >
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgray" }}
                              >
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری"}
                              >
                                حاضری
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"بحث"}>
                                بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت"}
                              >
                                شہادت
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"حکم"}>
                                حکم
                              </MenuItem>
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgrey" }}
                              >
                                <em>All Categories</em>
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightblue" }}
                                value={"حاضری، ریکارڈ"}
                              >
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مختارنامہ، حاضری"}
                              >
                                مختارنامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تقرری وکیل، حاضری"}
                              >
                                تقرری وکیل، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، اشتہار"}
                              >
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، جواب دعویٰ، حاضری"}
                              >
                                حاضری، جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب دعویٰ، حاضری"}
                              >
                                جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب درخواست، حاضری"}
                              >
                                جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ جات، حاضری"}
                              >
                                پروفارمہ جات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ ای، حاضری"}
                              >
                                پرفارمہ ای
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ سی، حاضری"}
                              >
                                پرفارمہ سی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد جرم، حاضری"}
                              >
                                فرد جرم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد تعلیقہ، حاضری"}
                              >
                                فرد تعلیقہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حاضری"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیلف رپورٹ، حاضری"}
                              >
                                بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، بیلف رپورٹ، حاضری"}
                              >
                                حاضری، بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نیلامی، حاضری"}
                              >
                                نیلامی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نادرا رپورٹ، حاضری"}
                              >
                                نادرا رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا آدائیگی، حاضری"}
                              >
                                بقایا آدائیگی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مزید کاروائی، حاضری"}
                              >
                                مزید کاروائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"انتظار مسل، حاضری"}
                              >
                                انتظار مسل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"کمنٹس، حاضری"}
                              >
                                کمنٹس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ SHO، حاضری"}
                              >
                                رپورٹ SHO
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان DFC, حاضری"}
                              >
                                بیان DFC
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبی انکوائری، حاضری"}
                              >
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی عرضیدعویٰ، حاضری"}
                              >
                                ترمیمی عرضیدعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب دعویٰ، حاضری"}
                              >
                                ترمیمی جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب درخواست، حاضری"}
                              >
                                ترمیمی جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، رپورٹ اہل کمیشن"}
                              >
                                حاضری، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ اہل کمیشن، حاضری"}
                              >
                                رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، عزرات"}
                              >
                                حاضری، عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"عزرات، حاضری"}
                              >
                                عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شیڈولنگ کانفرنس، حاضری"}
                              >
                                شیڈولنگ کانفرنس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="جواب الجواب، حاضری"
                              >
                                جواب الجواب
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="شوکازنوٹس، حاضری"
                              >
                                شوکازنوٹس
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightgreen" }}
                                value={"شہادت مدعی"}
                              >
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تنقیحات، شہادت"}
                              >
                                تنقیحات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیہ"}
                              >
                                شہادت مدعیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہ"}
                              >
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہا"}
                              >
                                شہادت مدعا علیہا
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیان"}
                              >
                                شہادت مدعیان
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعاعلیہم"}
                              >
                                شہادت مدعا علیہم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت سائیل"}
                              >
                                شہادت سائیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مسئول الیہ"}
                              >
                                شہادت مسئول الیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبیدہ گواہان، شہادت"}
                              >
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہان، شہادت"}
                              >
                                جرح بر گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت استغاثہ"}
                              >
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ شہادت"}
                              >
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہ، شہادت"}
                              >
                                جرح بر گواہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، شہادت"}
                              >
                                ہمراہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان اہل کمیشن، شہادت"}
                              >
                                بیان اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، شہادت"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{
                                  backgroundColor: "lightsalmon",
                                }}
                                value={"ابتدائی بحث"}
                              >
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب و بحث"}
                              >
                                جواب و بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر درخواست"}
                              >
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نکتہ"}
                              >
                                بحث بر نکتہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ بحث"}
                              >
                                یکطرفہ بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر مقدمہ"}
                              >
                                بحث بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا بحث"}
                              >
                                بقایا بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث، ریکارڈ"}
                              >
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر اپیل"}
                              >
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نگرانی"}
                              >
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ابتدائی، بحث"}
                              >
                                مصالحت ابتدائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ثانی، بحث"}
                              >
                                مصالحت ثانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، بحث"}
                              >
                                ہمراہ، بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر رپورٹ"}
                              >
                                بحث بر رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، بحث"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightcoral" }}
                                value={"حکم بر درخواست"}
                              >
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر کمیشن"}
                              >
                                حکم بر کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم یکطرفہ"}
                              >
                                حکم یکطرفہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر مقدمہ"}
                              >
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حکم"}
                              >
                                راضی نامہ، حکم
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {/* {setSerialNo((prevIndex) => prevIndex + 1)} */}
                        {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
                      </TableRow>
                    ) : null}
                  </>
                ))}

                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={9}
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontStyle: "",
                      fontWeight: "bold",
                      backgroundColor: "lightsalmon",
                    }}
                  >
                    بحث
                  </TableCell>
                </TableRow>

                {cases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("بحث") ? (
                      <TableRow key={caseFile._id}>
                      <TableCell align="right">{serialNumbers[index++]}</TableCell>
                        {/* <TableCell component="th" scope="row" align="right">
                          {serialNo[index++]}
                        </TableCell> */}
                        <TableCell align="center">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 24,
                          }}
                        >
                          {/* {caseFile["Case Title"]} */}
                          {caseFile.urduTitle}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 20,
                          }}
                        >
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile.causeListEntries &&
                            format?.(
                              parseISO(
                                getSecondToLastElement(
                                  caseFile.causeListEntries
                                ).orderDate
                              ),
                              "dd-MM-yyy"
                            )}
                        </TableCell>
                        {/* <TableCell align="center">
                          <TextField
                            name="Order No"
                            variant="outlined"
                            label="Order No"
                            fullWidth
                            value={
                              caseFile.orderNumber
                                ? caseFile.orderNumber
                                : "null"
                              // caseFile.causeListEntries[
                              //   caseFile.causeListEntries.length - 1
                              // ].orderNumber
                            }
                            onChange={(e) => {
                              // console.log("onblurred input: " + e.target.value);
                              setCaseId(caseFile._id);
                              // setCurrentId(caseFile._id);
                              setOrderNumber({
                                orderDate: orderDate,
                                orderNumber: e.target.value,
                              });
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          style={{
                            direction: "ltr",
                          }}
                        >
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-inline"
                              disableToolbar
                              label="Next Date"
                              variant="inline"
                              autoOk
                              format="dd/MM/yyyy"
                              value={
                                caseFile.nextDate
                                  ? caseFile.nextDate
                                  : orderDate
                              }
                              onChange={(date) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setNextDate({
                                  orderDate: orderDate,
                                  nextDate: date,
                                });
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell align="center">
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.uFont}
                              id="demo-simple-select-outlined-label"
                            >
                              خلاصہ کاروائی
                            </InputLabel>
                            <Select
                              align="center"
                              className={classes.uFont}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={
                                caseFile.actionAbstract
                                  ? caseFile.actionAbstract
                                  : "null"
                              }
                              onChange={(e) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setActionAbstract({
                                  orderDate: orderDate,
                                  actionAbstract: e.target.value,
                                });
                              }}
                              label="خلاصہ کاروائی"
                            >
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgray" }}
                              >
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری"}
                              >
                                حاضری
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"بحث"}>
                                بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت"}
                              >
                                شہادت
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"حکم"}>
                                حکم
                              </MenuItem>
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgrey" }}
                              >
                                <em>All Categories</em>
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightblue" }}
                                value={"حاضری، ریکارڈ"}
                              >
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مختارنامہ، حاضری"}
                              >
                                مختارنامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تقرری وکیل، حاضری"}
                              >
                                تقرری وکیل، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، اشتہار"}
                              >
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، جواب دعویٰ، حاضری"}
                              >
                                حاضری، جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب دعویٰ، حاضری"}
                              >
                                جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب درخواست، حاضری"}
                              >
                                جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ جات، حاضری"}
                              >
                                پروفارمہ جات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ ای، حاضری"}
                              >
                                پرفارمہ ای
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ سی، حاضری"}
                              >
                                پرفارمہ سی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد جرم، حاضری"}
                              >
                                فرد جرم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد تعلیقہ، حاضری"}
                              >
                                فرد تعلیقہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حاضری"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیلف رپورٹ، حاضری"}
                              >
                                بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، بیلف رپورٹ، حاضری"}
                              >
                                حاضری، بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نیلامی، حاضری"}
                              >
                                نیلامی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نادرا رپورٹ، حاضری"}
                              >
                                نادرا رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا آدائیگی، حاضری"}
                              >
                                بقایا آدائیگی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مزید کاروائی، حاضری"}
                              >
                                مزید کاروائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"انتظار مسل، حاضری"}
                              >
                                انتظار مسل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"کمنٹس، حاضری"}
                              >
                                کمنٹس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ SHO، حاضری"}
                              >
                                رپورٹ SHO
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان DFC, حاضری"}
                              >
                                بیان DFC
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبی انکوائری، حاضری"}
                              >
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی عرضیدعویٰ، حاضری"}
                              >
                                ترمیمی عرضیدعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب دعویٰ، حاضری"}
                              >
                                ترمیمی جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب درخواست، حاضری"}
                              >
                                ترمیمی جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، رپورٹ اہل کمیشن"}
                              >
                                حاضری، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ اہل کمیشن، حاضری"}
                              >
                                رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، عزرات"}
                              >
                                حاضری، عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"عزرات، حاضری"}
                              >
                                عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شیڈولنگ کانفرنس، حاضری"}
                              >
                                شیڈولنگ کانفرنس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="جواب الجواب، حاضری"
                              >
                                جواب الجواب
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="شوکازنوٹس، حاضری"
                              >
                                شوکازنوٹس
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightgreen" }}
                                value={"شہادت مدعی"}
                              >
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تنقیحات، شہادت"}
                              >
                                تنقیحات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیہ"}
                              >
                                شہادت مدعیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہ"}
                              >
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہا"}
                              >
                                شہادت مدعا علیہا
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیان"}
                              >
                                شہادت مدعیان
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعاعلیہم"}
                              >
                                شہادت مدعا علیہم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت سائیل"}
                              >
                                شہادت سائیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مسئول الیہ"}
                              >
                                شہادت مسئول الیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبیدہ گواہان، شہادت"}
                              >
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہان، شہادت"}
                              >
                                جرح بر گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت استغاثہ"}
                              >
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ شہادت"}
                              >
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہ، شہادت"}
                              >
                                جرح بر گواہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، شہادت"}
                              >
                                ہمراہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان اہل کمیشن، شہادت"}
                              >
                                بیان اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، شہادت"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{
                                  backgroundColor: "lightsalmon",
                                }}
                                value={"ابتدائی بحث"}
                              >
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب و بحث"}
                              >
                                جواب و بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر درخواست"}
                              >
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نکتہ"}
                              >
                                بحث بر نکتہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ بحث"}
                              >
                                یکطرفہ بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر مقدمہ"}
                              >
                                بحث بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا بحث"}
                              >
                                بقایا بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث، ریکارڈ"}
                              >
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر اپیل"}
                              >
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نگرانی"}
                              >
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ابتدائی، بحث"}
                              >
                                مصالحت ابتدائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ثانی، بحث"}
                              >
                                مصالحت ثانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، بحث"}
                              >
                                ہمراہ، بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر رپورٹ"}
                              >
                                بحث بر رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، بحث"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightcoral" }}
                                value={"حکم بر درخواست"}
                              >
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر کمیشن"}
                              >
                                حکم بر کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم یکطرفہ"}
                              >
                                حکم یکطرفہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر مقدمہ"}
                              >
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حکم"}
                              >
                                راضی نامہ، حکم
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {/* {setSerialNo((prevIndex) => prevIndex + 1)} */}
                        {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
                      </TableRow>
                    ) : null}
                  </>
                ))}

                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontStyle: "",
                      fontWeight: "bold",
                      backgroundColor: "lightcoral",
                    }}
                    colSpan={9}
                  >
                    حکم
                  </TableCell>
                </TableRow>

                {cases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("حکم") ? (
                      <TableRow key={caseFile._id}>
                        {/* <TableCell component="th" scope="row" align="right">
                          {serialNo[index++]}
                        </TableCell> */}
                        <TableCell align="right">{serialNumbers[index++]}</TableCell>
                        <TableCell align="center">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 24,
                          }}
                        >
                          {/* {caseFile["Case Title"]} */}
                          {caseFile.urduTitle}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 20,
                          }}
                        >
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile.causeListEntries &&
                            format?.(
                              parseISO(
                                getSecondToLastElement(
                                  caseFile.causeListEntries
                                ).orderDate
                              ),
                              "dd-MM-yyy"
                            )}
                        </TableCell>
                        {/* <TableCell align="center">
                          <TextField
                            name="Order No"
                            variant="outlined"
                            label="Order No"
                            fullWidth
                            value={
                              caseFile.orderNumber
                                ? caseFile.orderNumber
                                : "null"

                              // caseFile.causeListEntries[
                              //   caseFile.causeListEntries.length - 1
                              // ].orderNumber
                            }
                            onChange={(e) => {
                              // console.log("onblurred input: " + e.target.value);
                              setCaseId(caseFile._id);
                              // setCurrentId(caseFile._id);
                              setOrderNumber({
                                orderDate: orderDate,
                                orderNumber: e.target.value,
                              });
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          style={{
                            direction: "ltr",
                          }}
                        >
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-inline"
                              disableToolbar
                              label="Next Date"
                              variant="inline"
                              autoOk
                              format="dd/MM/yyyy"
                              value={
                                caseFile.nextDate
                                  ? caseFile.nextDate
                                  : orderDate
                              }
                              onChange={(date) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setNextDate({
                                  orderDate: orderDate,
                                  nextDate: date,
                                });
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell align="center">
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.uFont}
                              id="demo-simple-select-outlined-label"
                            >
                              خلاصہ کاروائی
                            </InputLabel>
                            <Select
                              align="center"
                              className={classes.uFont}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={
                                caseFile.actionAbstract
                                  ? caseFile.actionAbstract
                                  : "null"
                              }
                              onChange={(e) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setActionAbstract({
                                  orderDate: orderDate,
                                  actionAbstract: e.target.value,
                                });
                              }}
                              label="خلاصہ کاروائی"
                            >
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgray" }}
                              >
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری"}
                              >
                                حاضری
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"بحث"}>
                                بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت"}
                              >
                                شہادت
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"حکم"}>
                                حکم
                              </MenuItem>
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgrey" }}
                              >
                                <em>All Categories</em>
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightblue" }}
                                value={"حاضری، ریکارڈ"}
                              >
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مختارنامہ، حاضری"}
                              >
                                مختارنامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تقرری وکیل، حاضری"}
                              >
                                تقرری وکیل، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، اشتہار"}
                              >
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، جواب دعویٰ، حاضری"}
                              >
                                حاضری، جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب دعویٰ، حاضری"}
                              >
                                جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب درخواست، حاضری"}
                              >
                                جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ جات، حاضری"}
                              >
                                پروفارمہ جات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ ای، حاضری"}
                              >
                                پرفارمہ ای
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ سی، حاضری"}
                              >
                                پرفارمہ سی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد جرم، حاضری"}
                              >
                                فرد جرم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد تعلیقہ، حاضری"}
                              >
                                فرد تعلیقہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حاضری"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیلف رپورٹ، حاضری"}
                              >
                                بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، بیلف رپورٹ، حاضری"}
                              >
                                حاضری، بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نیلامی، حاضری"}
                              >
                                نیلامی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نادرا رپورٹ، حاضری"}
                              >
                                نادرا رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا آدائیگی، حاضری"}
                              >
                                بقایا آدائیگی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مزید کاروائی، حاضری"}
                              >
                                مزید کاروائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"انتظار مسل، حاضری"}
                              >
                                انتظار مسل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"کمنٹس، حاضری"}
                              >
                                کمنٹس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ SHO، حاضری"}
                              >
                                رپورٹ SHO
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان DFC, حاضری"}
                              >
                                بیان DFC
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبی انکوائری، حاضری"}
                              >
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی عرضیدعویٰ، حاضری"}
                              >
                                ترمیمی عرضیدعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب دعویٰ، حاضری"}
                              >
                                ترمیمی جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب درخواست، حاضری"}
                              >
                                ترمیمی جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، رپورٹ اہل کمیشن"}
                              >
                                حاضری، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ اہل کمیشن، حاضری"}
                              >
                                رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، عزرات"}
                              >
                                حاضری، عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"عزرات، حاضری"}
                              >
                                عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شیڈولنگ کانفرنس، حاضری"}
                              >
                                شیڈولنگ کانفرنس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="جواب الجواب، حاضری"
                              >
                                جواب الجواب
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="شوکازنوٹس، حاضری"
                              >
                                شوکازنوٹس
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightgreen" }}
                                value={"شہادت مدعی"}
                              >
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تنقیحات، شہادت"}
                              >
                                تنقیحات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیہ"}
                              >
                                شہادت مدعیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہ"}
                              >
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہا"}
                              >
                                شہادت مدعا علیہا
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیان"}
                              >
                                شہادت مدعیان
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعاعلیہم"}
                              >
                                شہادت مدعا علیہم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت سائیل"}
                              >
                                شہادت سائیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مسئول الیہ"}
                              >
                                شہادت مسئول الیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبیدہ گواہان، شہادت"}
                              >
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہان، شہادت"}
                              >
                                جرح بر گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت استغاثہ"}
                              >
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ شہادت"}
                              >
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہ، شہادت"}
                              >
                                جرح بر گواہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، شہادت"}
                              >
                                ہمراہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان اہل کمیشن، شہادت"}
                              >
                                بیان اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، شہادت"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{
                                  backgroundColor: "lightsalmon",
                                }}
                                value={"ابتدائی بحث"}
                              >
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب و بحث"}
                              >
                                جواب و بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر درخواست"}
                              >
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نکتہ"}
                              >
                                بحث بر نکتہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ بحث"}
                              >
                                یکطرفہ بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر مقدمہ"}
                              >
                                بحث بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا بحث"}
                              >
                                بقایا بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث، ریکارڈ"}
                              >
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر اپیل"}
                              >
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نگرانی"}
                              >
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ابتدائی، بحث"}
                              >
                                مصالحت ابتدائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ثانی، بحث"}
                              >
                                مصالحت ثانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، بحث"}
                              >
                                ہمراہ، بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر رپورٹ"}
                              >
                                بحث بر رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، بحث"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightcoral" }}
                                value={"حکم بر درخواست"}
                              >
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر کمیشن"}
                              >
                                حکم بر کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم یکطرفہ"}
                              >
                                حکم یکطرفہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر مقدمہ"}
                              >
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حکم"}
                              >
                                راضی نامہ، حکم
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
                      </TableRow>
                    ) : null}
                    {/* {setSerialNo((prevIndex) => prevIndex + 1)} */}
                  </>
                ))}

                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={9}
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontStyle: "",
                      fontWeight: "bold",
                      backgroundColor: "lightblue",
                    }}
                  >
                    متفرق
                  </TableCell>
                </TableRow>

                {cases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    !getSecondToLastElementCategory(caseFile.causeListEntries)
                      .actionAbstract ? (
                      <TableRow key={caseFile._id}>
                        <TableCell component="th" scope="row" align="right">
                          {/* {cases.indexOf(caseFile) + 1} */}
                          {/* {serialNo} */}
                          {serialNo[index++]}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 24,
                          }}
                        >
                          {/* {caseFile["Case Title"]} */}
                          {caseFile.urduTitle}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Jameel Noori Nastaleeq",
                            fontSize: 20,
                          }}
                        >
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile.causeListEntries &&
                            format?.(
                              parseISO(
                                getSecondToLastElement(
                                  caseFile.causeListEntries
                                ).orderDate
                              ),
                              "dd-MM-yyy"
                            )}
                        </TableCell>
                        {/* <TableCell align="center">
                          <TextField
                            name="Order No"
                            variant="outlined"
                            label="Order No"
                            fullWidth
                            value={
                              caseFile.orderNumber
                                ? caseFile.orderNumber
                                : "null"

                              // caseFile.causeListEntries[
                              //   caseFile.causeListEntries.length - 1
                              // ].orderNumber
                            }
                            onChange={(e) => {
                              // console.log("onblurred input: " + e.target.value);
                              setCaseId(caseFile._id);
                              // setCurrentId(caseFile._id);
                              setOrderNumber({
                                orderDate: orderDate,
                                orderNumber: e.target.value,
                              });
                            }}
                          />
                        </TableCell> */}
                        <TableCell
                          style={{
                            direction: "ltr",
                          }}
                        >
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-inline"
                              disableToolbar
                              label="Next Date"
                              variant="inline"
                              autoOk
                              format="dd/MM/yyyy"
                              value={
                                caseFile.nextDate
                                  ? caseFile.nextDate
                                  : orderDate
                              }
                              onChange={(date) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setNextDate({
                                  orderDate: orderDate,
                                  nextDate: date,
                                });
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </TableCell>
                        <TableCell align="center">
                          <FormControl
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.uFont}
                              id="demo-simple-select-outlined-label"
                            >
                              خلاصہ کاروائی
                            </InputLabel>
                            <Select
                              align="center"
                              className={classes.uFont}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={
                                caseFile.actionAbstract
                                  ? caseFile.actionAbstract
                                  : "null"
                              }
                              onChange={(e) => {
                                setCaseId(caseFile._id);
                                // setCurrentId(caseFile._id);
                                setActionAbstract({
                                  orderDate: orderDate,
                                  actionAbstract: e.target.value,
                                });
                              }}
                              label="خلاصہ کاروائی"
                            >
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgray" }}
                              >
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری"}
                              >
                                حاضری
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"بحث"}>
                                بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت"}
                              >
                                شہادت
                              </MenuItem>
                              <MenuItem className={classes.uFont} value={"حکم"}>
                                حکم
                              </MenuItem>
                              <MenuItem
                                value=""
                                style={{ backgroundColor: "lightgrey" }}
                              >
                                <em>All Categories</em>
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightblue" }}
                                value={"حاضری، ریکارڈ"}
                              >
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مختارنامہ، حاضری"}
                              >
                                مختارنامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تقرری وکیل، حاضری"}
                              >
                                تقرری وکیل، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"وکالت نامہ، حاضری"}
                              >
                                وکالت نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، اشتہار"}
                              >
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، جواب دعویٰ، حاضری"}
                              >
                                حاضری، جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب دعویٰ، حاضری"}
                              >
                                جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب درخواست، حاضری"}
                              >
                                جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ جات، حاضری"}
                              >
                                پروفارمہ جات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ ای، حاضری"}
                              >
                                پرفارمہ ای
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"پروفارمہ سی، حاضری"}
                              >
                                پرفارمہ سی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد جرم، حاضری"}
                              >
                                فرد جرم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"فرد تعلیقہ، حاضری"}
                              >
                                فرد تعلیقہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حاضری"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیلف رپورٹ، حاضری"}
                              >
                                بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، بیلف رپورٹ، حاضری"}
                              >
                                حاضری، بیلف رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نیلامی، حاضری"}
                              >
                                نیلامی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"نادرا رپورٹ، حاضری"}
                              >
                                نادرا رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا آدائیگی، حاضری"}
                              >
                                بقایا آدائیگی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مزید کاروائی، حاضری"}
                              >
                                مزید کاروائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"انتظار مسل، حاضری"}
                              >
                                انتظار مسل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"کمنٹس، حاضری"}
                              >
                                کمنٹس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ SHO، حاضری"}
                              >
                                رپورٹ SHO
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان DFC, حاضری"}
                              >
                                بیان DFC
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبی انکوائری، حاضری"}
                              >
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی عرضیدعویٰ، حاضری"}
                              >
                                ترمیمی عرضیدعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب دعویٰ، حاضری"}
                              >
                                ترمیمی جواب دعویٰ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={" ترمیمی جواب درخواست، حاضری"}
                              >
                                ترمیمی جواب درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، رپورٹ اہل کمیشن"}
                              >
                                حاضری، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"رپورٹ اہل کمیشن، حاضری"}
                              >
                                رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حاضری، عزرات"}
                              >
                                حاضری، عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"عزرات، حاضری"}
                              >
                                عزرات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شیڈولنگ کانفرنس، حاضری"}
                              >
                                شیڈولنگ کانفرنس
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="جواب الجواب، حاضری"
                              >
                                جواب الجواب
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value="شوکازنوٹس، حاضری"
                              >
                                شوکازنوٹس
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightgreen" }}
                                value={"شہادت مدعی"}
                              >
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"تنقیحات، شہادت"}
                              >
                                تنقیحات
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیہ"}
                              >
                                شہادت مدعیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہ"}
                              >
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعا علیہا"}
                              >
                                شہادت مدعا علیہا
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعیان"}
                              >
                                شہادت مدعیان
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مدعاعلیہم"}
                              >
                                شہادت مدعا علیہم
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت سائیل"}
                              >
                                شہادت سائیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت مسئول الیہ"}
                              >
                                شہادت مسئول الیہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"طلبیدہ گواہان، شہادت"}
                              >
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہان، شہادت"}
                              >
                                جرح بر گواہان، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"شہادت استغاثہ"}
                              >
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ شہادت"}
                              >
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جرح بر گواہ، شہادت"}
                              >
                                جرح بر گواہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، شہادت"}
                              >
                                ہمراہ، شہادت
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بیان اہل کمیشن، شہادت"}
                              >
                                بیان اہل کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، شہادت"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{
                                  backgroundColor: "lightsalmon",
                                }}
                                value={"ابتدائی بحث"}
                              >
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"جواب و بحث"}
                              >
                                جواب و بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر درخواست"}
                              >
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نکتہ"}
                              >
                                بحث بر نکتہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"یکطرفہ بحث"}
                              >
                                یکطرفہ بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر مقدمہ"}
                              >
                                بحث بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بقایا بحث"}
                              >
                                بقایا بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث، ریکارڈ"}
                              >
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر اپیل"}
                              >
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر نگرانی"}
                              >
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ابتدائی، بحث"}
                              >
                                مصالحت ابتدائی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"مصالحت ثانی، بحث"}
                              >
                                مصالحت ثانی
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"ہمراہ، بحث"}
                              >
                                ہمراہ، بحث
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"بحث بر رپورٹ"}
                              >
                                بحث بر رپورٹ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، بحث"}
                              >
                                راضی نامہ
                              </MenuItem>
                              <Divider />

                              <MenuItem
                                className={[classes.boldThis, classes.uFont]}
                                style={{ backgroundColor: "lightcoral" }}
                                value={"حکم بر درخواست"}
                              >
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر کمیشن"}
                              >
                                حکم بر کمیشن
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم یکطرفہ"}
                              >
                                حکم یکطرفہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"حکم بر مقدمہ"}
                              >
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem
                                className={classes.uFont}
                                value={"راضی نامہ، حکم"}
                              >
                                راضی نامہ، حکم
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
                      </TableRow>
                    ) : null}
                    {/* {setSerialNo((prevIndex) => prevIndex + 1)} */}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      )}
    </>
  );
};

export default CauseList;

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
