import React, { useState, useEffect, useRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useReactToPrint } from "react-to-print";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { Button, Grid, LinearProgress } from "@material-ui/core";
import * as XLSX from "xlsx";
import { getActionEng as getActionEngFromCommon } from "./commonFun";

const useStyles = makeStyles((theme) =>
  createStyles({
    centeredDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "35px",
    },
    table: {
      borderCollapse: "collapse",
      maxWidth: "14in",
      maxHeight: "8.5in",
      alignContent: "center",
    },
    tableHeaderCell: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      border: "1px solid",
      borderColor: theme.palette.primary.black,
      fontWeight: "bold",
      fontSize: 8,
      lineHeight: 1.3,
      textAlign: "center",
      margin: 0,
      padding: 0,
      backgroundColor: "lightgray",
    },
    tableEmptyCell: {
      margin: 0,
      padding: 0,
      border: "1px solid",
      borderColor: theme.palette.primary.black,
    },
    tableCell: {
      whiteSpace: "nowrap",
      fontSize: 12,
      textAlign: "center",
      border: "1px solid",
      borderColor: theme.palette.black,
      margin: 0,
      padding: 0,
    },
  })
);

const PrintPendency = (props) => {
  const orderDate = new Date();
  const datePendency = props.location.state.datePendency;
  const backlog = props.location.state.backlog;
  const pendingCases = useSelector((state) => state.pendingCases);
  const controlPanel = useSelector((state) => state.controlCenter);

  let index = 0;
  const [serialNo, setSerialNo] = useState([]);
  useEffect(() => {
    for (let i = 1; i <= pendingCases.length; i++) {
      setSerialNo((prevArray) => [...prevArray, i]);
    }
  }, [pendingCases]);

  const classes = useStyles();
  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    XLSX.utils.book_append_sheet(wb, ws, "Pending Cases");
    XLSX.writeFile(wb, "PendingCases.xlsx");
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

  // function getActionEng(action) {
  //   const str = action.replace(/(^\s+|\s+$)/g, "");
  //   switch (str) {
  //     case "حاضری":
  //     case "وکالت نامہ":
  //     case "حاضری، ریکارڈ":
  //     case "حاضری، اشتہار":
  //     case "مختارنامہ":
  //       return "Attendance";
  //     case "جواب دعویٰ":
  //       return "Written Statement";
  //     case "ترمیمی جواب دعویٰ":
  //       return "Amended Wrtitten Statement";
  //     case "ترمیمی عرضیدعویٰ":
  //       return "Amended Plaint";
  //     case "جواب و بحث":
  //     case "جواب درخواست":
  //       return "Replication";
  //     case "فرد تعلیقہ":
  //       return "Attachment Order";
  //     case "پروفارمہ ای":
  //       return "Proformas";
  //     case "تنقیحات":
  //       return "Framing of Issues";
  //     case "جرح بر گواہ":
  //     case "شہادت":
  //     case "شہادت مسئول الیہ":
  //     case "طلبیدہ گواہان":
  //     case "شہادت استغاثہ":
  //       return "Evidence";
  //     case "شہادت سائیل":
  //       return "Petitioner Evidence";
  //     case "یکطرفہ شہادت":
  //       return "Ex-parte Evidence";
  //     case "شہادت مدعی":
  //       return "Plaintiff Evidence";
  //     case "شہادت مدعیہ":
  //       return "Plaintiff Evidence";
  //     case "شہادت مدعاعلیہم":
  //       return "Defendants Evidence";
  //     case "شہادت مدعیان":
  //       return "Plaintiffs Evidence";
  //     case "بیلف رپورٹ":
  //     case "حاضری، بیلف رپورٹ":
  //       return "Bailiff's Report";
  //     case "نادرا رپورٹ":
  //       return "NADRA's Report";
  //     case "شہادت مدعا علیہ":
  //       return "Defendant Evidence";
  //     case "راضی نامہ":
  //       return "Compromise";
  //     case "مصالحت ابتدائی":
  //       return "Pre-Reconciliation";
  //     case "مصالحت ثانی":
  //       return "Post-Reconciliation";
  //     case "بقایا بحث":
  //       return "Remaining Arguments";
  //     case "بحث، ریکارڈ":
  //       return "Arguments on Application";
  //     case "بحث":
  //       return "Arguments";
  //     case "بحث بر مقدمہ":
  //       return "Final Arguments";
  //     case "یکطرفہ بحث":
  //       return "ex-parte Arguments";
  //     case "بحث بر درخواست":
  //       return "Arguments on Application";
  //     case "حکم بر درخواست":
  //       return "Order on Application";
  //     case "حکم":
  //       return "Order";
  //     case "حکم بر مقدمہ":
  //       return "Final Order";
  //     case "مزید کاروائی":
  //       return "Others";
  //     case "انتظار مسل":
  //       return "Others";
  //     case "ہمراہ":
  //       return "Attached";
  //     case "بقایا آدائیگی":
  //       return "Remaining Payment";
  //     default:
  //       return str;
  //   }
  // }

  let filteredCases = pendingCases;
  if (backlog === "true") {
    filteredCases = pendingCases.filter(
      (caseData) =>
        // new Date(caseData["Date of Institution "]) <= new Date("2020-12-31")
        new Date(caseData["Date of Institution "]) <= new Date(controlPanel[0]?.backlogDate)
    );
    // console.log(controlPanel[0]?.backlogDate);
  }

  return !pendingCases.length && !controlPanel.length ? (
    <LinearProgress />
  ) : (
    <div className={classes.centeredDiv} style={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignContent="center" justify="center">
        <Grid item container justify="center" xs={12}>
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export to Excel
          </Button>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Table
            ref={tableRef}
            size="small"
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.tableHeaderCell}
                  align="center"
                  colSpan={10}
                  style={{
                    fontSize: 12,
                    fontFamily: "Times Roman",
                    fontWeight: "bold",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {controlPanel[0]?.causeListEnglishName}
                  <br />
                  {backlog === "true"
                    ? "BACKLOG CASES LIST FOR THE MONTH OF " +
                      format(datePendency, "MMMM, yyyy").toUpperCase()
                    : "CHRONOLOGICAL LIST FOR THE MONTH OF " +
                      format(datePendency, "MMMM, yyyy").toUpperCase()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.tableHeaderCell}
                  style={{ minWidth: 25 }}
                >
                  S.No
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Case No
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Case Title
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Nature
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Category Per PQS
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Date of Institution
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Date of Transfer In
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Date of Other Institution
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Institution Flag
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Current Pendency Stage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCases.map((caseFile) =>
                caseFile.causeListEntries &&
                getSecondToLastElementCategory(caseFile.causeListEntries)
                  ?.actionAbstract ? (
                  <TableRow hover key={caseFile._id}>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                      style={{ maxWidth: 1 }}
                    >
                      {/* {data.indexOf(caseFile) + 1} */}
                      {serialNo[index++]}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      {caseFile["Case No"]}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      // className={[classes.tableCell, classes.tableCaseTitle]}
                      align="left"
                      // style={{ fontSize: 24 }}
                    >
                      {caseFile["Case Title"]}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      // className={[classes.tableCell, classes.tableCaseTitle]}
                      align="left"
                      // style={{ fontSize: 24 }}
                    >
                      {caseFile.nature}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      // className={[classes.tableCell, classes.tableCaseTitle]}
                      align="left"
                      // style={{
                      //   fontSize: "16px",
                      //   direction: "ltr",
                      //   lineHeight: 0.6,
                      // }}
                    >
                      {caseFile["Category Per PQS"]}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      align="left"
                      // style={{ lineHeight: 1, fontSize: "14px" }}
                    >
                      {!caseFile["Date of Institution "] ? (
                        "null"
                      ) : (
                        <>
                          <span style={{ fontSize: "" }}>
                            {format?.(
                              parseISO(caseFile["Date of Institution "]),
                              "dd-MM-yyy"
                            )}
                          </span>
                          <br />
                        </>
                      )}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      align="left"
                      // style={{ lineHeight: 1, fontSize: "14px" }}
                    >
                      {!caseFile["Date of Transfer In"] ? null : (
                        <>
                          {parseISO(
                            caseFile["Date of Transfer In"]
                          ).getFullYear() > 1980 ? (
                            <>
                              <span style={{ fontSize: "" }}>
                                {caseFile["Date of Transfer In"]
                                  ? format?.(
                                      parseISO(caseFile["Date of Transfer In"]),
                                      "dd-MM-yyyy"
                                    )
                                  : null}
                              </span>
                              <br />
                            </>
                          ) : null}
                        </>
                      )}
                    </TableCell>

                    <TableCell
                      className={classes.tableCell}
                      align="left"
                      // style={{ lineHeight: 1, fontSize: "14px" }}
                    >
                      {!caseFile["Date of Other Institution"] ? null : (
                        <>
                          {parseISO(
                            caseFile["Date of Other Institution"]
                          ).getFullYear() > 1980 ? (
                            <>
                              <span style={{ fontSize: "" }}>
                                {caseFile["Date of Other Institution"]
                                  ? format?.(
                                      parseISO(
                                        caseFile["Date of Other Institution"]
                                      ),
                                      "dd-MM-yyyy"
                                    )
                                  : null}
                              </span>
                              <br />
                            </>
                          ) : null}
                        </>
                      )}
                    </TableCell>

                    <TableCell className={classes.tableCell} align="left">
                      {caseFile["Institution Flag"]
                        ? caseFile["Institution Flag"]
                        : ""}
                    </TableCell>

                    <TableCell className={classes.tableCell} align="left">
                      {/* {caseFile.causeListEntries &&
                            getSecondToLastElement(
                              caseFile.causeListEntries
                            ).actionAbstract.replace("، حاضری", "")} */}
                      {getActionEngFromCommon(
                        caseFile.actionAbstract?.replace(
                          /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
                          ""
                        )
                      )}
                      {/* {getActionEng(
                            caseFile.actionAbstract?.replace(
                              /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
                              ""
                            )
                          )} */}
                    </TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
};

export default PrintPendency;

// import React, { useState, useEffect } from "react";
// // import { ThemeProvider } from '@material-ui/core/styles';

// import { makeStyles, createStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import { useReactToPrint } from "react-to-print";
// import { format, parseISO } from "date-fns";
// import { useSelector } from "react-redux";
// import { Button, Grid } from "@material-ui/core";

// import { useDispatch } from "react-redux";
// // import { getCauseList } from "../../actions/causeLists";
// import { LinearProgress } from "@material-ui/core";
// import { lightTheme } from "../../theme";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     centeredDiv: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       // width: 100%,
//       // height: 100vh,
//       // border: "1px solid black",
//       // borderRadius: "10px",
//       // overflow: "hidden",
//     },
//     table: {
//       // margin: theme.spacing(1),
//       borderCollapse: "collapse",
//       maxWidth: "14in",
//       // minHeight: '14in', //causes issue
//       maxHeight: "8.5in",
//       // margin: "0 auto",
//       // minWidth: 650,
//       // width: "100%",
//       // border: "1px solid black",
//       alignContent: "center",
//       // border: "1px solid black",
//       // margin: "20px 20px 20px 20px",
//       // borderRadius: "30px",
//     },
//     tableHeaderCell: {
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//       // fontFamily: "Jameel Noori Nastaleeq",
//       border: "1px solid",
//       borderColor: theme.palette.primary.black,
//       fontWeight: "bold",
//       fontSize: 8,
//       lineHeight: 1.3,
//       // minWidth: "100px",
//       // align: "center",
//       textAlign: "center",
//       margin: 0, // Set margin to 0
//       padding: 0,
//       backgroundColor: "lightgray",
//     },
//     tableEmptyCell: {
//       margin: 0,
//       padding: 0,
//       border: "1px solid",
//       borderColor: theme.palette.primary.black,
//       // fontWeight: "bold",
//       // fontSize: 11,
//       minWidth: "5px",
//       // align: "center",
//       // textAlign: "center",
//     },
//     tableCell: {
//       // overflow: "hidden",
//       // textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//       fontSize: 12,
//       // align: "center",
//       textAlign: "center",
//       border: "1px solid",
//       borderColor: theme.palette.black,
//       // borderColor: theme.palette.grey[300],
//       // padding: theme.spacing(1),
//       // fontFamily: "Alvi Nastaleeq Regular",
//       // fontFamily: "Jameel Noori Nastaleeq",
//       margin: 0, // Set margin to 0
//       padding: 0,
//     },
//     rightAlignedCell: {
//       textAlign: "right",
//     },
//     tableHeadTwo: {
//       fontSize: 18,
//       // fontFamily: "Alvi Nastaleeq Regular",
//       fontFamily: "Jameel Noori Nastaleeq",
//       // fontStyle: "",
//       fontWeight: "bold",
//       padding: "20px",
//     },
//     tableCaseTitle: {
//       fontSize: 14,
//       // fontFamily: "Alvi Nastaleeq Regular",
//       fontFamily: "Jameel Noori Nastaleeq",
//       // fontStyle: "",
//       fontWeight: "bold",
//       padding: "10px",
//     },
//   })
// );

// const PrintPendency = (props) => {
//   // const nextDate = props.location.nextDate;
//   // const orderDate = props.location.state.orderDate;
//   const orderDate = new Date();
//   const datePendency = props.location.state.datePendency;
//   const backlog = props.location.state.backlog;

//   // console.log(orderDate);
//   // const [dateCauseList] = useState(
//   //   props.location.state.dateCauseList
//   // );
//   // const [dateCauseList] = useState(orderDate);

//   const dispatch = useDispatch();
//   // const data = useSelector((state) => state.causeLists);
//   const pendingCases = useSelector((state) => state.pendingCases);
//   const controlPanel = useSelector((state) => state.controlCenter);

//   let index = 0;
//   const [serialNo, setSerialNo] = useState([]);
//   useEffect(() => {
//     // if (!pendingCases) dispatch(getCauseList({ dateCauseList: dateCauseList }));
//     for (let i = 1; i <= pendingCases.length; i++) {
//       // sno.push(i);
//       // setSerialNo((oldArray) => [...oldArray, i]);
//       setSerialNo((prevArray) => [...prevArray, i]);
//     }
//     // console.log(pendingCases);
//   }, [pendingCases, dispatch]);

//   const classes = useStyles();
//   const tableRef = React.useRef();

//   const handlePrint = useReactToPrint({
//     content: () => tableRef.current,
//     // pageStyle: `
//     //   @page {
//     //     size: auto;
//     //     margin: 0;
//     //   }
//     //   @top-right {
//     //     content: "Page " counter(page) " of " counter(pages);
//     //   }
//     // `,
//   });

//   function getSecondToLastElementCategory(array) {
//     if (array.length === 0) {
//       return null;
//     }
//     if (array.length > 1) {
//       if (
//         new Date(array[array.length - 1].orderDate).toDateString() ===
//         new Date(orderDate).toDateString()
//       ) {
//         // console.log(
//         //   new Date(array[array.length - 1].orderDate).toDateString() ===
//         //     new Date(orderDate).toDateString()
//         // );
//         return array[array.length - 2];
//       }
//     }
//     // console.log("-1 exec");
//     return array[array.length - 1]; // or any other appropriate value or action
//   }

//   function getActionEng(action) {
//     const str = action.replace(/(^\s+|\s+$)/g, "");
//     //The regular expression (^\s+|\s+$) matches one or more (+) whitespace characters (\s) at the beginning (^) or end ($) of the string.
//     //The g flag ensures that all occurrences of these patterns are replaced.
//     switch (str) {
//       case "حاضری":
//       case "حاضری، ریکارڈ":
//       case "حاضری، اشتہار":
//       case "مختارنامہ":
//         return "Attendance";
//       // break;
//       case "جواب دعویٰ":
//         return "Written Statement";
//       // case ' ترمیمی جواب دعویٰ':
//       //   return 'Amended Written Statement';
//       // case 'ترمیمی جواب دعویٰ ':
//       //   return 'Amended Written Statement';
//       // case ' ترمیمی عرضیدعویٰ':
//       //   return 'Amended Plaint';
//       case "ترمیمی جواب دعویٰ":
//         return "Amended Wrtitten Statement";
//       case "ترمیمی عرضیدعویٰ":
//         return "Amended Plaint";
//       case "جواب و بحث":
//       case "جواب درخواست":
//         return "Replication";
//       case 'پروفارمہ ای':
//         return 'Proformas';
//       case "تنقیحات":
//         return "Framing of Issues";
//       case "شہادت":
//       case 'شہادت استغاثہ':
//         return "Evidence";
//       case "شہادت سائیل":
//         return "Petitioner Evidence";
//       case "یکطرفہ شہادت":
//         return "Ex-parte Evidence";
//       case "شہادت مدعی":
//         return "Plaintiff Evidence";
//       case "شہادت مدعیہ":
//         return "Plaintiff Evidence";
//       case "شہادت مدعا علیہم":
//         return "Defendants Evidence";
//       case "شہادت مدعیان":
//         return "Plaintiffs Evidence";
//       case "بیلف رپورٹ":
//       case "حاضری، بیلف رپورٹ":
//         return "Bailiff's Report";
//       case "نادرا رپورٹ":
//         return "NADRA's Report";
//       case "شہادت مدعا علیہ":
//         return "Defendant Evidence";
//       case "راضی نامہ":
//         return "Compromise";
//       case "مصالحت ابتدائی":
//         return "Pre-Reconciliation";
//       case "مصالحت ثانی":
//         return "Post-Reconciliation";
//       case "بقایا بحث":
//         return "Remaining Arguments";
//       case "بحث، ریکارڈ":
//         return "Arguments on Application";
//       case "بحث بر مقدمہ":
//         return "Arguments";
//       case "یکطرفہ بحث":
//         return "ex-parte Arguments";
//       case "بحث بر درخواست":
//         return "Arguments on Application";
//       case "حکم بر درخواست":
//         return "Order on Application";
//       case "حکم":
//         return "Order";
//       case "حکم بر مقدمہ":
//         return "Order";
//       case "مزید کاروائی":
//         return "Others";
//       case "انتظار مسل":
//         return "Others";
//       case "ہمراہ":
//         return "Attached";
//       case "بقایا آدائیگی":
//         return "Remaining Payment";
//       default:
//         return str;
//     }
//   }
//   // console.log(getActionEng("حاضری"));
//   let filteredCases = pendingCases;
// if(backlog === 'true'){
//   filteredCases = pendingCases.filter(
//     (caseData) => new Date(caseData["Date of Institution "]) <= new Date('2020-08-31')
//   );
// }

//   return !pendingCases.length && !controlPanel.length ? (
//     <LinearProgress />
//   ) : (
//     <>
//     {/* <ThemeProvider theme={lightTheme}> */}
//       <div className={classes.centeredDiv} style={{ flexGrow: 1 }}>
//         {/* <div> */}
//         <Grid container spacing={2} alignContent="center" justify="center">
//           <Grid item container justify="center" xs={12}>
//             <Button
//               // fullWidth
//               variant="contained"
//               color="secondary"
//               onClick={handlePrint}
//             >
//               Print
//             </Button>
//           </Grid>
//           <Grid item xs={12} container justify="center">
//             <Table
//               ref={tableRef}
//               size="small"
//               className={classes.table}
//               aria-label="simple table"
//               // dir="rtl"
//             >
//               <TableHead>
//                 <TableRow>
//                 {backlog === 'true' ?
//                   <TableCell
//                     className={classes.tableHeaderCell}
//                     align="center"
//                     colSpan={9}
//                     style={{
//                       fontSize: 12,
//                       fontFamily: "Times Roman",
//                       // fontStyle: "",
//                       fontWeight: "bold",
//                       // padding: "10px",
//                       margin: 0, // Set margin to 0
//                       padding: 0,
//                     }}
//                   >
//                     {controlPanel[0]?.causeListEnglishName}
//                     <br />
//                     {/* بعدالت جناب زیب النساءعباسی سِول جج /جج فیملی کورٹ/علاقہ
//                     قاضی-V دیر پائین بمقام تیمرگرہ */}
//                     {"BACKLOG CASES LIST FOR THE MONTH OF " +
//                       format?.(datePendency, "MMMM, yyyy").toUpperCase()}
//                   </TableCell>
//                 :
//                   <TableCell
//                     className={classes.tableHeaderCell}
//                     align="center"
//                     colSpan={9}
//                     style={{
//                       fontSize: 12,
//                       fontFamily: "Times Roman",
//                       // fontStyle: "",
//                       fontWeight: "bold",
//                       // padding: "10px",
//                       margin: 0, // Set margin to 0
//                       padding: 0,
//                     }}
//                   >
//                     {controlPanel[0].causeListEnglishName}
//                     <br />
//                     {/* بعدالت جناب زیب النساءعباسی سِول جج /جج فیملی کورٹ/علاقہ
//                     قاضی-V دیر پائین بمقام تیمرگرہ */}
//                     {"CHRONOLOGICAL LIST FOR THE MONTH OF " +
//                       format?.(datePendency, "MMMM, yyyy").toUpperCase()}
//                   </TableCell>
//                 }
//                 </TableRow>

//                 {/* <TableHead> */}
//                 <TableRow>
//                   {/* <TableCell className={classes.tableEmptyCell}></TableCell> */}
//                   <TableCell className={classes.tableHeaderCell} style={{ minWidth: 25}}>
//                     S.No
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell}>
//                     Case No
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Case Title
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Category Per PQS
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Date of Institution
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Date of Transfer In
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Date of Other Institution
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Institution Flag
//                   </TableCell>
//                   <TableCell className={classes.tableHeaderCell} align="left">
//                     Current Pendency Stage
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {/* <TableRow>
//                   <TableCell
//                     align="center"
//                     colSpan={9}
//                     style={{
//                       fontSize: 20,
//                       // fontFamily: "Alvi Nastaleeq Regular",
//                       fontStyle: "",
//                       fontWeight: "bold",
//                     }}
//                     className={classes.tableHeaderCell}
//                   >
//                     حاضری
//                   </TableCell>
//                 </TableRow> */}

//                 {filteredCases.map((caseFile) => (
//                   <>
//                     {caseFile.causeListEntries &&
//                     getSecondToLastElementCategory(caseFile.causeListEntries)
//                       .actionAbstract ? (
//                       <TableRow hover key={caseFile._id}>
//                         {/* <TableCell className={classes.tableEmptyCell}>
//                           {""}
//                         </TableCell> */}

//                         <TableCell
//                           className={classes.tableCell}
//                           component="th"
//                           scope="row"
//                           style={{ maxWidth: 1 }}
//                         >
//                           {/* {data.indexOf(caseFile) + 1} */}
//                           {serialNo[index++]}
//                         </TableCell>
//                         <TableCell
//                           className={classes.tableCell}
//                           component="th"
//                           scope="row"
//                         >
//                           {caseFile["Case No"]}
//                         </TableCell>

//                         <TableCell
//                           className={classes.tableCell}
//                           // className={[classes.tableCell, classes.tableCaseTitle]}
//                           align="left"
//                           // style={{ fontSize: 24 }}
//                         >
//                           {caseFile["Case Title"]}
//                         </TableCell>
//                         <TableCell
//                           className={classes.tableCell}
//                           // className={[classes.tableCell, classes.tableCaseTitle]}
//                           align="left"
//                           // style={{
//                           //   fontSize: "16px",
//                           //   direction: "ltr",
//                           //   lineHeight: 0.6,
//                           // }}
//                         >
//                           {caseFile["Category Per PQS"]}
//                         </TableCell>

//                         <TableCell
//                           className={classes.tableCell}
//                           align="left"
//                           // style={{ lineHeight: 1, fontSize: "14px" }}
//                         >
//                           {!caseFile["Date of Institution "] ? (
//                             "null"
//                           ) : (
//                             <>
//                               <span style={{ fontSize: "" }}>
//                                 {format?.(
//                                   parseISO(caseFile["Date of Institution "]),
//                                   "dd-MM-yyy"
//                                 )}
//                               </span>
//                               <br />
//                             </>
//                           )}
//                         </TableCell>

//                         <TableCell
//                           className={classes.tableCell}
//                           align="left"
//                           // style={{ lineHeight: 1, fontSize: "14px" }}
//                         >
//                           {!caseFile["Date of Transfer In"] ? null : (
//                             <>
//                               {parseISO(
//                                 caseFile["Date of Transfer In"]
//                               ).getFullYear() > 1980 ? (
//                                 <>
//                                   <span style={{ fontSize: "" }}>
//                                     {caseFile["Date of Transfer In"]
//                                       ? format?.(
//                                           parseISO(
//                                             caseFile["Date of Transfer In"]
//                                           ),
//                                           "dd-MM-yyyy"
//                                         )
//                                       : null}
//                                   </span>
//                                   <br />
//                                 </>
//                               ) : null}
//                             </>
//                           )}
//                         </TableCell>

//                         <TableCell
//                           className={classes.tableCell}
//                           align="left"
//                           // style={{ lineHeight: 1, fontSize: "14px" }}
//                         >
//                           {!caseFile["Date of Other Institution"] ? null : (
//                             <>
//                               {parseISO(
//                                 caseFile["Date of Other Institution"]
//                               ).getFullYear() > 1980 ? (
//                                 <>
//                                   <span style={{ fontSize: "" }}>
//                                     {caseFile["Date of Other Institution"]
//                                       ? format?.(
//                                           parseISO(
//                                             caseFile[
//                                               "Date of Other Institution"
//                                             ]
//                                           ),
//                                           "dd-MM-yyyy"
//                                         )
//                                       : null}
//                                   </span>
//                                   <br />
//                                 </>
//                               ) : null}
//                             </>
//                           )}
//                         </TableCell>

//                         <TableCell className={classes.tableCell} align="left">
//                           {caseFile["Institution Flag"]
//                             ? caseFile["Institution Flag"]
//                             : ""}
//                         </TableCell>

//                         <TableCell className={classes.tableCell} align="left">
//                           {/* {caseFile.causeListEntries &&
//                             getSecondToLastElement(
//                               caseFile.causeListEntries
//                             ).actionAbstract.replace("، حاضری", "")} */}
//                           {getActionEng(
//                             caseFile.actionAbstract?.replace(
//                               /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
//                               ""
//                             )
//                           )}
//                         </TableCell>
//                         {/* <TableCell className={classes.tableCell} align="left">
//                           {caseFile.causeListEntries &&
//                             format(
//                               parseISO(
//                                 getSecondToLastElement(
//                                   caseFile.causeListEntries
//                                 ).orderDate
//                               ),
//                               "dd-MM-yyy"
//                             )}
//                         </TableCell> */}
//                       </TableRow>
//                     ) : null}
//                   </>
//                 ))}
//               </TableBody>
//             </Table>
//           </Grid>
//         </Grid>
//       </div>
//     {/* </ThemeProvider> */}
//     </>
//   );
// };

// export default PrintPendency;
