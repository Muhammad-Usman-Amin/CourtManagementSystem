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
import { Button, Grid, useTheme } from "@material-ui/core";

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
      // backgroundColor: "lightgray",
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
      textAlign: "center",
      border: "1px solid",
      borderColor: theme.palette.black,
      // borderColor: theme.palette.grey[300],
      // padding: theme.spacing(1),
      // fontFamily: "Alvi Nastaleeq Regular",
      // fontFamily: "Jameel Noori Nastaleeq",
      margin: 0, // Set margin to 0
      padding: 0,
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
  })
);

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

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
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
      <div className={classes.centeredDiv} style={{ flexGrow: 1 }}>
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
                      fontSize: 16,
                      // fontFamily: "Times Roman",
                      // fontStyle: "",
                      fontWeight: "bold",
                      // padding: "10px",
                      margin: 0, // Set margin to 0
                      padding: 0,
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
                      fontSize: 16,
                      // fontFamily: "Times Roman",
                      // fontStyle: "",
                      fontWeight: "bold",
                      // padding: "10px",
                      margin: 0, // Set margin to 0
                      padding: 0,
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
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // padding: "10px",
                      }}
                    >
                      <span>Court Name: {controlPanel[0].courtNumber}</span>
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
                    colSpan={1}
                    align="center"
                    style={{ maxWidth: 1 }}
                    // className={classes.tableHeaderCell}
                  ></TableCell>
                  <TableCell
                    colSpan={2}
                    align="center"
                    // className={classes.tableHeaderCell}
                  ></TableCell>
                  <TableCell
                    align="center"
                    colSpan={6}
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 10 }}
                  >
                    Old Cases
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={7}
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 10 }}
                  >
                    New Cases
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    align="left"
                    colSpan={1}
                    style={{ maxWidth: 1 }}
                    // className={classes.tableHeaderCell}
                  >
                    Sr#
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    // className={classes.tableHeaderCell}
                  >
                    Criminal Cases
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 10 }}
                  >
                    Filed upto 31-12-2017
                  </TableCell>
                  <TableCell
                    colSpan={7}
                    align="center"
                    className={classes.tableHeaderCell}
                    style={{ fontSize: 10 }}
                  >
                    Filed from 01-01-2018
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={1}
                    style={{ maxWidth: 1 }}
                    // className={classes.tableHeaderCell}
                  ></TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    // className={classes.tableHeaderCell}
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
                    Restored/Remanded
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
                    Restored/Remanded
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
                    colSpan={1}
                    align="center"
                    style={{ maxWidth: 1 }}
                    // className={classes.tableHeaderCell}
                  >
                    1
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    align="left"
                    className={classes.tableHeaderCell}
                  >
                    Time Fixed Bail Applications <br></br> (a) Magistrate (3 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    align="left"
                    className={classes.tableHeaderCell}
                    style={{ maxWidth: 1 }}
                  ></TableCell>
                  <TableCell
                    colSpan={2}
                    align="center"
                    className={classes.tableHeaderCell}
                  >
                    (b) Session Court (5 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    className={classes.tableHeaderCell}
                    align="left"
                    style={{ maxWidth: 1 }}
                  >
                    2
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    // align="center"
                    className={classes.tableHeaderCell}
                  >
                    Cancellation of bail (15 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    className={classes.tableHeaderCell}
                    align="left"
                    style={{ maxWidth: 1 }}
                  >
                    3
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    // align="center"
                    className={classes.tableHeaderCell}
                  >
                    Imprisonment upto 7 years (6 Months)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    className={classes.tableHeaderCell}
                    align="left"
                    style={{ maxWidth: 1 }}
                  >
                    4
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    // align="center"
                    className={classes.tableHeaderCell}
                  >
                    Imprisonment above 7 years <br></br>including death sentence 
(1 Year)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    className={classes.tableHeaderCell}
                    align="left"
                    style={{ maxWidth: 1 }}
                  >
                    5
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    // align="center"
                    className={classes.tableHeaderCell}
                  >
                    Preventive detention cases ( As early as possible) 
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    className={classes.tableHeaderCell}
                    align="left"
                    style={{ maxWidth: 1 }}
                  >
                    6
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    // align="center"
                    className={classes.tableHeaderCell}
                  >
                    Transfer Applications u/s 526, 528 CrPC  (7 Days)
                  </TableCell>
                  {rowData()}
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={1}
                    className={classes.tableHeaderCell}
                    align="left"
                    style={{ maxWidth: 1 }}
                  >
                    7
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    // align="center"
                    className={classes.tableHeaderCell}
                  >
                    Misc. Application i.e. superdari, disposal <br></br> of property etc (7 Days)
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

// <TableBody>
// {institutionCases.map((caseFile) => (
//   <>
//     {caseFile.causeListEntries &&
//     getSecondToLastElementCategory(caseFile.causeListEntries)
//       .actionAbstract ? (
//       <TableRow hover key={caseFile._id}>

//         <TableCell
//           className={classes.tableCell}
//           component="th"
//           scope="row"
//           style={{ maxWidth: 1 }}
//         >
//           {serialNo[index++]}
//         </TableCell>
//         <TableCell
//           className={classes.tableCell}
//           component="th"
//           scope="row"
//         >
//           {caseFile["Case No"]}
//         </TableCell>

//         <TableCell
//           className={classes.tableCell}
//           // className={[classes.tableCell, classes.tableCaseTitle]}
//           align="left"
//           // style={{ fontSize: 24 }}
//         >
//           {caseFile["Case Title"]}
//         </TableCell>
//         <TableCell
//           className={classes.tableCell}
//           // className={[classes.tableCell, classes.tableCaseTitle]}
//           align="left"
//           // style={{
//           //   fontSize: "16px",
//           //   direction: "ltr",
//           //   lineHeight: 0.6,
//           // }}
//         >
//           {caseFile["Category Per PQS"]}
//         </TableCell>

//         <TableCell
//           className={classes.tableCell}
//           align="left"
//           // style={{ lineHeight: 1, fontSize: "14px" }}
//         >
//           {!caseFile["Date of Institution "] ? (
//             "null"
//           ) : (
//             <>
//               <span style={{ fontSize: "" }}>
//                 {format?.(
//                   parseISO(caseFile["Date of Institution "]),
//                   "dd-MM-yyy"
//                 )}
//               </span>
//               <br />
//             </>
//           )}
//         </TableCell>

//         <TableCell
//           className={classes.tableCell}
//           align="left"
//           // style={{ lineHeight: 1, fontSize: "14px" }}
//         >
//           {!caseFile["Date of Transfer In"] ? null : (
//             <>
//               {parseISO(
//                 caseFile["Date of Transfer In"]
//               ).getFullYear() > 1980 ? (
//                 <>
//                   <span style={{ fontSize: "" }}>
//                     {caseFile["Date of Transfer In"]
//                       ? format?.(
//                           parseISO(
//                             caseFile["Date of Transfer In"]
//                           ),
//                           "dd-MM-yyyy"
//                         )
//                       : null}
//                   </span>
//                   <br />
//                 </>
//               ) : null}
//             </>
//           )}
//         </TableCell>

//         <TableCell
//           className={classes.tableCell}
//           align="left"
//           // style={{ lineHeight: 1, fontSize: "14px" }}
//         >
//           {!caseFile["Date of Other Institution"] ? null : (
//             <>
//               {parseISO(
//                 caseFile["Date of Other Institution"]
//               ).getFullYear() > 1980 ? (
//                 <>
//                   <span style={{ fontSize: "" }}>
//                     {caseFile["Date of Other Institution"]
//                       ? format?.(
//                           parseISO(
//                             caseFile[
//                               "Date of Other Institution"
//                             ]
//                           ),
//                           "dd-MM-yyyy"
//                         )
//                       : null}
//                   </span>
//                   <br />
//                 </>
//               ) : null}
//             </>
//           )}
//         </TableCell>

//         <TableCell className={classes.tableCell} align="left">
//           {caseFile["Institution Flag"]
//             ? caseFile["Institution Flag"]
//             : ""}
//         </TableCell>

//         <TableCell className={classes.tableCell} align="left">
//           {getActionEng(
//             caseFile.actionAbstract?.replace(
//               /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
//               ""
//             )
//           )}
//         </TableCell>
//       </TableRow>
//     ) : null}
//   </>
// ))}
// </TableBody>

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
// } from '@material-ui/core';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   header: {
//     fontWeight: 'bold',
//   },
// });

// const PrintFortnitely = () => {
//   const classes = useStyles();

//   const data = [
//     // Data array as extracted from the text
//     {
//       category: 'Criminal Cases',
//       cases: [
//         { name: 'Time Fixed Bail Applications (a) Magistrate (3 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Time Fixed Bail Applications (b) Session Court (5 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Cancellation of bail (15 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Imprisonment upto 7 years (6 Months)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Imprisonment above 7 years including death sentence (1 Year)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Preventive detention cases (As early as possible)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Transfer Applications u/s 526, 528 CrPC (7 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Misc. Application i.e. superdari, disposal of property etc (7 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Prioritized Narcotics Cases', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Criminal Revisions', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Anti-terrorism Cases', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Women Cases', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Juvenile Cases', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Cases of Overseas Pakistanis (either complainant or accused)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Others', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//       ],
//     },
//     {
//       category: 'Civil Cases',
//       cases: [
//         { name: 'Time Fixed Stay applications (15 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Rent cases (4 Months)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Appeals in rent cases (2 Months)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Revision petitions (3 Months)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Family cases (3-6 Months)', old: [0, 0, 0, 0, 0, 42, 42], new: [1, 2, 8, 8, 43] },
//         { name: 'Appeals in family cases (30 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Appeals in insolvency cases (30 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Review applications (30 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Negotiable instrument cases u/o 37 CPC (90 Days)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Cases of the Overseas Pakistanis (6 Months)', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Prioritized Women Cases', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Juvenile Cases', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Small Claims and Minor Offences', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Trade, Commercial, Investment', old: [0, 0, 0, 0, 0, 0, 0], new: [0, 0, 0, 0, 0] },
//         { name: 'Civil Execution application', old: [0, 0, 0, 0, 0, 65, 65], new: [2, 2, 2, 2, 67] },
//         { name: 'Civil Suits', old: [0, 1, 0, 0, 0, 1, 1, 39], new: [5, 2, 42] },
//         { name: 'Others', old: [0, 0, 0, 0, 0, 27, 27], new: [1, 1, 5, 6, 26] },
//       ],
//     },
//   ];

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell className={classes.header}>Sr #</TableCell>
//             <TableCell className={classes.header}>Case Type</TableCell>
//             <TableCell className={classes.header}>Filed up to 31-12-2017 (Old Cases)</TableCell>
//             <TableCell className={classes.header}>Filed from 01-01-2018 (New Cases)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((category, catIndex) => (
//             <React.Fragment key={catIndex}>
//               <TableRow>
//                 <TableCell colSpan={4} className={classes.header}>
//                   {category.category}
//                 </TableCell>
//               </TableRow>
//               {category.cases.map((caseType, caseIndex) => (
//                 <TableRow key={caseIndex}>
//                   <TableCell>{caseIndex + 1}</TableCell>
//                   <TableCell>{caseType.name}</TableCell>
//                   <TableCell>
//                     {caseType.old.map((val, idx) => (
//                       <div key={idx}>{val}</div>
//                     ))}
//                   </TableCell>
//                   <TableCell>
//                     {caseType.new.map((val, idx) => (
//                       <div key={idx}>{val}</div>
//                     ))}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </React.Fragment>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default PrintFortnitely;
