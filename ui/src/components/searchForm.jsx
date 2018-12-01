import React from 'react';

const SearchForm = (props) => {
    const { inputChanged, submitClicked, errors } = props;
    return (<div className="mb-3">
        <div className="input-group search-container">
            <input
                type="text"
                placeholder="Search over 36,000 movie titles"
                className="form-input-control"
                onChange={(e) => inputChanged(e)}
            />
            <button
                type="button"
                className="form-button-control btn btn-primary"
                onClick={(e) => submitClicked(e)}>Search</button>
        </div>
        {errors && <div className="alert alert-danger validation-error">{errors.searchTerm}</div>}
    </div>
    );
}

export default SearchForm;