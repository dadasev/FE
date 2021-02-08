import React, {useState} from 'react';
import Strings from '../../utils/strings.js';
import axios from 'axios';
import './searchBar.scss';

const SearchBar = ( {onFormSubmit, onInputValueChange} ) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');

  const keywordLogger = async (term) => {
    try {
      await axios.post(`${Strings.loggerAPIUrl}/keyword`, {
        keyword: term
      })
    } catch(e) {
      console.log(e);
    }
  };

  const onSubmit = event => {
    const isNewSearch = true;
    event.preventDefault();
    keywordLogger(term);
    onInputValueChange(term);
    onFormSubmit(term, "", isNewSearch);
  };

  const onInputChange = e => {
    const re = /^(?=.{1,20}$).*/;
    if (e.target.value === "" || re.test(e.target.value)){
      setTerm(e.target.value);
      setError("")
    } else {
      setError(Strings.inputValidationError);
    }
  };

  const renderError = () =>{
    return (
      <div className="ui pointing red basic label">
        {error}
      </div> 
    )
  };
  
  return (
    <div className="search-bar-container">
      <form onSubmit={onSubmit}>
        <div>
          <label className="search-bar-label">{Strings.searchBarLabel}</label>
          <div className="ui input action container search-bar">
          <input
            type="text"
            value={term}
            onChange={onInputChange}
            placeholder="Enter your keywords here..."
            name="keyword"
            className="search-bar"
          />
          <button className="ui button red">Go!</button>
          </div>
        </div>
        <div>
          {!error ? null : renderError() }
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
