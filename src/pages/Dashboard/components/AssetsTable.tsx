import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { fetchAssets, deleteAsset } from "redux/assetsSlice";
import { CircularProgress } from "@material-ui/core";

const columns = [
    "Token",
    "Qty. Owned",
    "Price",
    "Total Value",
    "Allocation",
    "Actions",
];

export default function AssetsTable(props: any) {
    const { handleEditClick } = props;

    const {
        assets: { status, data },
        add,
    } = useAppSelector((state) => state.assets);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAssets());
    }, [dispatch]);

    useEffect(() => {
        if (add.status === "success") {
            dispatch(fetchAssets());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [add.status]);

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
                        {data.map((datum, index) => (
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

                                <TableCell
                                    align='right'
                                    className='edit_button'
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleEditClick(
                                            datum["token"],
                                            datum["quantity"]
                                        )
                                    }
                                >
                                    edit
                                </TableCell>
                                <TableCell
                                    className='delete_button'
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        dispatch(
                                            deleteAsset({
                                                token: datum["token"],
                                                index: index,
                                            })
                                        )
                                    }
                                >
                                    delete
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
