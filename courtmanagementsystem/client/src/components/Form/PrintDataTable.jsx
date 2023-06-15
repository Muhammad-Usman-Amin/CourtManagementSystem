import React from "react";
import PrintableTable from "./PrintableTable";
import { useSelector } from "react-redux";

const PrintDataTable = () => {
    const tableData = [
        { id: 1, column1: "Value 1", column2: "Value 2", column3: "Value 3" },
        { id: 2, column1: "Value 4", column2: "Value 5", column3: "Value 6" },
        // Add more data rows as needed
    ];
    const employeeData = useSelector((state) => state.employeeData);
    return (
        <div>
            {/* Display the table */}
            <PrintableTable data={employeeData} />
        </div>
    );
};

export default PrintDataTable;
