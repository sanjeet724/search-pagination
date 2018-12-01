import React from 'react';

const CategoryDropDown = (props) => {
    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-secondary dropdown-toggle btn-sm"
                type="button" id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Categories
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item btn-sm" type="button">Action</button>
                <button className="dropdown-item btn-sm" type="button">Romance</button>
                <button className="dropdown-item btn-sm" type="button">Western</button>
            </div>
        </div>
    );
}

export default CategoryDropDown;