import * as React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function AssetsTable() {
    const columns = [
        "Token",
        "Qty. Owned",
        "Price",
        "Total Value",
        "Allocation",
    ];

    const data = [
        {
            token: "BTC",
            qty: 0.5,
            price: 10000,
            total_value: 5000,
            allocation: "50%",
        },
        {
            token: "ETH",
            qty: 25,
            price: 200,
            total_value: 5000,
            allocation: "50%",
        },
    ];

    return (
        <TableContainer component={Paper} style={{ width: "80%" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                align={index === 0 ? "left" : "right"}
                                className='table_heading'
                            >
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((datum) => (
                        <TableRow key={datum.token}>
                            <TableCell className='table_data' scope='row'>
                                {datum.token}
                            </TableCell>
                            <TableCell className='table_data' align='right'>
                                {datum.qty}
                            </TableCell>

                            <TableCell className='table_data' align='right'>
                                {datum.price}
                            </TableCell>
                            <TableCell className='table_data' align='right'>
                                {datum.total_value}
                            </TableCell>
                            <TableCell className='table_data' align='right'>
                                {datum.allocation}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
