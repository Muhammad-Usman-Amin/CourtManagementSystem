import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useReactToPrint } from "react-to-print";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  useTheme,
  TableContainer,
  Paper,
  Typography,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import { getFortnightlyReport, getPendingCases } from "../../actions/cases";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import FormatCaseNumber from "../FormatCaseNumber";

const useStyles = makeStyles((theme) =>
  createStyles({
    centeredDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // width: 100%,
      // height: 100vh,
      // border: "1px solid black",
      // borderRadius: "10px",
      // overflow: "hidden",
    },
    table: {
      // margin: theme.spacing(1),
      borderCollapse: "collapse",
      maxWidth: "8.5in",
      // minHeight: '14in', //causes issue
      maxHeight: "13in",
      // margin: "0 auto",
      // minWidth: 650,
      // width: "100%",
      // border: "1px solid black",
      alignContent: "center",
      // border: "1px solid black",
      // margin: "20px 20px 20px 20px",
      // borderRadius: "30px",
      border: "1px solid",
      borderColor: theme.palette.primary.black,
      tableLayout: "auto",
      // margin: 0,
      // padding: 0,
    },
    tableHeaderCell: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      // fontFamily: "Jameel Noori Nastaleeq",
      border: "1px solid",
      borderColor: theme.palette.primary.black,
      fontWeight: "bold",
      fontSize: 8,
      // minWidth: "100px",
      // align: "center",
      textAlign: "center",
      margin: 0, // Set margin to 0
      padding: 0,
      lineHeight: 1.2,
      // backgroundColor: "lightgray",
      maxWidth: "fit-content",
    },
    tableEmptyCell: {
      margin: 0,
      padding: 0,
      border: "1px solid",
      borderColor: theme.palette.primary.black,
      // fontWeight: "bold",
      // fontSize: 11,
      minWidth: "5px",
      // align: "center",
      // textAlign: "center",
    },
    tableCell: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: 12,
      // align: "center",
      textAlign: "left",
      border: "1px solid",
      borderColor: theme.palette.black,
      // borderColor: theme.palette.grey[300],
      // padding: theme.spacing(1),
      // fontFamily: "Alvi Nastaleeq Regular",
      // fontFamily: "Jameel Noori Nastaleeq",
      margin: 0, // Set margin to 0
      padding: 0,
      maxWidth: "fit-content",
    },
    tableCellTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      // fontSize: 12,
      // align: "center",
      textAlign: "left",
      border: "1px solid",
      borderColor: theme.palette.black,
      // borderColor: theme.palette.grey[300],
      // padding: theme.spacing(1),
      // fontFamily: "Alvi Nastaleeq Regular",
      // fontFamily: "Jameel Noori Nastaleeq",
      margin: 0, // Set margin to 0
      padding: 3,
      // maxWidth: "max-content",
    },
    tableCellSno: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      // fontSize: 12,
      // align: "center",
      textAlign: "center",
      border: "1px solid",
      borderColor: theme.palette.black,
      // borderColor: theme.palette.grey[300],
      // padding: theme.spacing(1),
      // fontFamily: "Alvi Nastaleeq Regular",
      // fontFamily: "Jameel Noori Nastaleeq",
      margin: 0, // Set margin to 0
      padding: 0,
      maxWidth: "fit-content",
    },
    tableCellFixBorder: {
      maxWidth: "max-content",
      whiteSpace: "nowrap",
      padding: 0,
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      borderTop: "none",
      borderBottom: "none",
    },
    tableBorder2: {
      border: "2px solid black",
    },
    rightAlignedCell: {
      textAlign: "right",
    },
    tableHeadTwo: {
      fontSize: 18,
      // fontFamily: "Alvi Nastaleeq Regular",
      fontFamily: "Jameel Noori Nastaleeq",
      // fontStyle: "",
      fontWeight: "bold",
      padding: "20px",
    },
    tableCaseTitle: {
      fontSize: 14,
      // fontFamily: "Alvi Nastaleeq Regular",
      fontFamily: "Jameel Noori Nastaleeq",
      // fontStyle: "",
      fontWeight: "bold",
      padding: "10px",
    },
    head: {
      // backgroundColor: theme.palette.grey[200],
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[500]
          : theme.palette.grey[200],
    },
    cell: {
      fontWeight: "bold",
    },
    numericCell: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: "1.2rem",
    },
    categoryCell: {
      fontWeight: "bold",
    },
  })
);

