import React from 'react';

const PageNavItem = (props) => {
    const { toPage, currentPage, pageRange, clickHandler } = props;
    return (
        <li className={toPage === currentPage ? "page-item active" : "page-item"}>
            <button
                type="button"
                className="page-link"
                onClick={() => clickHandler(toPage, pageRange)}>{toPage}
            </button>
        </li>
    );
}

export default PageNavItem;