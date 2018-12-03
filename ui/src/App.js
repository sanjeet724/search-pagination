import React, { Component } from 'react';
import SearchForm from './components/searchForm';
import CategoryDropDown from './components/categoryDropdown';
import ResultTable from './components/resultTable';
import PageNavigation from './components/pageNavigation';
import { paginate } from './utils/paginate';
import * as movieService from './services/movieService';
import Joi from 'joi-browser';
import MDSpinner from 'react-md-spinner'
import './App.css';

class App extends Component {
  state = {
    searchTerm: "",
    categorySelected: null,
    pageSize: 10,
    limit: 500,
    currentPage: 1,
    previousPageRange: [],
    searchResult: {},
    fetchingData: false,
    errors: null
  }

  handleChange = (e) => {
    const val = e.target.value;
    let { searchTerm } = this.state;
    searchTerm = val;
    this.setState({ searchTerm });
  };

  validate = (criteria) => {
    const schema = {
      searchTerm: Joi.string().min(3).max(20).required().label("Movie title"),
    }

    const { error } = Joi.validate(criteria, schema);
    if (!error) {
      return null;
    }

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }

    return validationErrors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate({ searchTerm: this.state.searchTerm });
    this.setState({ errors: errors } || null);
    if (errors) {
      return;
    }

    this.submitChanges();
  };

  updateResults = (result) => {
    const { movies, totalCount } = result;
    const { searchResult } = this.state;
    searchResult.movies = movies;
    searchResult.totalCount = totalCount;
    this.setState({ searchResult });
    this.setState({ fetchingData: false });

    // reset the current page to clear an older search
    this.setState({ currentPage: 1 });
    this.setState({ previousPageRange: [] })
  }

  submitChanges = async () => {
    try {
      this.setState({ fetchingData: true });
      const movies = await movieService.getMovieByTitle(this.state.searchTerm);
      this.updateResults(movies.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  handlePageChange = (page, range) => {
    this.setState({ previousPageRange: range })
    this.setState({ currentPage: page });
  };

  handlePrevious = (page, range) => {
    if (page !== 1) {
      this.setState({ previousPageRange: range })
      this.setState({ currentPage: page - 1 });
    }
  };

  handleNext = (page, range) => {
    const { searchResult, pageSize, limit } = this.state;
    const lastPage = Math.ceil(searchResult.totalCount / pageSize);
    const pageLimit = limit / pageSize;

    if (page !== lastPage) {
      if (page >= pageLimit) {
        this.setState({ fetchingData: true });
      } else {
        this.setState({ previousPageRange: range })
        this.setState({ currentPage: page + 1 });
      }
    }
  };

  handleFirst = firstPage => {
    this.setState({ currentPage: firstPage });
  };

  handleLast = (lastPage) => {
    this.setState({ currentPage: lastPage });
  };

  render() {
    const { errors, searchResult, limit, fetchingData } = this.state;
    const { pageSize, currentPage, previousPageRange } = this.state;

    // paginate movies
    const movies = paginate(searchResult.movies, currentPage, pageSize);
    const recordsShown = searchResult.totalCount > limit ? limit : searchResult.totalCount;

    return (
      <div className="app-main">
        <div className="container">
          <h1 className="app-header">Movie Database</h1>
          <SearchForm
            inputChanged={this.handleChange}
            submitClicked={this.handleSubmit}
            errors={errors} />
          {searchResult.totalCount &&
            <React.Fragment>
              {fetchingData && <MDSpinner />}
              <div className="result-info-menu">
                <h4><span className="badge badge-success">{searchResult.totalCount}</span> Movies found</h4>
                <CategoryDropDown />
              </div>
              <div className="records-shown">
                <h5>Showing <span className="badge badge-info">{recordsShown} / {searchResult.totalCount}</span> records</h5>
              </div>
              <ResultTable movies={movies} currentPage={currentPage} pageSize={pageSize} />
              <PageNavigation
                limit={limit}
                currentPage={currentPage}
                previousPageRange={previousPageRange}
                pageSize={pageSize}
                totalItems={searchResult.totalCount}
                onPageChange={this.handlePageChange}
                onPrevious={this.handlePrevious}
                onFirstPage={this.handleFirst}
                onLastPage={this.handleLast}
                onNext={this.handleNext} />
            </React.Fragment>
          }
        </div >
      </div>

    );
  }
}

export default App;
