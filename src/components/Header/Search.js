import React, { useCallback, useState } from 'react';
import './Search.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLaunches,
  setSearchQuery,
} from '../../features/launches/launchesSlice';
import { debounce } from 'lodash';

const Search = () => {
  const dispatch = useDispatch();
  const { launches, searchQuery, hasMore, offset } = useSelector(
    (state) => state.launches
  );

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // const debouncedSearch = useCallback(
  //   debounce((query) => {
  //     dispatch(setSearchQuery(query)); // Update the search query in Redux
  //     dispatch(fetchLaunches({ searchQuery: query, offset: 0 })); // Fetch with new query
  //   }, 500), // 500ms debounce
  //   [dispatch]
  // );

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(setSearchQuery(query)); // Reset state for new search query
    }, 500), // 500ms debounce delay
    [dispatch]
  );

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setLocalSearchQuery(value); // Update local state for immediate UI feedback
  //   debouncedSearch(value); // Trigger debounced API call
  // };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value); // Update local state for immediate feedback
    debouncedSearch(value); // Trigger debounced API call
  };

  return (
    <header>
      {/* <input placeholder="Search" type="text" /> */}
      <input
        type="text"
        value={localSearchQuery}
        onChange={handleSearchChange}
        placeholder="Search by mission name..."
        // className={classes.searchInput}
      />
    </header>
  );
};

export default Search;
