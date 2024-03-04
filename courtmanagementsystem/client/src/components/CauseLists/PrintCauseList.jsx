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
      overflow: "hidden",
    },
    table: {
      margin: theme.spacing(1),
      borderCollapse: "collapse",
      maxWidth: "8.5in",
      // maxHeight: "13in",
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
      fontSize: 16,
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
    }
  })
);

const PrintCauseList = (props) => {
  // const nextDate = props.location.nextDate;
  const orderDate = props.location.state.orderDate;
  // const dateCauseList = props.location.state.dateCauseList;

  console.log(orderDate);
  const [dateCauseList, setDateCauseList] = useState(props.location.state.dateCauseList);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.causeLists);

  let index = 0;
  const [serialNo, setSerialNo] = useState([]);
  useEffect(() => {
    if (!data) dispatch(getCauseList({ dateCauseList: dateCauseList }));
    for (let i = 1; i <= data.length; i++) {
      // sno.push(i);
      // setSerialNo((oldArray) => [...oldArray, i]);
      setSerialNo((prevArray) => [...prevArray, i]);
    }
    console.log(data);
  }, []);

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

  return !data.length ? (
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
              dir="rtl"
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
                    بعدالت جناب زیب النساءعباسی              سِول جج /جج فیملی کورٹ/علاقہ قاضی-V  دیر پائین بمقام تیمرگرہ
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
                        {data &&
                        dateCauseList.toLocaleDateString(
                              "ur",
                              {
                                weekday: "long",
                              }
                            )}
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
                        {data &&
                          format((dateCauseList), "yyy-MM-dd")
                        }
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
                        {data && data.length}
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>

                {/* <TableHead> */}
                <TableRow>
                  {/* <TableCell className={classes.tableEmptyCell}></TableCell> */}
                  <TableCell className={classes.tableHeaderCell}>
                    نمبرشمار
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    مقدمہ نمبر
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    تاریخ رجوعہ
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    عنوان مقدمہ
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    نوعیت
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
                    className={classes.tableHeaderCell}
                  >
                    حاضری
                  </TableCell>
                </TableRow>

                {data.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("حاضری") ? (
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
                        <TableCell className={classes.tableCell} align="left"
                        style={{lineHeight: 1, fontSize: "14px" }}
                        >
                          {!caseFile["Date of Institution "]
                            ? "null"
                            : (
                              <>
                              <span style={{ fontSize: '' }}>
                              {format?.(
                                parseISO(caseFile["Date of Institution "]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                              </>
                    )}
                          {!caseFile["Date of Transfer In"]
                            ? null
                            :(
                              <>                              
                              <span style={{ fontSize: '' }}>
                            {caseFile["Date of Transfer In"] ? format?.(
                                parseISO(caseFile["Date of Transfer In"]),
                                "dd-MM-yyy"
                              ) : null}
                              </span>
                              <br />
                            </>
                            )}
                          {!caseFile["Date of Other Institution"]
                            ? null
                            :(                             
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Other Institution"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                            )}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.urduTitle
                            ? caseFile.urduTitle
                            : caseFile["Case Title"]}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "16px" , direction : 'ltr', lineHeight: 0.6}}
                        >
                          {caseFile["Case Type"] === "Civil"
                            ? caseFile.nature
                            :(
                              <>
                              {/* <span style={{ fontSize: "10px" }}>
                            {caseFile["FIR Date"] ? format?.(
                                parseISO(caseFile["FIR Date"]),
                                "dd-MM-yyy"
                              ) : null}
                              </span>
                              <span>/</span> */}
                              <span style={{ fontSize: '10px' }}>
                            علت:{caseFile["FIR NO"] ? caseFile["FIR NO"] : null}
                              </span>
                              <span>،</span>
                              <span style={{ fontSize: '10px' }}>
                            تھانہ:{caseFile.Thana ? caseFile.Thana : null}
                              </span>
                              <br/>
                              <span style={{ fontSize: '10px' }}>
                            {caseFile.Section ? caseFile.Section : null}:جرم
                              </span>
                            </>
                            )}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
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
                    className={classes.tableHeaderCell}
                  >
                    شہادت
                  </TableCell>
                </TableRow>

                {data.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("شہادت") ? (
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
                          {serialNo[index++]}
                          {/* {data.indexOf(caseFile) + 1} */}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          component="th"
                          scope="row"
                        >
                          {caseFile["Case No"]}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left"
                        style={{lineHeight: 1, fontSize: "14px" }}>
                        {!caseFile["Date of Institution "]
                            ? "null"
                            : (
                              <>
                              <span style={{ fontSize: '' }}>
                              {format?.(
                                parseISO(caseFile["Date of Institution "]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                              </>
                    )}
                    {!caseFile["Date of Transfer In"]
                            ? ""
                            :(
                              <>                              
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Transfer In"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                            </>
                            )}
                          {!caseFile["Date of Other Institution"]
                            ? ""
                            :(                             
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Other Institution"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                            )}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.urduTitle
                            ? caseFile.urduTitle
                            : caseFile["Case Title"]}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.nature
                            ? caseFile.nature
                            : null}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
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
                    className={classes.tableHeaderCell}
                  >
                    بحث
                  </TableCell>
                </TableRow>

                {data.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("بحث") ? (
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
                        <TableCell className={classes.tableCell} align="left"
                        style={{lineHeight: 1, fontSize: "14px" }}>
                        {!caseFile["Date of Institution "]
                            ? "null"
                            : (
                              <>
                              <span style={{ fontSize: '' }}>
                              {format?.(
                                parseISO(caseFile["Date of Institution "]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                              </>
                    )}
                    {!caseFile["Date of Transfer In"]
                            ? ""
                            :(
                              <>                              
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Transfer In"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                            </>
                            )}
                          {!caseFile["Date of Other Institution"]
                            ? ""
                            :(                             
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Other Institution"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                            )}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.urduTitle
                            ? caseFile.urduTitle
                            : caseFile["Case Title"]}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.nature
                            ? caseFile.nature
                            : null}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
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
                    className={classes.tableHeaderCell}
                  >
                    حکم
                  </TableCell>
                </TableRow>

                {data.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    getSecondToLastElementCategory(
                      caseFile.causeListEntries
                    ).actionAbstract?.includes("حکم") ? (
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
                        <TableCell className={classes.tableCell} align="left"
                        style={{lineHeight: 1, fontSize: "14px" }}>
                        {!caseFile["Date of Institution "]
                            ? "null"
                            : (
                              <>
                              <span style={{ fontSize: '' }}>
                              {format?.(
                                parseISO(caseFile["Date of Institution "]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                              </>
                    )}
                    {!caseFile["Date of Transfer In"]
                            ? ""
                            :(
                              <>                              
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Transfer In"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                            </>
                            )}
                          {!caseFile["Date of Other Institution"]
                            ? ""
                            :(                             
                              <span style={{ fontSize: '' }}>
                            {format?.(
                                parseISO(caseFile["Date of Other Institution"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                            )}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.urduTitle
                            ? caseFile.urduTitle
                            : caseFile["Case Title"]}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.nature
                            ? caseFile.nature
                            : null}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
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

                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={9}
                    style={{
                      // fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      fontFamily: "Time Roman",
                      // fontStyle: "",
                      // fontWeight: "bold",
                    }}
                    className={classes.tableHeaderCell}
                  >
                    
                  </TableCell>
                </TableRow>

                {data.map((caseFile) => (
                  <>
                    {caseFile.causeListEntries &&
                    !getSecondToLastElement(caseFile.causeListEntries)
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
                        <TableCell className={classes.tableCell} align="left">
                        {!caseFile["Date of Institution "]
                            ? "null"
                            : (
                              <>
                              <span style={{ fontSize: '16px' }}>
                              {format?.(
                                parseISO(caseFile["Date of Institution "]),
                                "dd-MM-yyy"
                              )}
                              </span>
                              <br />
                              </>
                    )}
                          {!caseFile["Date of Transfer In"]
                            ? ""
                            :(
                              <span style={{ fontSize: '16x' }}>
                            {format?.(
                                parseISO(caseFile["Date of Transfer In"]),
                                "dd-MM-yyy"
                              )}
                              </span>
                            )}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          // className={[classes.tableCell, classes.tableCaseTitle]}
                          align="left"
                          style={{ fontSize: "auto" }}
                        >
                          {caseFile.urduTitle
                            ? caseFile.urduTitle
                            : caseFile["Case Title"]}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {caseFile.causeListEntries &&
                            getSecondToLastElement(caseFile.causeListEntries)
                              .actionAbstract}
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

export default PrintCauseList;
