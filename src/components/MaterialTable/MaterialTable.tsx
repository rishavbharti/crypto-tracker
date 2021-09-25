import React from "react";
import MaterialTable, {
    MTableToolbar,
    MTableHeader,
    MTableCell,
} from "material-table";

export default function Table() {
    return (
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable
                components={{
                    Toolbar: (props) => (
                        <div style={{ backgroundColor: "#e8eaf5" }}>
                            <MTableToolbar {...props} />
                        </div>
                    ),
                    Header: (props) => <MTableHeader {...props} />,
                    Cell: (props) => (
                        <td className='table_data'>
                            <MTableCell {...props} />
                        </td>
                    ),
                }}
                columns={[
                    {
                        title: "Name",
                        field: "name",
                    },
                    { title: "Surname", field: "surname" },
                    {
                        title: "Birth Year",
                        field: "birthYear",
                        type: "numeric",
                    },
                    {
                        title: "Birth City",
                        field: "birthCity",
                        // lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
                    },
                ]}
                data={[
                    {
                        name: "Mehmet",
                        surname: "Baran",
                        birthYear: 1987,
                        birthCity: 63,
                    },
                    {
                        name: "John",
                        surname: "Snow",
                        birthYear: 1,
                        birthCity: 34,
                    },
                ]}
                title='Demo Title'
            />
        </div>
    );
}
