import React from 'react';
import { getPageRange } from '../utils/paginate';

const PageNavigation = (props) => {
    const { currentPage, pageSize, totalItems, onPageChange } = props;
    const { onPrevious, onNext, previousPageRange } = props;
    const previousDisabled = currentPage === 1;
    const nextDisabled = currentPage === Math.ceil(totalItems / pageSize); // last page

    const pagesCount = Math.ceil(totalItems / pageSize);

    // don't show page if there is only 1 page
    if (pagesCount === 1) {
        return null;
    }
    // show 5 pages at a time
    const windowSize = pagesCount > 5 ? 5 : pagesCount;
    const pages = getPageRange(currentPage, windowSize, previousPageRange);

    return (
        <div className="page-navigation">
            <nav>
                <ul className="pagination justify-content-center">
                    <button
                        className={previousDisabled ? "page-link disabled" : "page-link"}
                        disabled={previousDisabled}
                        onClick={() => onPrevious(currentPage, pages)}>
                        <span>&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                    {
                        pages.map(page => (
                            <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => onPageChange(page, pages)}>{page}</button>
                            </li>
                        ))
                    }
                    <button
                        className={nextDisabled ? "page-link disabled" : "page-link"}
                        disabled={nextDisabled}
                        onClick={() => onNext(currentPage, pages)}>
                        <span>&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </ul>

            </nav>
        </div>
    )
}

export default PageNavigation;