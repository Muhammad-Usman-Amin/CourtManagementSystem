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
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { getCauseList } from "../../actions/causeLists";
import { LinearProgress } from "@material-ui/core";

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
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[500] : theme.palette.grey[200],
    },
    cell: {
      fontWeight: "bold",
    },
    numericCell: {
      fontWeight: "bold",
      textAlign: "right",
    },
    categoryCell: {
      fontWeight: "bold",
    },
  })
);

function createData(
  category,
  pending,
  tIn,
  tOut,
  restoredRemanded,
  institutions,
  disposal,
  balance
) {
  return {
    category,
    pending,
    tIn,
    tOut,
    restoredRemanded,
    institutions,
    disposal,
    balance,
  };
}

const rows = [
  createData("Civil Suits", 159, 6, 24, 4, 120, 61, 94),
  createData("Family Cases", 237, 9, 37, 4, 105, 72, 130),
  createData("Criminal Cases", 262, 16, 24, 6, 110, 90, 145),
  createData("Miscellaneous", 305, 3, 67, 4, 130, 72, 100),
];

const PrintFortnitely = (props) => {
  // const nextDate = props.location.nextDate;
  // const orderDate = props.location.state.orderDate;
  const orderDate = new Date();
  const dateInstitution = props.location.state.dateInstitution;

  // console.log(orderDate);
  // const [dateCauseList] = useState(
  //   props.location.state.dateCauseList
  // );
  const [dateCauseList] = useState(orderDate);

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.causeLists);
  const institutionCases = useSelector((state) => state.institutionCases);
  const controlPanel = useSelector((state) => state.controlCenter);

  useEffect(() => {
    // institutionCases.filter(item => item)
  }, [institutionCases]);

  let index = 0;
  const [serialNo, setSerialNo] = useState([]);
  useEffect(() => {
    if (!institutionCases)
      dispatch(getCauseList({ dateCauseList: dateCauseList }));
    for (let i = 1; i <= institutionCases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    // console.log(pendingCases);
  }, [institutionCases, dateCauseList, dispatch]);

  const classes = useStyles();
  const tableRef = React.useRef();
  const catRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const handleCatPrint = useReactToPrint({
    content: () => catRef.current,
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

  function getActionEng(action) {
    const str = action.replace(/(^\s+|\s+$)/g, "");
    //The regular expression (^\s+|\s+$) matches one or more (+) whitespace characters (\s) at the beginning (^) or end ($) of the string.
    //The g flag ensures that all occurrences of these patterns are replaced.
    switch (str) {
      case "حاضری":
      case "حاضری، ریکارڈ":
      case "حاضری، اشتہار":
      case "مختارنامہ":
        return "Attendance";
      // break;
      case "جواب دعویٰ":
        return "Written Statement";
      // case ' ترمیمی جواب دعویٰ':
      //   return 'Amended Written Statement';
      // case 'ترمیمی جواب دعویٰ ':
      //   return 'Amended Written Statement';
      // case ' ترمیمی عرضیدعویٰ':
      //   return 'Amended Plaint';
      case "ترمیمی جواب دعویٰ":
        return "Amended Wrtitten Statement";
      case "ترمیمی عرضیدعویٰ":
        return "Amended Plaint";
      case "جواب و بحث":
      case "جواب درخواست":
        return "Replication";
      case "پروفارمہ ای":
        return "Proformas";
      case "تنقیحات":
        return "Framing of Issues";
      case "شہادت":
      case "شہادت استغاثہ":
        return "Evidence";
      case "شہادت سائیل":
        return "Petitioner Evidence";
      case "یکطرفہ شہادت":
        return "Ex-parte Evidence";
      case "شہادت مدعی":
        return "Plaintiff Evidence";
      case "شہادت مدعیہ":
        return "Plaintiff Evidence";
      case "شہادت مدعا علیہم":
        return "Defendants Evidence";
      case "شہادت مدعیان":
        return "Plaintiffs Evidence";
      case "بیلف رپورٹ":
      case "حاضری، بیلف رپورٹ":
        return "Bailiff’s Report";
      case "نادرا رپورٹ":
        return "NADRA's Report";
      case "شہادت مدعا علیہ":
        return "Defendant Evidence";
      case "راضی نامہ":
        return "Compromise";
      case "مصالحت ابتدائی":
        return "Pre-Reconciliation";
      case "مصالحت ثانی":
        return "Post-Reconciliation";
      case "بقایا بحث":
        return "Remaining Arguments";
      case "بحث، ریکارڈ":
        return "Arguments on Application";
      case "بحث بر مقدمہ":
        return "Arguments";
      case "یکطرفہ بحث":
        return "ex-parte Arguments";
      case "بحث بر درخواست":
        return "Arguments on Application";
      case "حکم بر درخواست":
        return "Order on Application";
      case "حکم":
        return "Order";
      case "حکم بر مقدمہ":
        return "Order";
      case "مزید کاروائی":
        return "Others";
      case "انتظار مسل":
        return "Others";
      case "ہمراہ":
        return "Attached";
      case "بقایا آدائیگی":
        return "Remaining Payment";
      default:
        return str;
    }
  }
  // console.log(getActionEng("حاضری"));
  const theme = useTheme();

  return !institutionCases.length ? (
    <LinearProgress />
  ) : (
    <>
      <div
        className={classes.centeredDiv}
        style={{ flexGrow: 1}}
      >
        <Grid container spacing={2} alignContent="center" justify="center">
          <Grid item container justify="center" xs={12}>
            <Button
              // fullWidth
              variant="contained"
              color="secondary"
              onClick={handleCatPrint}
            >
              Print
            </Button>
          </Grid>
          <Grid item xs={12} container justify="center">
            <TableContainer component={Paper}>
              <Table
                ref={catRef}
                // className={classes.table}
                aria-label="simple table"
                style={{minWidth: 650,}}
              >
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell className={classes.categoryCell}>
                      Category Name
                    </TableCell>
                    <TableCell className={classes.numericCell}>
                      Pending
                    </TableCell>
                    <TableCell className={classes.numericCell}>T-In</TableCell>
                    <TableCell className={classes.numericCell}>T-Out</TableCell>
                    <TableCell className={classes.numericCell}>
                      Restored/Remanded
                    </TableCell>
                    <TableCell className={classes.numericCell}>
                      Institutions
                    </TableCell>
                    <TableCell className={classes.numericCell}>
                      Disposal
                    </TableCell>
                    <TableCell className={classes.numericCell}>
                      Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell
                        className={classes.categoryCell}
                        component="th"
                        scope="row"
                      >
                        {row.category}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.pending}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.tIn}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.tOut}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.restoredRemanded}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.institutions}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.disposal}
                      </TableCell>
                      <TableCell className={classes.numericCell}>
                        {row.balance}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>

      <div className={classes.centeredDiv} style={{ flexGrow: 1, marginTop: 15 }}>
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
