import React from 'react';
import _ from 'lodash';

const PageNavigation = (props) => {
    const { currentPage, pageSize, totalItems, limit, onPageChange } = props;
    const { onPrevious, onNext } = props;
    const previousDisabled = currentPage === 1;
    const nextDisabled = currentPage === Math.ceil(totalItems / pageSize); // last page

    // don't show all pages, show pages upto the limit
    let pagesCount;
    if (totalItems >= limit) {
        pagesCount = Math.ceil(limit / pageSize);
    } else {
        pagesCount = Math.ceil(totalItems / pageSize);
    }

    // don't show page if there is only 1 page
    if (pagesCount === 1) {
        return null;
    }

    const pages = _.range(1, pagesCount + 1)

    return (
        <div className="page-navigation">
            <nav>
                <ul className="pagination justify-content-center">
                    <button
                        className={previousDisabled ? "page-link disabled" : "page-link"}
                        disabled={previousDisabled}
                        onClick={() => onPrevious(currentPage)}>
                        <span>&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                    {
                        pages.map(page => (
                            <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => onPageChange(page)}>{page}</button>
                            </li>
                        ))
                    }
                    <button
                        className={nextDisabled ? "page-link disabled" : "page-link"}
                        disabled={nextDisabled}
                        onClick={() => onNext(currentPage)}>
                        <span>&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </ul>

            </nav>
        </div>
    )
}

export default PageNavigation;