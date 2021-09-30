import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { fetchAssets } from "redux/assetsSlice";
import { CircularProgress } from "@material-ui/core";

const columns = ["Token", "Qty. Owned", "Price", "Total Value", "Allocation"];

export default function AssetsTable() {
    const {
        assets: { status, data },
    } = useAppSelector((state) => state.assets);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAssets());
    }, [dispatch]);

    // const data = [
    //     {
    //         token: "BTC",
    //         qty: 0.5,
    //         price: 10000,
    //         total_value: 5000,
    //         allocation: "50%",
    //     },
    //     {
    //         token: "ETH",
    //         qty: 25,
    //         price: 200,
    //         total_value: 5000,
    //         allocation: "50%",
    //     },
    // ];

    const renderTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    align={index === 0 ? "left" : "right"}
                                    className='table_heading'
                                    key={index}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((datum) => (
                            <TableRow key={datum["token"]}>
                                <TableCell className='table_data' scope='row'>
                                    {datum["token"]}
                                </TableCell>
                                <TableCell className='table_data' align='right'>
                                    {datum["quantity"]}
                                </TableCell>

                                <TableCell className='table_data' align='right'>
                                    ${datum?.["price"]}
                                </TableCell>
                                <TableCell className='table_data' align='right'>
                                    ${datum?.["totalValue"]}
                                </TableCell>
                                <TableCell className='table_data' align='right'>
                                    {datum?.["allocation"]}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const renderContent = () => {
        if (status === "loading") {
            return <CircularProgress />;
        }

        if (!data.length) {
            return <p>No assets found.</p>;
        }

        return renderTable();
    };

    return renderContent();
}
