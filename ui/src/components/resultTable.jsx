import React from 'react';
import TableHeader from './tableHeader';
import TableRow from './tableRow';

const ResultTable = (props) => {
    const { movies, currentPage, pageSize } = props;
    const startIndex = (currentPage - 1) * pageSize;

    return (
        <div className="table-responsive">
            <table className="table table-sm table-bordered result-table table-striped bg-light">
                <TableHeader />
                <tbody>
                    {movies && movies.map((movie, index) => (
                        <TableRow
                            key={index}
                            rowInfo={movie}
                            index={startIndex + index + 1}
                        />
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;