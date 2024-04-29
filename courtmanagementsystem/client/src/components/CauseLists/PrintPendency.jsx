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
      margin: theme.spacing(1),
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
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontFamily: "Jameel Noori Nastaleeq",
      border: "1px solid",
      borderColor: theme.palette.primary.black,
      fontWeight: "bold",
      fontSize: 14,
      // minWidth: "100px",
      // align: "center",
      textAlign: "center",
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
      padding: theme.spacing(1),
      // fontFamily: "Alvi Nastaleeq Regular",
      fontFamily: "Jameel Noori Nastaleeq",
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

const PrintPendency = (props) => {
  // const nextDate = props.location.nextDate;
  // const orderDate = props.location.state.orderDate;
  const orderDate = new Date();
  // const dateCauseList = props.location.state.dateCauseList;

  // console.log(orderDate);
  // const [dateCauseList] = useState(
  //   props.location.state.dateCauseList
  // );
  const [dateCauseList] = useState(
    orderDate
  );

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.causeLists);
  const pendingCases = useSelector((state) => state.pendingCases);
  const controlPanel = useSelector((state) => state.controlCenter);


  let index = 0;
  const [serialNo, setSerialNo] = useState([]);
  useEffect(() => {
    if (!pendingCases) dispatch(getCauseList({ dateCauseList: dateCauseList }));
    for (let i = 1; i <= pendingCases.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    // console.log(pendingCases);
  }, [pendingCases, dateCauseList, dispatch]);

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

  // const sortedCases = pendingCases.slice().sort((a, b) => {
  //   const sortingKeywords = [
  //     "حاضری",
  //     "حاضری، ریکارڈ",
  //     "مختارنامہ، حاضری",
  //     "تقرری وکیل، حاضری",
  //     "حاضری، وکالت نامہ، حاضری",
  //     "حاضری، جواب دعویٰ، حاضری",
  //     "جواب دعویٰ، حاضری",
  //   ]; // Add more keywords here as needed
  //   // Loop through sortingKeywords
  //   for (const keyword of sortingKeywords) {
  //     // const hasKeywordA = a.abstract?.toLowerCase().startsWith(keyword);
  //     // const hasKeywordB = b.abstract?.toLowerCase().startsWith(keyword);
  //     const hasKeywordA = getSecondToLastElement(a.causeListEntries).actionAbstract?.startsWith(keyword);
  //    const hasKeywordB = getSecondToLastElement(b.causeListEntries).actionAbstract?.startsWith(keyword);

  //     // Prioritize cases with the current keyword at the beginning
  //     if (hasKeywordA && !hasKeywordB) return -1; // Case A with keyword comes before Case B without
  //     if (!hasKeywordA && hasKeywordB) return 1; // Case B with keyword comes after Case A without
  //   }

    // If none of the sorting keywords are found, sort by any other criteria (optional)
    // return a.someOtherProperty.localeCompare(b.someOtherProperty);

  //   return 0; // Cases are considered equal based on keywords
  // });

  // const sortedCases = data.slice().sort((a, b) => {
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

  return !pendingCases.length ? (
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
                    align="center"
                    colSpan={9}
                    style={{
                      fontSize: 24,
                      fontFamily: "Times Roman",
                      // fontStyle: "",
                      fontWeight: "bold",
                      padding: "10px",
                    }}
                    className={classes.tableHeaderCell}
                  >
                  {controlPanel[0].causeListName}
                    {/* بعدالت جناب زیب النساءعباسی سِول جج /جج فیملی کورٹ/علاقہ
                    قاضی-V دیر پائین بمقام تیمرگرہ */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tableHeaderCell}
                    align="center"
                    colSpan={9}
                  >
                    <Grid
                      container
                      spacing={2}
                      alignContent="center"
                      // justify="flex-start"
                    >
                      <Grid item sm={4} className={classes.tableHeadTwo}>
                        {" بروز: "}
                        {pendingCases &&
                          dateCauseList.toLocaleDateString("ur", {
                            weekday: "long",
                          })}
                      </Grid>
                      {/* <Grid item sm={4} className={classes.tableHeadTwo}>
                        {" بروز: "}
                        {data &&
                        new Date().toDateString() ===
                          new Date(data[0]?.orderDate).toDateString()
                          ? new Date(data[0]?.orderDate).toLocaleDateString(
                              "ur",
                              {
                                weekday: "long",
                              }
                            )
                          : data &&
                            new Date(data[0]?.nextDate).toLocaleDateString(
                              "ur",
                              {
                                weekday: "long",
                              }
                            )}
                      </Grid> */}
                      <Grid item sm={4} className={classes.tableHeadTwo}>
                        تاریخ:
                        {pendingCases && format(dateCauseList, "yyy-MM-dd")}
                        {/* <Typography
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      // fontStyle: "",
                      // fontWeight: "bold",
                    }}
                  > 
                        تاریخ:
                        {data &&
                        new Date().toDateString() ===
                          new Date(data[0]?.orderDate).toDateString()
                          ? format(parseISO(data[0].orderDate), "yyy-MM-dd")
                          : data &&
                            format(parseISO(data[0].nextDate), "yyy-MM-dd")}
                         </Typography> */}
                      </Grid>
                      <Grid item sm={4} className={classes.tableHeadTwo}>
                        کل تعداد:
                        {pendingCases && pendingCases.length}
                      </Grid>
                    </Grid>
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
                    Date of Institution
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Case Title
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Category Per PQS
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    کارروائی
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    سابقہ تاریخ
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    آئیندہ تاریخ پیشی
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    خلاصہ کارروائی
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

                {pendingCases.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract ? (
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
                          align="left"
                          style={{ lineHeight: 1, fontSize: "14px" }}
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
                                          "dd-MM-yyyy"
                                        )
                                      : null}
                                  </span>
                                  <br />
                                </>
                              ) : null}
                            </>
                          )}
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
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(
                              caseFile.causeListEntries
                            ).actionAbstract.replace("، حاضری", "")}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            format(
                              parseISO(
                                getSecondToLastElement(
                                  caseFile.causeListEntries
                                ).orderDate
                              ),
                              "dd-MM-yyy"
                            )}
                        </TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
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

export default PrintPendency;