// function createData(
//   category,
//   pending,
//   tIn,
//   tOut,
//   restoredRemanded,
//   institutions,
//   disposal,
//   balance
// ) {
//   return {
//     category,
//     pending,
//     tIn,
//     tOut,
//     restoredRemanded,
//     institutions,
//     disposal,
//     balance,
//   };
// }

// const rows = [
//   createData("Civil Suits", 159, 6, 24, 4, 120, 61, 94),
//   createData("Family Cases", 237, 9, 37, 4, 105, 72, 130),
//   createData("Criminal Cases", 262, 16, 24, 6, 110, 90, 145),
//   createData("Miscellaneous", 305, 3, 67, 4, 130, 72, 100),
// ];

// Assuming `pendingCases` is the array of objects containing the cases data
const categorizePendingCases = (pendingCases) => {
  // Use `reduce` to categorize and count the cases
  const categoryCount = pendingCases.reduce((acc, caseItem) => {
    // Extract the category name from the object
    const category = caseItem["Category Per PQS"];

    // Initialize the count for this category if it doesn't exist
    if (!acc[category]) {
      acc[category] = 0;
    }

    // Increment the count for this category
    acc[category] += 1;

    return acc;
  }, {});

  // Convert the `categoryCount` object to an array of objects
  // const categorizedArray = Object.keys(categoryCount).map((category) => {
  //     return {
  //         category: category,
  //         count: categoryCount[category],
  //     };
  // });

  return categoryCount;
  // return categorizedArray;
};

