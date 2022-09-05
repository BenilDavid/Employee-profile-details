import React from "react";
import { Table } from 'reactstrap';
import './Table.scss';

export const StripedTable = ({
    headerDetails,
    children,
    className = "",
}) => {
        return (
            <Table striped bordered className="striped-table">
                <thead>
                    <tr>
                        {headerDetails.map(({label}) => {
                            return (<th className="table-heading px-4">{label}</th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </Table>
        );
    }
