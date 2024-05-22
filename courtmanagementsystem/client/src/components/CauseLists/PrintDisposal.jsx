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
import { Button, Grid } from "@material-ui/core";

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
      maxWidth: "14in",
      // minHeight: '14in', //causes issue
      maxHeight: "8.5in",
      // margin: "0 auto",
      // minWidth: 650,
      // width: "100%",
      // border: "1px solid black",
      alignContent: "center",
      // border: "1px solid black",
      // margin: "20px 20px 20px 20px",
      // borderRadius: "30px",
    },
    tableHeaderCell: {
      overflow: "hidden",
      // textOverflow: "ellipsis",
      // whiteSpace: "nowrap"
      // fontFamily: "Jameel Noori Nastaleeq",
      border: "1px solid",
      borderColor: theme.palette.primary.black,
      fontWeight: "bold",
      fontSize: 8,
      lineHeight: 1.2,
      // minWidth: "100px",
      // align: "center",
      textAlign: "center",
      margin: 0, // Set margin to 0
      padding: 0,
      backgroundColor: "lightgray",
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

const PrintDisposal = (props) => {
  // const nextDate = props.location.nextDate;
  // const orderDate = props.location.state.orderDate;
  const orderDate = new Date();
  const dateDisposal = props.location.state.dateDisposal;

  // console.log(orderDate);
  // const [dateCauseList] = useState(
  //   props.location.state.dateCauseList
  // );
  const [dateCauseList] = useState(orderDate);

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.causeLists);
  const disposalCases = useSelector((state) => state.disposalCases);
  const controlPanel = useSelector((state) => state.controlCenter);
  console.log(disposalCases);
  let index = 0;
  const [serialNo, setSerialNo] = useState([]);
  useEffect(() => {
    for (let i = 1; i <= disposalCases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    // console.log(pendingCases);
  }, [disposalCases, dateDisposal, dispatch]);

  const classes = useStyles();
  const tableRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

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

  return !disposalCases.length ? (
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
                    className={classes.tableHeaderCell}
                    align="center"
                    colSpan={11}
                    style={{
                      fontSize: 12,
                      fontFamily: "Times Roman",
                      // fontStyle: "",
                      fontWeight: "bold",
                      // padding: "10px",
                      margin: 0, // Set margin to 0
                      padding: 0,
                    }}
                  >
                    {controlPanel[0]?.causeListEnglishName}
                    <br />
                    {/* بعدالت جناب زیب النساءعباسی سِول جج /جج فیملی کورٹ/علاقہ
                    قاضی-V دیر پائین بمقام تیمرگرہ */}
                    {"DISPOSAL LIST FOR THE MONTH OF " +
                      format?.(dateDisposal, "MMMM, yyyy").toUpperCase()}
                  </TableCell>
                </TableRow>

                {/* <TableHead> */}
                <TableRow>
                  {/* <TableCell className={classes.tableEmptyCell}></TableCell> */}
                  <TableCell className={classes.tableHeaderCell}>
                    S.No
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Case No
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Case Title
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
                    Date of Disposal <br /> Transfer Out
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Disposal OR <br /> Transfer Out Flag
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Disposal Mode Flag
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* <TableRow>
                  <TableCell
                    align="center"
                    colSpan={9}
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontStyle: "",
                      fontWeight: "bold",
                    }}
                    className={classes.tableHeaderCell}
                  >
                    حاضری
                  </TableCell>
                </TableRow> */}

                {disposalCases.length &&
                  disposalCases.map((caseFile) => (
                    <>
                      {caseFile.causeListEntries &&
                      getSecondToLastElementCategory(caseFile.causeListEntries)
                        .actionAbstract ? (
                        <TableRow hover key={caseFile._id}>
                          {/* <TableCell className={classes.tableEmptyCell}>
                          {""}
                        </TableCell> */}

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
                                    "dd-MMM-yyy"
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
                                            parseISO(
                                              caseFile["Date of Transfer In"]
                                            ),
                                            "dd-MMM-yyyy"
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
                                              caseFile[
                                                "Date of Other Institution"
                                              ]
                                            ),
                                            "dd-MMM-yyyy"
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

                          <TableCell
                            className={classes.tableCell}
                            align="left"
                            // style={{ lineHeight: 1, fontSize: "14px" }}
                          >
                            {!caseFile[
                              "Date of Disposal Transfer Out"
                            ] ? null : (
                              <>
                                {parseISO(
                                  caseFile["Date of Disposal Transfer Out"]
                                ).getFullYear() > 1980 ? (
                                  <>
                                    <span style={{ fontSize: "" }}>
                                      {caseFile["Date of Disposal Transfer Out"]
                                        ? format?.(
                                            parseISO(
                                              caseFile[
                                                "Date of Disposal Transfer Out"
                                              ]
                                            ),
                                            "dd-MMM-yyyy"
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
                            {caseFile["Disposal OR Transfer Out Flag"]
                              ? caseFile["Disposal OR Transfer Out Flag"]
                              : ""}
                          </TableCell>

                          <TableCell className={classes.tableCell} align="left">
                            {caseFile["Disposal Mode Flag"]
                              ? caseFile["Disposal Mode Flag"]
                              : "Not specified"}
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </>
                  ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PrintDisposal;
