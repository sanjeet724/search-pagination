import React from 'react';

const TableHeader = (props) => {
    return (
        <thead>
            <tr>
                <th scope="col" className="table-header-index">#</th>
                <th scope="col" className="table-header">Title</th>
                <th scope="col" className="table-header">Year</th>
                <th scope="col" className="table-header">Director</th>
                <th scope="col" className="table-header">Genre</th>
                <th scope="col" className="table-header">Origin</th>
                <th scope="col" className="table-header">Info</th>
            </tr>
        </thead>
    );
}

export default TableHeader; 