import React from 'react';

const PageNavIcon = (props) => {
    const { clickHandler, currentPage, pageRange, type, isDisabled, label } = props;
    return (
        <button
            className={isDisabled ? "page-link disabled" : "page-link"}
            disabled={isDisabled}
            onClick={() => clickHandler(currentPage, pageRange)}>
            {type === "previous" && <span>&laquo;</span>}
            {type === "next" && <span>&raquo;</span>}
            <span className="sr-only">{label}</span>
        </button>
    );
}

export default PageNavIcon;