const PrintFortnitely = (props) => {
  const orderDate = new Date();
  const dateInstitution = props.location.state.dateInstitution;

  const dispatch = useDispatch();
  const groupedCases = useSelector((state) => state.groupedCases);
  const controlPanel = useSelector((state) => state.controlCenter);
  const fortnightlyReport = useSelector((state) => state.fortnightlyReport);
  const pendingCases = useSelector((state) => state.pendingCases);
  const disposedCases = useSelector((state) => state.disposalCases);
  const totalInstitutions = useSelector((state) => state.institutionCases);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categorizedDataPend, setCategorizedDataPend] = useState([]);
  const [categorizedDataDisp, setCategorizedDataSDisp] = useState([]);
  const [categorizedDataInst, setCategorizedDataInst] = useState([]);
  const [cached, setCached] = useState({});

  useEffect(() => {
    // console.log(fortnightlyReport);
    fortnightlyReport.forEach((row) => {
      row.firstFortnight.forEach((item) => {
        setCached((prevData) => ({
          ...prevData,
          [item.category]: item, // Use category as key
        }));
      });
    });
  }, [fortnightlyReport]);

  // useEffect(() => {
    // console.log(cached);
    // console.log(cached['Civil-001-Civil Suits (Original Jurisdiction)']?.institutions);
  // }, [cached]);

  // useEffect(() => {
    // console.log(groupedCases);
  // }, [groupedCases]);
  // useEffect(() => {
    // console.log(categorizedDataDisp);
  // }, [categorizedDataDisp]);
  // useEffect(() => {
    // console.log(categorizedDataInst);
    // console.log(categorizedDataInst["ar"]);
  // }, [categorizedDataInst]);
  // useEffect(() => {
    // console.log(totalInstitutions);
  // }, [totalInstitutions]);

  useEffect(() => {
    // console.log(pendingCases);
    // Get the categorized array
    setCategorizedDataPend(categorizePendingCases(pendingCases));
    setCategorizedDataSDisp(categorizePendingCases(disposedCases));
    setCategorizedDataInst(categorizePendingCases(totalInstitutions));

    // if(pendingCases[pendingCases.length -1])
      // console.log(FormatCaseNumber(pendingCases[pendingCases.length -1]));
    // console.log(pendingCases[105]);
  }, [pendingCases, disposedCases, disposedCases]);

  // useEffect(() => {
    // console.log(categorizedData);
    // console.log(categorizedData["Execution Petitions"]);
  // }, [categorizedDataPend]);

  useEffect(() => {
    dispatch(
      getFortnightlyReport({
        reqQuery: "FortnightlyReport",
        selectedMonth: selectedDate,
      })
    );
    dispatch(
      getPendingCases({ reqQuery: "PendingCases", datePendency: selectedDate })
    );
  }, [selectedDate]);
  // useEffect(() => {
  //   // institutionCases.filter(item => item)
  // }, [institutionCases]);

  // useEffect(() => {
  //   console.log(institutionCases);
  // }, [institutionCases]);

  const classes = useStyles();
  const tableRef = React.useRef();
  const firstFortnightlyRef = React.useRef();
  const secondfortnightlyRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const handleFirstFortnightlyPrint = useReactToPrint({
    content: () => firstFortnightlyRef.current,
  });
  const handleSecondFortnightlyPrint = useReactToPrint({
    content: () => secondfortnightlyRef.current,
  });

  const rowData = (data) => {
    return (
      <>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.pend}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.tin}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.tout}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.restoredRemanded}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.disposal}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
          style={{ backgroundColor: "lightgray" }}
        >
          {data?.bal}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.pendNew}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.tinNew}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.toutNew}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.restoredRemandedNew}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.instNew}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
        >
          {data?.disposalNew}
        </TableCell>
        <TableCell
          colSpan={1}
          align="center"
          className={classes.tableHeaderCell}
          style={{ backgroundColor: "lightgray" }}
        >
          {data?.balNew}
        </TableCell>
      </>
    );
  };

  return !fortnightlyReport.length &&
    !categorizedDataPend.length &&
    !categorizedDataDisp.length &&
    !categorizedDataInst.length &&
    !pendingCases.length &&
    !disposedCases.length &&
    !totalInstitutions.length ? (
    <LinearProgress />
  ) : (
    <>
      <>
        <Grid
          container
          spacing={1}
          alignItems="center" // Align items to the center vertically
          justify="flex-start"
        >
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Fortnightly for the month of:
            </Typography>
          </Grid>
          <Grid item md={3} container justify="center">
            <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
              <KeyboardDatePicker
                // margin="normal"
                disableToolbar
                views={["month", "year"]}
                id="date-picker-causeList"
                label="Select Month & Year"
                // autoOk
                variant="dialog"
                format="MMM yyyy"
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                InputProps={{
                readOnly: true,
              }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs="auto" md={6} lg={6}></Grid>
        </Grid>
      </>
      {/* <div ref={firstFortnightlyRef}> */}
      <div
        className={classes.centeredDiv}
        style={{ flexGrow: 1, marginTop: 5 }}
      >
        <Grid container spacing={1} alignContent="center" justify="center">
          <Grid item container justify="center" xs={12}>
            <Button
              // fullWidth
              variant="contained"
              color="secondary"
              onClick={handleFirstFortnightlyPrint}
            >
              Print
            </Button>
          </Grid>
          <Grid item container>
            <Typography>First Fortnighly Report (1-15th)</Typography>
          </Grid>
          <Grid item xs={12} container justify="center">
            <TableContainer component={Paper}>
              <Table
                ref={firstFortnightlyRef}
                // className={classes.table}
                aria-label="Fortnighly Table table"
                style={{ minWidth: 650 }}
                size="small"
              >
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell className={classes.categoryCell}>
                      Category Name
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Pending
                    </TableCell>
                    <TableCell className={classes.categoryCell}>T-In</TableCell>
                    <TableCell className={classes.categoryCell}>T-Out</TableCell>
                    <TableCell className={classes.categoryCell}>
                      Restored/Remanded
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Institutions
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Disposal
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fortnightlyReport.map((row) => (
                    <>
                      {row.firstFortnight.map((item) => (
                        <TableRow key={row.category}>
                          <TableCell
                            className={classes.categoryCell}
                            component="th"
                            scope="row"
                          >
                            {/* {item.category} */}
                            {item.category.split("-").pop()}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {/* {groupedCases[item.category.split("-").pop()]
                              ?.length +
                              item.totalDisposals -
                              (item.institutions + item.restored + item.transferredIn)} */}
                            {(categorizedDataPend[item.category] !== undefined
                              ? categorizedDataPend[item.category]
                              : 0) +
                              (categorizedDataDisp[item.category] !== undefined
                                ? categorizedDataDisp[item.category]
                                : 0) -
                              (categorizedDataInst[item.category] !== undefined
                                ? categorizedDataInst[item.category]
                                : 0)}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {item.transferredIn}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {item.totalTransferOut}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {item.restored}
                          </TableCell>
                          <TableCell style={{color: 'green'}} className={classes.numericCell}>
                            {item.institutions}
                          </TableCell>
                          <TableCell style={{color: 'red'}} className={classes.numericCell}>
                            {item.totalDisposals}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {(categorizedDataPend[item.category] !== undefined
                              ? categorizedDataPend[item.category]
                              : 0) +
                              (categorizedDataDisp[item.category] !== undefined
                                ? categorizedDataDisp[item.category]
                                : 0) -
                              (categorizedDataInst[item.category] !== undefined
                                ? categorizedDataInst[item.category]
                                : 0) +
                              item.institutions +
                              item.transferredIn +
                              item.restored -
                              (item.totalTransferOut + item.totalDisposals)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>

      <div
        className={classes.centeredDiv}
        style={{ flexGrow: 1, marginTop: 20 }}
      >
        <Grid container spacing={1} alignContent="center" justify="center">
          <Grid item container justify="center" xs={12}>
            <Button
              // fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSecondFortnightlyPrint}
            >
              Print
            </Button>
          </Grid>
          <Grid item container>
            <Typography>Second Fortnighly Report (16-31st)</Typography>
          </Grid>
          <Grid item xs={12} container justify="center">
            <TableContainer component={Paper}>
              <Table
                ref={secondfortnightlyRef}
                // className={classes.table}
                aria-label="simple table"
                style={{ minWidth: 650 }}
                size="small"
              >
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell className={classes.categoryCell}>
                      Category Name
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Pending
                    </TableCell>
                    <TableCell className={classes.categoryCell}>T-In</TableCell>
                    <TableCell className={classes.categoryCell}>T-Out</TableCell>
                    <TableCell className={classes.categoryCell}>
                      Restored/Remanded
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Institutions
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Disposal
                    </TableCell>
                    <TableCell className={classes.categoryCell}>
                      Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fortnightlyReport.map((row) => (
                    <>
                      {row.secondFortnight.map((item) => (
                        <TableRow key={row.category}>
                          <TableCell
                            className={classes.categoryCell}
                            component="th"
                            scope="row"
                          >
                            {/* {item.category} */}
                            {item.category.split("-").pop()}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {/* {groupedCases[item.category.split("-").pop()]
                              ?.length +
                              item.totalDisposals -
                              (item.institutions +
                                item.restored +
                                item.transferredIn)} */}
                            {(categorizedDataPend[item.category] !== undefined
                              ? categorizedDataPend[item.category]
                              : 0) +
                              (categorizedDataDisp[item.category] !== undefined
                                ? categorizedDataDisp[item.category]
                                : 0) -
                              (categorizedDataInst[item.category] !== undefined
                                ? categorizedDataInst[item.category]
                                : 0) +
                              cached[item.category]?.institutions +
                              cached[item.category]?.transferredIn +
                              cached[item.category]?.restored -
                              (cached[item.category]?.totalTransferOut +
                                cached[item.category]?.totalDisposals)}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {item.transferredIn}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {item.totalTransferOut}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {item.restored}
                          </TableCell>
                          <TableCell style={{color: 'green'}} className={classes.numericCell}>
                            {item.institutions}
                          </TableCell>
                          <TableCell style={{color: 'red'}} className={classes.numericCell}>
                            {item.totalDisposals}
                          </TableCell>
                          <TableCell className={classes.numericCell}>
                            {(categorizedDataPend[item.category] !== undefined
                              ? categorizedDataPend[item.category]
                              : 0) +
                              (categorizedDataDisp[item.category] !== undefined
                                ? categorizedDataDisp[item.category]
                                : 0) -
                              (categorizedDataInst[item.category] !== undefined
                                ? categorizedDataInst[item.category]
                                : 0) +
                              cached[item.category]?.institutions +
                              cached[item.category]?.transferredIn +
                              cached[item.category]?.restored -
                              (cached[item.category]?.totalTransferOut +
                                cached[item.category]?.totalDisposals) +
                              item.institutions +
                              item.transferredIn +
                              item.restored -
                              (item.totalTransferOut + item.totalDisposals)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
      {/* </div> */}

      <div
        className={classes.centeredDiv}
        style={{ flexGrow: 1, marginTop: 15 }}
      >
        {/* <div> */}
        <Grid container spacing={2} alignContent="center" justify="center">
          <Grid item container justify="center" xs={12}>
            <Button
              // fullWidth
              variant="contained"
              color="secondary"
              onClick={handlePrint}
            >
              Print
            </Button>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Table
              ref={tableRef}
              size="small"
              className={classes.table}
              aria-label="simple table"
              // dir="rtl"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    // className={classes.tableHeaderCell}
                    align="center"
                    colSpan={16}
                    style={{
                      fontSize: 24,
                      // fontFamily: "Times Roman",
                      // fontStyle: "",
                      fontWeight: "bold",
                      // padding: "10px",
                      margin: 0, // Set margin to 0
                      padding: 0,
                      borderBottom: "none",
                    }}
                  >
                    Implementation of National Judicial Policy
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tableHeaderCell}
                    align="center"
                    colSpan={16}
                    style={{
                      fontSize: 20,
                      // fontFamily: "Times Roman",
                      // fontStyle: "",
                      fontWeight: "bold",
                      // padding: "10px",
                      margin: 0, // Set margin to 0
                      padding: 0,
                      borderTop: "none",
                      borderBottom: "none",
                    }}
                  >
                    District Courts
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tableHeaderCell}
                    align="center"
                    colSpan={16}
                    style={{
                      fontSize: 12,
                      // fontFamily: "Times Roman",
                      fontWeight: "bold",
                      margin: 0,
                      padding: 0,
                      borderTop: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // padding: "10px",
                      }}
                    >
                      <span>Court Name: {controlPanel[0]?.courtNumber}</span>
                      <span>
                        Statement for the period:{" "}
                        {format?.(dateInstitution, "MMMM, yyyy").toUpperCase()}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* <TableHead> */}
                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // align="center"
                    // style={{ maxWidth: 1 }}
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellSno}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="center"
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellTitle}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    align="center"
                    colSpan={6}
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    Old Cases
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={7}
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    New Cases
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    // className={classes.tableCellSno}
                    className={classes.tableCellFixBorder}
                    // align="left"
                    // colSpan={1}
                    // style={{ maxWidth: 1 }}
                    // style={{ maxWidth: 'max-content', whiteSpace: 'nowrap', padding: 0 }}
                    // className={classes.tableHeaderCell}
                  >
                    Sr#
                  </TableCell>
                  <TableCell
                    // align="center"
                    // colSpan={2}
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellTitle}
                    className={classes.tableCellFixBorder}
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Criminal Cases
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    Filed upto 31-12-2017
                  </TableCell>
                  <TableCell
                    colSpan={7}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    Filed from 01-01-2018
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    // align="center"
                    // colSpan={1}
                    // style={{ maxWidth: 1 }}
                    // style={{ maxWidth: 'max-content', whiteSpace: 'nowrap', padding: 0 }}
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellSno}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    // align="center"
                    // colSpan={2}
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellTitle}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Pend
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-In
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-Out
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Restored/<br></br>Remanded
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Disp
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    Bal
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Pend
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-In
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-Out
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Restored/ <br></br>Remanded
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Inst
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Disp
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    Bal
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // align="center"
                    // style={{ maxWidth: 1 }}
                    // style={{ maxWidth: 'max-content', whiteSpace: 'nowrap', padding: 0 }}
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellSno}
                    style={{ borderBottom: "none" }}
                  >
                    1
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Time Fixed Bail Applications <br></br> (a) Magistrate (3
                    Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    // style={{ maxWidth: 1 }}
                    // style={{ maxWidth: 'max-content', whiteSpace: 'nowrap', padding: 0 }}
                    className={classes.tableCellSno}
                    style={{ borderTop: "none" }}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    (b) Session Court (5 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    // style={{ maxWidth: 'max-content', whiteSpace: 'nowrap', padding: 0 }}
                    className={classes.tableCellSno}
                  >
                    2
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Cancellation of bail (15 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    3
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Imprisonment upto 7 years (6 Months)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    4
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Imprisonment above 7 years <br></br>including death sentence
                    (1 Year)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    5
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Preventive detention cases ( As early as possible)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    6
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Transfer Applications u/s 526, 528 CrPC (7 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    7
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Misc. Application i.e. superdari, disposal <br></br> of
                    property etc (7 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    1
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    <b>Prioritized</b>
                    <br></br>
                    Narcotics Cases
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    2
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Criminal Revisions
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    3
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Anti-terrorism Cases
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    4
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Women Cases
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    5
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Juvenile Cases
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    6
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Cases of Overseas Pakistanis (either complainant <br></br>{" "}
                    or accused)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    7
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Others
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={
                      classes.tableCellSno + " " + classes.tableBorder2
                    }
                    style={{ borderRight: "none" }}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={
                      classes.tableCellTitle + " " + classes.tableBorder2
                    }
                    style={{ borderLeft: "none" }}
                  >
                    <b>Total</b>
                  </TableCell>
                  {rowData()}
                </TableRow>

                {/* <TableHead> */}

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    // className={classes.tableCellSno}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellTitle}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    align="center"
                    colSpan={6}
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    Old Cases
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={7}
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    New Cases
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    // className={classes.tableCellSno}
                    className={classes.tableCellFixBorder}
                  >
                    Sr#
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellTitle}
                    className={classes.tableCellFixBorder}
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Civil Cases
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    Filed upto 31-12-2017
                  </TableCell>
                  <TableCell
                    colSpan={7}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 12 }}
                  >
                    Filed from 01-01-2018
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    // className={classes.tableCellSno}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    // className={classes.tableCellTitle}
                    className={classes.tableCellFixBorder}
                  ></TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Pend
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-In
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-Out
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Restored/<br></br>Remanded
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Disp
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    Bal
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Pend
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-In
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    T-Out
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Restored/ <br></br>Remanded
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Inst
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    Disp
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ backgroundColor: "lightgray" }}
                  >
                    Bal
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    1
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Time Fixed <br></br> Stay applications (15 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    2
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Rent cases (4 Months)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    3
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Appeals in rent cases (2 Months)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    4
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Revision petitions (3 Months) (1 Year)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    5
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Family cases (3-6 Months)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    6
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Appeals in family cases (30 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    7
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Appeals in insolvency cases (30 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    8
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Review applications (30 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    9
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Negotiable instrument cases u/o 37 CPC (90 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    10
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Cases of the Overseas Pakistanis (6 Months)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    1
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    <b>Prioritized</b>
                    <br></br>
                    Women Cases
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    2
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Juvenile Cases
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    3
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Small Claims and Minor Offences
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    4
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Trade, Commercial, Investment
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    5
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Civil Execution application
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    6
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Civil Suits
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  >
                    7
                  </TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    Others
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={
                      classes.tableCellSno + " " + classes.tableBorder2
                    }
                    style={{ borderRight: "none" }}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={
                      classes.tableCellTitle + " " + classes.tableBorder2
                    }
                    style={{ borderLeft: "none" }}
                  >
                    <b>Total</b>
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    // colSpan={1}
                    // className={classes.tableHeaderCell}
                    // align="left"
                    // style={{ maxWidth: 1 }}
                    className={classes.tableCellSno}
                  ></TableCell>
                  <TableCell
                    // colSpan={2}
                    // align="left"
                    // className={classes.tableHeaderCell}
                    className={classes.tableCellTitle}
                  >
                    <b>Grand Total (Criminal + Civil)</b>
                  </TableCell>
                  {rowData()}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PrintFortnitely;
