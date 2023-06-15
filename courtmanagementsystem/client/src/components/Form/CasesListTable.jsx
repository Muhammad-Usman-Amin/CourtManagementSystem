import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteEmployeeData, getQueryData } from "../../actions/employeeData";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import { useReactToPrint } from "react-to-print";
// import { getEmployeeData } from './actions/employeeData';
// import { parseISO } from 'date-fns/parseISO';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CasesListTable({
    currentId,
    setCurrentId,
    onPageChange,
}) {
    const tableRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
    });

    const cases = useSelector((state) => state.cases);
    const queryData = useSelector((state) => state.queryData);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        setCurrentId(null);
        onPageChange("Cases List");
    }, [onPageChange]);

    return !cases.length ? (
        <CircularProgress />
    ) : (
        <TableContainer component={Paper}>
            <Table
                ref={tableRef}
                stickyHeader
                size="small"
                className={classes.table}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell component="th" scope="row" align="left">
                            Case NO
                        </TableCell>
                        <TableCell align="left">Case Title</TableCell>
                        <TableCell align="left">Case Type</TableCell>
                        <TableCell align="left">Date Of Institution</TableCell>
                        <TableCell align="left">Institution Year</TableCell>
                        <TableCell align="left">Edit</TableCell>
                        <TableCell align="left">Delete</TableCell>
                        {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cases.map((row) => (
                        <TableRow hover key={row._id}>
                            <TableCell component="th" scope="row">
                                {cases.indexOf(row) + 1}
                            </TableCell>
                            <TableCell align="left">{row["Case No"]}</TableCell>
                            <TableCell align="left">{row["Case Title"]}</TableCell>
                            <TableCell align="left">{row["Case Type"]}</TableCell>
                            <TableCell align="left">
                                {format?.(parseISO(row["Date of Institution "]), "dd-MM-yyy")}
                            </TableCell>
                            <TableCell align="left">{row["Institution Year"]}</TableCell>

                            <TableCell align="left">
                                <Button
                                    size="small"
                                    color="primary"
                                    component={Link}
                                    to="/FormCases"
                                    variant="outlined"
                                    style={{ borderRadius: 50 }}
                                    onClick={() => {
                                        setCurrentId(row._id);
                                        console.log(currentId);
                                    }}
                                >
                                    {<EditIcon />}
                                </Button>{" "}
                            </TableCell>

                            <TableCell align="left">
                                <Button
                                    fontSize="small"
                                    color="secondary"
                                    size="small"
                                    variant="outlined"
                                    style={{ borderRadius: 50 }}
                                    onClick={
                                        () => dispatch(deleteEmployeeData(row._id))
                                        // setCurrentId(row._id);
                                        // console.log(currentId);
                                    }
                                >
                                    {<DeleteIcon fontSize="small" />}
                                </Button>
                            </TableCell>

                            {/* <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button component={Link} to="/PrintDataTable">
                Print
            </Button>
            {/* <button onClick={handlePrint}>Print</button> */}
            <Button
                fontSize="small"
                color="secondary"
                size="small"
                variant="outlined"
                style={{ borderRadius: 50 }}
                onClick={() => {
                    dispatch(getQueryData({ designation: "Computer Operator" }));
                    console.log(queryData);
                    // console.log(cases);
                }}
            >
                {<DeleteIcon fontSize="small" />}
            </Button>
        </TableContainer>
    );
}
