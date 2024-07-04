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
import { useParams } from "react-router-dom";
import { getActionEng as getActionEngFromCommon } from "./commonFun";

const useStyles = makeStyles((theme) =>
  createStyles({
    centeredDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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

const PrintGroupedCases = (props) => {
  const orderDate = new Date();
  const datePendency = new Date();
  // const datePendency = props.location.state.datePendency;
  // const backlog = props.location.state.backlog;
  const { name } = useParams();
  // const pendingCases = useSelector((state) => state.pendingCases);
  const controlPanel = useSelector((state) => state.controlCenter);
  const groupedCases = useSelector((state) => state.groupedCases);

  let index = 0;
  const [serialNo, setSerialNo] = useState([]);
  // console.log(name)

  // const pendingCasesFromRedux = useSelector(selectCustodyOfMinors);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    // if (pendingCasesFromRedux) {
    //   setSelectedCategory(pendingCasesFromRedux);
    // }
    if (groupedCases) {
      setSelectedCategory(groupedCases[name] || []);
    }
  }, [groupedCases]);

  useEffect(() => {
    for (let i = 1; i <= selectedCategory.length; i++) {
      setSerialNo((prevArray) => [...prevArray, i]);
    }
  }, [selectedCategory]);

  const classes = useStyles();
  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    XLSX.utils.book_append_sheet(wb, ws, "Pending Cases");
    XLSX.writeFile(wb, `Chronological_List_of_${name}.xlsx`);
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
  //   const str = action?.replace(/(^\s+|\s+$)/g, "");
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
  //     case "پروفارمہ ای":
  //       return "Proformas";
  //     case "تنقیحات":
  //       return "Framing of Issues";
  //     case "جرح بر گواہ":
  //     case "شہادت":
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

  // let filteredCases = pendingCases;
  // if (backlog === "true") {
  //   filteredCases = pendingCases.filter(
  //     (caseData) =>
  //       new Date(caseData["Date of Institution "]) <= new Date("2020-08-31")
  //   );
  // }

  return !selectedCategory.length && !controlPanel.length ? (
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
                  {"CHRONOLOGICAL LIST OF " +
                    name.toUpperCase() +
                    " FOR THE MONTH OF " +
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
                  Next Date
                </TableCell>
                <TableCell className={classes.tableHeaderCell} align="left">
                  Current Pendency Stage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCategory.map((caseFile) =>
                caseFile["Case Title"] ? (
                // caseFile.causeListEntries &&
                // getSecondToLastElementCategory(caseFile.causeListEntries)
                //   ?.actionAbstract ? (
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

                    <TableCell
                    className={classes.tableCell}
                      style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                      align="left"
                    >
                      {!caseFile.nextDate
                        ? ""
                        : format?.(parseISO(caseFile.nextDate), "dd-MMM-yyy")}
                    </TableCell>

                    <TableCell className={classes.tableCell} align="left">
                      {/* {caseFile.causeListEntries &&
                            getSecondToLastElement(
                              caseFile.causeListEntries
                            ).actionAbstract.replace("، حاضری", "")} */}
                      {getActionEngFromCommon(
                        caseFile?.actionAbstract?.replace(
                          /(، حاضری|، شہادت|، بحث|، حکم|، حاضری )/g,
                          ""
                        )
                      )}
                      {/* {getActionEng(
                        caseFile?.actionAbstract?.replace(
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

export default PrintGroupedCases;
