import React from 'react';

const TableRow = (props) => {
    const { rowInfo, index } = props;
    return (
        <tr>
            <th className="row-index-cell" scope=" row">{index}</th>
            <td className="row-cell">{rowInfo["Title"]}</td>
            <td className="row-cell">{rowInfo["Release Year"]}</td>
            <td className="row-cell">{rowInfo["Director"]}</td>
            <td className="row-cell">{rowInfo["Genre"]}</td>
            <td className="row-cell">{rowInfo["Origin/Ethnicity"]}</td>
            <td className="row-cell">
                <a target="_blank"
                    rel="noopener noreferrer"
                    className="badge badge-secondary"
                    href={rowInfo["Wiki Page"]}>Link</a>
            </td>
        </tr>
    );
}

export default TableRow;