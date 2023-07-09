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

  const [dateCauseList, setDateCauseList] = useState(new Date());
  const [serialNo, setSerialNo] = useState(0);
  useEffect(() => {
    dispatch(getCauseList({ dateCauseList: dateCauseList }));
  }, [dateCauseList]);

  useEffect(() => {
    dispatch(getCauseList({ dateCauseList: dateCauseList }));
  }, []);

  function getSecondToLastElement(array) {
    if (array.length === 0) {
      return null;
    }
    if (array.length < 2) {
      return array[array.length - 1]; // or any other appropriate value or action
    }
    return array[array.length - 2];
  }

  return (
    <>
      <Grid justify="space-between" container spacing={1} alignItems="center">
        <Grid item xs={12} sm={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
            <KeyboardDatePicker
              // margin="normal"
              id="date-picker-causeList"
              label="CauseList Date"
              autoOk
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

        <Grid item container justify="space-between" xs={12} sm={4}>
          <Divider orientation="vertical" flexItem />
          <Button variant="contained" component={Link} to="/PrintCauseList">
            Print CauseList
          </Button>
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid item xs={12} sm={4} container justify="flex-end">
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
                    getSecondToLastElement(caseFile.causeListEntries)
                      .actionAbstract === "حاضری" ? (
                      <TableRow key={caseFile._id}>
                        <TableCell component="th" scope="row">
                          {/* {setSerialNo(serialNo + 1)} */}
                          {serialNo}
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
                                ).nextDate
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
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
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
                    بحث
                  </TableCell>
                </TableRow>

                {cases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElement(caseFile.causeListEntries)
                      .actionAbstract === "بحث" ? (
                      <TableRow key={caseFile._id}>
                        <TableCell component="th" scope="row">
                          {/* {setSerialNo(serialNo + 1)} */}
                          {serialNo}
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
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
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
                    getSecondToLastElement(caseFile.causeListEntries)
                      .actionAbstract === "شہادت" ? (
                      <TableRow key={caseFile._id}>
                        <TableCell component="th" scope="row">
                          {cases.indexOf(caseFile) + 1}
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
                                ).nextDate
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
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
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
                    getSecondToLastElement(caseFile.causeListEntries)
                      .actionAbstract === "حکم" ? (
                      <TableRow key={caseFile._id}>
                        <TableCell component="th" scope="row">
                          {cases.indexOf(caseFile) + 1}
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
                              <MenuItem value={"بحث بر اپیل"}>
                                بحث بر اپیل
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        {/* <TableCell align="right">{format?.(parseISO(caseFile["Date of Institution "]), "dd MMM-yyy")}</TableCell> */}
                      </TableRow>
                    ) : null}
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
