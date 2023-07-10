import React from "react";
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

const useStyles = makeStyles((theme) =>
  createStyles({
    centeredDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      /* Additional styles as needed */
      // width: 100%,
      // height: 100vh,
      // border: "1px solid black",
      // borderRadius: "10px",
      overflow: "hidden",
    },
    table: {
      margin: theme.spacing(1),
      // borderCollapse: "collapse",
      // maxWidth: "8.5in",
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
      border: "1px solid black",
      // borderColor: theme.palette.primary.black,
      fontWeight: "bold",
      fontSize: 11,
      minWidth: "100px",
      // align: "center",
      textAlign: "center",
    },
    tableCell: {
      fontSize: 11,
      // align: "center",
      textAlign: "center",
      border: "1px solid",
      // borderColor: theme.palette.grey[300],
      borderColor: theme.palette.black,
      padding: theme.spacing(1),
      fontFamily: "Alvi Nastaleeq Regular",
    },
    rightAlignedCell: {
      textAlign: "right",
    },
    tableHeadTwo: {
      fontSize: 18,
      fontFamily: "Alvi Nastaleeq Regular",
      // fontStyle: "",
      fontWeight: "bold",
      padding: "20px",
    },
  })
);

const PrintCauseList = () => {
  const classes = useStyles();
  const tableRef = React.useRef();
  const data = useSelector((state) => state.causeLists);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

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
    <div className={classes.centeredDiv}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Print
          </Button>
        </Grid>
        <Grid>
          <Table
            ref={tableRef}
            size="small"
            className={classes.table}
            aria-label="simple table"
            dir="rtl"
          >
            <TableRow>
              <TableCell
                align="center"
                colSpan={8}
                style={{
                  fontSize: 24,
                  // fontFamily: "Alvi Nastaleeq Regular",
                  // fontStyle: "",
                  fontWeight: "bold",
                  padding: "10px",
                }}
                className={classes.tableHeaderCell}
              >
                بعدالت جناب امین سید ایڈیشنل ڈسٹرکٹ اینڈ سیشن جج، ضلع دیرپائین
                بمقام تیمر گرہ
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.tableHeaderCell}
                align="center"
                colSpan={8}
              >
                <Grid
                  container
                  spacing={2}
                  alignContent="center"
                  justify="flex-start"
                >
                  <Grid item sm={4} className={classes.tableHeadTwo}>
                    بروز:
                    {data[0]?.orderDate
                      ? new Date(data[0].orderDate).toLocaleDateString("ur", {
                          weekday: "long",
                        })
                      : new Date().toLocaleDateString("ur", {
                          weekday: "long",
                        })}
                  </Grid>
                  <Grid item sm={4} className={classes.tableHeadTwo}>
                    {/* <Typography
                    style={{
                      fontSize: 20,
                      // fontFamily: "Alvi Nastaleeq Regular",
                      // fontStyle: "",
                      // fontWeight: "bold",
                    }}
                  > */}
                    تاریخ:
                    {data[0]?.orderDate
                      ? format(parseISO(data[0]?.orderDate), "yyy-MM-dd")
                      : format(parseISO(new Date().toISOString()), "yyy-MM-dd")}
                    {/* </Typography> */}
                  </Grid>
                  <Grid item sm={4} className={classes.tableHeadTwo}>
                    کل تعداد:
                    {data.length}
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            {/* <TableHead> */}
            <TableRow>
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
            {/* </TableHead> */}

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

            <TableBody>
              {data.map((caseFile) => (
                <>
                  {caseFile.causeListEntries &&
                  getSecondToLastElement(
                    caseFile.causeListEntries
                  ).actionAbstract?.includes("حاضری") ? (
                    <TableRow hover key={caseFile._id}>
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                        style={{ maxWidth: 1 }}
                      >
                        {data.indexOf(caseFile) + 1}
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
                          : format?.(
                              parseISO(caseFile["Date of Institution "]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
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
                              getSecondToLastElement(caseFile.causeListEntries)
                                .orderDate
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
                  getSecondToLastElement(
                    caseFile.causeListEntries
                  ).actionAbstract?.includes("بحث") ? (
                    <TableRow hover key={caseFile._id}>
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                        style={{ maxWidth: 1 }}
                      >
                        {data.indexOf(caseFile) + 1}
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
                          : format?.(
                              parseISO(caseFile["Date of Institution "]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
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
                              getSecondToLastElement(caseFile.causeListEntries)
                                .orderDate
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
                  getSecondToLastElement(
                    caseFile.causeListEntries
                  ).actionAbstract?.includes("شہادت") ? (
                    <TableRow hover key={caseFile._id}>
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                        style={{ maxWidth: 1 }}
                      >
                        {data.indexOf(caseFile) + 1}
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
                          : format?.(
                              parseISO(caseFile["Date of Institution "]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
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
                              getSecondToLastElement(caseFile.causeListEntries)
                                .orderDate
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
                  getSecondToLastElement(
                    caseFile.causeListEntries
                  ).actionAbstract?.includes("حکم") ? (
                    <TableRow hover key={caseFile._id}>
                      <TableCell
                        className={classes.tableCell}
                        component="th"
                        scope="row"
                        style={{ maxWidth: 1 }}
                      >
                        {data.indexOf(caseFile) + 1}
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
                          : format?.(
                              parseISO(caseFile["Date of Institution "]),
                              "dd-MM-yyy"
                            )}
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
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
                              getSecondToLastElement(caseFile.causeListEntries)
                                .orderDate
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

      {/* <button onClick={handlePrint}>Print</button> */}
    </div>
  );
};

export default PrintCauseList;
