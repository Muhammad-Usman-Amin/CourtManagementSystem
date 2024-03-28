import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//     return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//     createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//     createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//     createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//     createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//     createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function formatCase(caseString) {
  // const parts = caseString.split("Vs");
  // Used a regular expression with case-insensitive flag 'i' to match all occurrences of "vs" or "VS"
  const parts = caseString.split(/ vs /i);
  return (
    <span>
      {parts[0]}
      <strong>
        {" "}
        {" >"} VS {"< "}{" "}
      </strong>
      {parts[1]}
    </span>
  );
}

export default function RecentCases() {
  const cases = useSelector((state) => state.cases);
  let lastFiveEntries = cases.slice(-10);
  // Sort the array based on the 'date' property
  lastFiveEntries = lastFiveEntries.sort(
    (b, a) =>
      new Date(a["Date of Institution "]) - new Date(b["Date of Institution "])
  );
  const classes = useStyles();
  let i = 1;
  return (
    <React.Fragment>
      <Title>Recent Cases</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>S.No</strong>
            </TableCell>
            <TableCell>
              <strong>Institution Date</strong>
            </TableCell>
            <TableCell>
              <strong>Case Title</strong>
            </TableCell>
            <TableCell>
              <strong>Nature</strong>
            </TableCell>
            <TableCell>
              <strong>Next Date</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastFiveEntries.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {i++}
              </TableCell>
              <TableCell>
                {format?.(parseISO(row["Date of Institution "]), "dd-MM-yyy")}
              </TableCell>
              <TableCell>{formatCase(row["Case Title"])}</TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: "Jameel Noori Nastaleeq",
                  fontSize: 20,
                }}
              >
                {row.nature}
              </TableCell>
              <TableCell>
                {format(parseISO(row.nextDate), "dd-MM-yyy")}
              </TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See All Cases
        </Link>
      </div>
    </React.Fragment>
  );
}
