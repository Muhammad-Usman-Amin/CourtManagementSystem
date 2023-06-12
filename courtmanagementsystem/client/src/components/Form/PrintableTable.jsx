import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useReactToPrint } from 'react-to-print';
import { format, parseISO } from 'date-fns';


const useStyles = makeStyles((theme) =>
    createStyles({
        table: {
            minWidth: 650,
            margin: theme.spacing(2),
        },
        tableHeaderCell: {
            fontWeight: 'bold',
            fontSize: 14,
        },
        tableCell: {
            fontSize: 10,
        },
    })
);

const PrintableTable = ({ data }) => {
    const classes = useStyles();
    const tableRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
    });

    return (
        <div>
            <Table ref={tableRef} size="small" className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>S.No</TableCell>
                        <TableCell className={classes.tableHeaderCell} component="th" scope="row" align="left">Name of Official</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">Designation</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">Attached to Court</TableCell>
                        <TableCell className={classes.tableHeaderCell} align="left">Date Of Initial Appointment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow hover key={row._id}>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                                {data.indexOf(row) + 1}
                            </TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className={classes.tableCell} align="left">{row.designation}</TableCell>
                            <TableCell className={classes.tableCell} align="left">{row.attachedToCourt}</TableCell>
                            <TableCell className={classes.tableCell} align="left">{format?.(parseISO(row.dateOfInitialAppointment), "dd-MM-yyy")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <button onClick={handlePrint}>Print</button>
        </div>
    );
};

export default PrintableTable;
