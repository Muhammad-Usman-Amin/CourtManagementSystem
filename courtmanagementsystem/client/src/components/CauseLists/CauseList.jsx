import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField, Typography } from "@material-ui/core";

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
  FormControlLabel,
  FormControl,
  FormLabel,
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
import useStyles2 from "../../dashboardExample/dashboard";
import { addDays } from "date-fns";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});

const CauseList = ({ currentId, setCurrentId, onPageChange }) => {
  const classes2 = useStyles2();
  // const cases = useSelector((state) => state.cases);
  const cases = useSelector((state) => state.causeLists);
  // console.log(cases);
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [orderDate, setOrderDate] = useState(new Date("2023-06-19"));
  const [orderDate, setOrderDate] = useState(new Date());

  // const [nextDate, setNextDate] = useState(new Date());
  // const [caseData, setCaseData] = useState({
  //   orderDate: new Date(), orderNumber: '', nextDate: nextDate, actionAbstract: '',
  // });
  const [orderNumber, setOrderNumber] = useState({
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

  const [dateCauseList, setDateCauseList] = useState(addDays(new Date(), 0));
  const [serialNo, setSerialNo] = useState([]);
  let index = 0;
  // let sno = [];
  useEffect(() => {
    dispatch(getCauseList({ dateCauseList: dateCauseList }));
  }, [dateCauseList]);

  useEffect(() => {
    dispatch(getCauseList({ dateCauseList: dateCauseList }));
  }, []);
  useEffect(() => {
    for (let i = 1; i <= cases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    console.log(serialNo);
  }, [cases]);
  useEffect(() => {
    for (let i = 1; i <= cases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    console.log(serialNo);
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

  return (
    <>
      <Grid justify="space-between" container spacing={1} alignItems="center">
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
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
          </MuiPickersUtilsProvider>
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
              },
            }}
          >
            Print CauseList
          </Button>
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid item xs={12} sm={3} container justify="flex-end">
          {!cases.length && (
            <Typography>
              Searching Cases for....
              {dateCauseList.toLocaleDateString()}
            </Typography>
          )}
          {cases.length && (
            <Typography>Total Cases : {cases.length}</Typography>
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
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ maxWidth: 5 }}>نمبر شمار</TableCell>
                  <TableCell align="right">Case No</TableCell>
                  <TableCell align="center" style={{ minWidth: 100 }}>
                    Institution
                  </TableCell>
                  <TableCell style={{ minWidth: 130 }} align="center">
                    Title
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Previous Date</TableCell>
                  <TableCell align="center" style={{ maxWidth: 10 }}>
                    Order No
                  </TableCell>
                  <TableCell style={{ minWidth: 80 }} align="left">
                    Next Date
                  </TableCell>
                  <TableCell style={{ minWidth: 140 }} align="center">
                    Action Abstract
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
                    }}
                  >
                    حاضری
                  </TableCell>
                </TableRow>

                {cases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("حاضری") ? (
                      <TableRow key={caseFile._id}>
                        <TableCell>{serialNo[index++]}</TableCell>
                        <TableCell align="right">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile["Case Title"]}
                        </TableCell>
                        <TableCell align="center">
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
                        <TableCell align="center">
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
                        </TableCell>
                        <TableCell>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-dialog"
                              label=""
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
                            <InputLabel id="demo-simple-select-outlined-label">
                              خلاصہ کارواءی
                            </InputLabel>
                            <Select
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
                              label="Select Sub Type"
                            >
                              <MenuItem value="">
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem value={"حاضری"}>حاضری</MenuItem>
                              <MenuItem value={"بحث"}>بحث</MenuItem>
                              <MenuItem value={"شہادت"}>شہادت</MenuItem>
                              <MenuItem value={"حکم"}>حکم</MenuItem>
                              <MenuItem value="">
                                <em>All Categories</em>
                              </MenuItem>
                              <MenuItem value={"حاضری، ریکارڈ"}>
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"فرد جرم، حاضری"}>
                                فرد جرم، حاضری
                              </MenuItem>
                              <MenuItem value={"کمنٹس، حاضری"}>
                                کمنٹس، حاضری
                              </MenuItem>
                              <MenuItem value={"رپورٹ SHO، حاضری"}>
                                رپورٹ SHO، حاضری
                              </MenuItem>

                              <MenuItem value={"طلبی انکوائری، حاضری"}>
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem value={"حاضری، اشتہار"}>
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem value={"آدائیگی، حاضری"}>
                                آدائیگی، حاضری
                              </MenuItem>
                              <MenuItem value={"ابتدائی بحث"}>
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem value={"یکطرفہ بحث"}>
                                یکطرفہ بحث
                              </MenuItem>

                              <MenuItem value={"بحث، رپورٹ اہل کمیشن"}>
                                بحث، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem value={"بحث، ریکارڈ"}>
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"بقایا بحث"}>بقایا بحث</MenuItem>
                              <MenuItem value={"تقرری وکیل، بحث"}>
                                تقرری وکیل، بحث
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، بحث"}>
                                راضی نامہ، بحث
                              </MenuItem>

                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem value={"بحث بر مقدمہ"}>
                                بحث بر مقدمہ
                              </MenuItem>

                              <MenuItem value={"بحث بر نگرانی"}>
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem value={"بحث بر درخواست"}>
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem value={"تنقیحات، بحث"}>
                                تنقیحات، بحث
                              </MenuItem>
                              <MenuItem value={"جواب دعویٰ، بحث"}>
                                جواب دعویٰ، بحث
                              </MenuItem>
                              <MenuItem value={"جواب درخواست، بحث"}>
                                جواب درخواست، بحث
                              </MenuItem>
                              <MenuItem value={"تقرری وکیل، شہادت"}>
                                تقرری وکیل، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت مدعی"}>
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem value={"شہادت مدعا علیہ"}>
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem value={"طلبیدہ گواہان، شہادت"}>
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت استغاثہ"}>
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem value={"یکطرفہ شہادت"}>
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem value={"حکم بر درخواست"}>
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem value={"حکم بر مقدمہ"}>
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem value={"حکم بر مقدمہ"}>
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، حکم"}>
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
                        <TableCell component="th" scope="row">
                          {/* {setSerialNo(serialNo + 1)} */}
                          {/* {serialNo} */}
                          {serialNo[index++]}
                        </TableCell>
                        <TableCell align="right">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile["Case Title"]}
                        </TableCell>
                        <TableCell align="center">
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
                        <TableCell align="center">
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
                        </TableCell>
                        <TableCell>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-dialog"
                              label=""
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
                            <InputLabel id="demo-simple-select-outlined-label">
                              خلاصہ کارواءی
                            </InputLabel>
                            <Select
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
                              label="Select Sub Type"
                            >
                              <MenuItem value="">
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem value={"حاضری"}>حاضری</MenuItem>
                              <MenuItem value={"بحث"}>بحث</MenuItem>
                              <MenuItem value={"شہادت"}>شہادت</MenuItem>
                              <MenuItem value={"حکم"}>حکم</MenuItem>
                              <MenuItem value="">
                                <em>All Categories</em>
                              </MenuItem>
                              <MenuItem value={"حاضری، ریکارڈ"}>
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"فرد جرم، حاضری"}>
                                فرد جرم، حاضری
                              </MenuItem>
                              <MenuItem value={"کمنٹس، حاضری"}>
                                کمنٹس، حاضری
                              </MenuItem>
                              <MenuItem value={"رپورٹ SHO، حاضری"}>
                                رپورٹ SHO، حاضری
                              </MenuItem>

                              <MenuItem value={"طلبی انکوائری، حاضری"}>
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem value={"حاضری، اشتہار"}>
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem value={"آدائیگی، حاضری"}>
                                آدائیگی، حاضری
                              </MenuItem>
                              <MenuItem value={"ابتدائی بحث"}>
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem value={"یکطرفہ بحث"}>
                                یکطرفہ بحث
                              </MenuItem>

                              <MenuItem value={"بحث، رپورٹ اہل کمیشن"}>
                                بحث، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem value={"بحث، ریکارڈ"}>
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"بقایا بحث"}>بقایا بحث</MenuItem>
                              <MenuItem value={"تقرری وکیل، بحث"}>
                                تقرری وکیل، بحث
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، بحث"}>
                                راضی نامہ، بحث
                              </MenuItem>
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem value={"بحث بر مقدمہ"}>
                                بحث بر مقدمہ
                              </MenuItem>

                              <MenuItem value={"بحث بر نگرانی"}>
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem value={"بحث بر درخواست"}>
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem value={"تنقیحات، بحث"}>
                                تنقیحات، بحث
                              </MenuItem>
                              <MenuItem value={"جواب دعویٰ، بحث"}>
                                جواب دعویٰ، بحث
                              </MenuItem>
                              <MenuItem value={"جواب درخواست، بحث"}>
                                جواب درخواست، بحث
                              </MenuItem>
                              <MenuItem value={"تقرری وکیل، شہادت"}>
                                تقرری وکیل، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت مدعی"}>
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem value={"شہادت مدعا علیہ"}>
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem value={"طلبیدہ گواہان، شہادت"}>
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت استغاثہ"}>
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem value={"یکطرفہ شہادت"}>
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem value={"حکم بر درخواست"}>
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem value={"حکم بر مقدمہ"}>
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، حکم"}>
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
                        <TableCell component="th" scope="row">
                          {/* {cases.indexOf(caseFile) + 1} */}
                          {/* {serialNo} */}
                          {serialNo[index++]}
                        </TableCell>
                        <TableCell align="right">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile["Case Title"]}
                        </TableCell>
                        <TableCell align="center">
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
                        <TableCell align="center">
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
                        </TableCell>
                        <TableCell>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-dialog"
                              label=""
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
                            <InputLabel id="demo-simple-select-outlined-label">
                              خلاصہ کارواءی
                            </InputLabel>
                            <Select
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
                              label="Select Sub Type"
                            >
                              <MenuItem value="">
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem value={"حاضری"}>حاضری</MenuItem>
                              <MenuItem value={"بحث"}>بحث</MenuItem>
                              <MenuItem value={"شہادت"}>شہادت</MenuItem>
                              <MenuItem value={"حکم"}>حکم</MenuItem>
                              <MenuItem value="">
                                <em>All Categories</em>
                              </MenuItem>
                              <MenuItem value={"حاضری، ریکارڈ"}>
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"فرد جرم، حاضری"}>
                                فرد جرم، حاضری
                              </MenuItem>
                              <MenuItem value={"کمنٹس، حاضری"}>
                                کمنٹس، حاضری
                              </MenuItem>
                              <MenuItem value={"رپورٹ SHO، حاضری"}>
                                رپورٹ SHO، حاضری
                              </MenuItem>

                              <MenuItem value={"طلبی انکوائری، حاضری"}>
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem value={"حاضری، اشتہار"}>
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem value={"آدائیگی، حاضری"}>
                                آدائیگی، حاضری
                              </MenuItem>
                              <MenuItem value={"ابتدائی بحث"}>
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem value={"یکطرفہ بحث"}>
                                یکطرفہ بحث
                              </MenuItem>

                              <MenuItem value={"بحث، رپورٹ اہل کمیشن"}>
                                بحث، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem value={"بحث، ریکارڈ"}>
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"بقایا بحث"}>بقایا بحث</MenuItem>
                              <MenuItem value={"تقرری وکیل، بحث"}>
                                تقرری وکیل، بحث
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، بحث"}>
                                راضی نامہ، بحث
                              </MenuItem>
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem value={"بحث بر مقدمہ"}>
                                بحث بر مقدمہ
                              </MenuItem>

                              <MenuItem value={"بحث بر نگرانی"}>
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem value={"بحث بر درخواست"}>
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem value={"تنقیحات، بحث"}>
                                تنقیحات، بحث
                              </MenuItem>
                              <MenuItem value={"جواب دعویٰ، بحث"}>
                                جواب دعویٰ، بحث
                              </MenuItem>
                              <MenuItem value={"جواب درخواست، بحث"}>
                                جواب درخواست، بحث
                              </MenuItem>
                              <MenuItem value={"تقرری وکیل، شہادت"}>
                                تقرری وکیل، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت مدعی"}>
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem value={"شہادت مدعا علیہ"}>
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem value={"طلبیدہ گواہان، شہادت"}>
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت استغاثہ"}>
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem value={"یکطرفہ شہادت"}>
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem value={"حکم بر درخواست"}>
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem value={"حکم بر مقدمہ"}>
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، حکم"}>
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
                        <TableCell component="th" scope="row">
                          {/* {cases.indexOf(caseFile) + 1} */}
                          {/* {serialNo} */}
                          {serialNo[index++]}
                        </TableCell>
                        <TableCell align="right">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile["Case Title"]}
                        </TableCell>
                        <TableCell align="center">
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
                        <TableCell align="center">
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
                        </TableCell>
                        <TableCell>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-dialog"
                              label=""
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
                            <InputLabel id="demo-simple-select-outlined-label">
                              خلاصہ کارواءی
                            </InputLabel>
                            <Select
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
                              label="Select Sub Type"
                            >
                              <MenuItem value="">
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem value={"حاضری"}>حاضری</MenuItem>
                              <MenuItem value={"بحث"}>بحث</MenuItem>
                              <MenuItem value={"شہادت"}>شہادت</MenuItem>
                              <MenuItem value={"حکم"}>حکم</MenuItem>
                              <MenuItem value="">
                                <em>All Categories</em>
                              </MenuItem>
                              <MenuItem value={"حاضری، ریکارڈ"}>
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"فرد جرم، حاضری"}>
                                فرد جرم، حاضری
                              </MenuItem>
                              <MenuItem value={"کمنٹس، حاضری"}>
                                کمنٹس، حاضری
                              </MenuItem>
                              <MenuItem value={"رپورٹ SHO، حاضری"}>
                                رپورٹ SHO، حاضری
                              </MenuItem>

                              <MenuItem value={"طلبی انکوائری، حاضری"}>
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem value={"حاضری، اشتہار"}>
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem value={"آدائیگی، حاضری"}>
                                آدائیگی، حاضری
                              </MenuItem>
                              <MenuItem value={"ابتدائی بحث"}>
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem value={"یکطرفہ بحث"}>
                                یکطرفہ بحث
                              </MenuItem>

                              <MenuItem value={"بحث، رپورٹ اہل کمیشن"}>
                                بحث، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem value={"بحث، ریکارڈ"}>
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"بقایا بحث"}>بقایا بحث</MenuItem>
                              <MenuItem value={"تقرری وکیل، بحث"}>
                                تقرری وکیل، بحث
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، بحث"}>
                                راضی نامہ، بحث
                              </MenuItem>
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem value={"بحث بر مقدمہ"}>
                                بحث بر مقدمہ
                              </MenuItem>

                              <MenuItem value={"بحث بر نگرانی"}>
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem value={"بحث بر درخواست"}>
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem value={"تنقیحات، بحث"}>
                                تنقیحات، بحث
                              </MenuItem>
                              <MenuItem value={"جواب دعویٰ، بحث"}>
                                جواب دعویٰ، بحث
                              </MenuItem>
                              <MenuItem value={"جواب درخواست، بحث"}>
                                جواب درخواست، بحث
                              </MenuItem>
                              <MenuItem value={"تقرری وکیل، شہادت"}>
                                تقرری وکیل، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت مدعی"}>
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem value={"شہادت مدعا علیہ"}>
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem value={"طلبیدہ گواہان، شہادت"}>
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت استغاثہ"}>
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem value={"یکطرفہ شہادت"}>
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem value={"حکم بر درخواست"}>
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem value={"حکم بر مقدمہ"}>
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، حکم"}>
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
                        <TableCell component="th" scope="row">
                          {/* {cases.indexOf(caseFile) + 1} */}
                          {/* {serialNo} */}
                          {serialNo[index++]}
                        </TableCell>
                        <TableCell align="right">
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell align="right">
                          {format?.(
                            parseISO(caseFile["Date of Institution "]),
                            "dd-MM-yyy"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {caseFile["Case Title"]}
                        </TableCell>
                        <TableCell align="center">
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
                        <TableCell align="center">
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
                        </TableCell>
                        <TableCell>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            fullWidth
                          >
                            <KeyboardDatePicker
                              // margin="normal"
                              id="date-picker-dialog"
                              label=""
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
                            <InputLabel id="demo-simple-select-outlined-label">
                              خلاصہ کارواءی
                            </InputLabel>
                            <Select
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
                              label="Select Sub Type"
                            >
                              <MenuItem value="">
                                <em>Mostly Used</em>
                              </MenuItem>
                              <MenuItem value={"حاضری"}>حاضری</MenuItem>
                              <MenuItem value={"بحث"}>بحث</MenuItem>
                              <MenuItem value={"شہادت"}>شہادت</MenuItem>
                              <MenuItem value={"حکم"}>حکم</MenuItem>
                              <MenuItem value="">
                                <em>All Categories</em>
                              </MenuItem>
                              <MenuItem value={"حاضری، ریکارڈ"}>
                                حاضری، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"فرد جرم، حاضری"}>
                                فرد جرم، حاضری
                              </MenuItem>
                              <MenuItem value={"کمنٹس، حاضری"}>
                                کمنٹس، حاضری
                              </MenuItem>
                              <MenuItem value={"رپورٹ SHO، حاضری"}>
                                رپورٹ SHO، حاضری
                              </MenuItem>

                              <MenuItem value={"طلبی انکوائری، حاضری"}>
                                طلبی انکوائری، حاضری
                              </MenuItem>
                              <MenuItem value={"حاضری، اشتہار"}>
                                حاضری، اشتہار
                              </MenuItem>
                              <MenuItem value={"آدائیگی، حاضری"}>
                                آدائیگی، حاضری
                              </MenuItem>
                              <MenuItem value={"ابتدائی بحث"}>
                                ابتدائی بحث
                              </MenuItem>
                              <MenuItem value={"یکطرفہ بحث"}>
                                یکطرفہ بحث
                              </MenuItem>

                              <MenuItem value={"بحث، رپورٹ اہل کمیشن"}>
                                بحث، رپورٹ اہل کمیشن
                              </MenuItem>
                              <MenuItem value={"بحث، ریکارڈ"}>
                                بحث، ریکارڈ
                              </MenuItem>
                              <MenuItem value={"بقایا بحث"}>بقایا بحث</MenuItem>
                              <MenuItem value={"تقرری وکیل، بحث"}>
                                تقرری وکیل، بحث
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، بحث"}>
                                راضی نامہ، بحث
                              </MenuItem>
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                              <MenuItem value={"بحث بر مقدمہ"}>
                                بحث بر مقدمہ
                              </MenuItem>

                              <MenuItem value={"بحث بر نگرانی"}>
                                بحث بر نگرانی
                              </MenuItem>
                              <MenuItem value={"بحث بر درخواست"}>
                                بحث بر درخواست
                              </MenuItem>
                              <MenuItem value={"تنقیحات، بحث"}>
                                تنقیحات، بحث
                              </MenuItem>
                              <MenuItem value={"جواب دعویٰ، بحث"}>
                                جواب دعویٰ، بحث
                              </MenuItem>
                              <MenuItem value={"جواب درخواست، بحث"}>
                                جواب درخواست، بحث
                              </MenuItem>
                              <MenuItem value={"تقرری وکیل، شہادت"}>
                                تقرری وکیل، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت مدعی"}>
                                شہادت مدعی
                              </MenuItem>
                              <MenuItem value={"شہادت مدعا علیہ"}>
                                شہادت مدعا علیہ
                              </MenuItem>
                              <MenuItem value={"طلبیدہ گواہان، شہادت"}>
                                طلبیدہ گواہان، شہادت
                              </MenuItem>
                              <MenuItem value={"شہادت استغاثہ"}>
                                شہادت استغاثہ
                              </MenuItem>
                              <MenuItem value={"یکطرفہ شہادت"}>
                                یکطرفہ شہادت
                              </MenuItem>
                              <MenuItem value={"حکم بر درخواست"}>
                                حکم بر درخواست
                              </MenuItem>
                              <MenuItem value={"حکم بر مقدمہ"}>
                                حکم بر مقدمہ
                              </MenuItem>
                              <MenuItem value={"راضی نامہ، حکم"}>
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
