import React from 'react';
import LimitButton from './limitButton';
import PageNavIcon from './pageNavIcon';
import PageNavItem from './pageNavItem';
import { getPageRange } from '../utils/paginate';

const PageNavigation = (props) => {
    const { currentPage, pageSize, totalItems, onPageChange } = props;
    const { onPrevious, onNext, previousPageRange, limit } = props;
    const { onFirstPage, onLastPage } = props;
    const previousDisabled = currentPage === 1;
    const nextDisabled = currentPage === Math.ceil(totalItems / pageSize); // last page

    const totalPages = Math.ceil(totalItems / pageSize);
    const pagesLimit = Math.ceil(limit / pageSize);
    const pagesCount = totalPages > pagesLimit ? pagesLimit : totalPages;
    const lastDisabled = currentPage === pagesCount;

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
                    <LimitButton
                        clickHandler={onFirstPage}
                        label={"First"}
                        isDisabled={previousDisabled}
                        targetPage={1} />
                    <PageNavIcon
                        clickHandler={onPrevious}
                        currentPage={currentPage}
                        isDisabled={previousDisabled}
                        pageRange={pages}
                        type={"previous"}
                        label={"Previous"} />

                    {
                        pages.map(page => (
                            <PageNavItem key={page}
                                toPage={page}
                                currentPage={currentPage}
                                clickHandler={onPageChange}
                                pageRange={pages} />
                        ))
                    }
                    <PageNavIcon
                        clickHandler={onNext}
                        currentPage={currentPage}
                        isDisabled={nextDisabled}
                        pageRange={pages}
                        type={"next"}
                        label={"Next"} />
                    <LimitButton
                        clickHandler={onLastPage}
                        label={"Last"}
                        isDisabled={lastDisabled}
                        targetPage={pagesCount} />
                </ul>
            </nav>
        </div>
    )
}

export default PageNavigation;