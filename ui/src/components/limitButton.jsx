import React from 'react';

const LimitButton = (props) => {
    const { clickHandler, targetPage, isDisabled, label } = props;
    return (
        <button
            type="button"
            className="btn btn-info"
            onClick={() => clickHandler(targetPage)}
            disabled={isDisabled}>{label}
        </button>
    )
}

export default LimitButton; 