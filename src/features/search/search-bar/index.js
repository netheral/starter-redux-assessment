import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm } from '../search.slice';
import './search-bar.css';

export default function SearchBar() {
  const searchTerm = useSelector(selectSearchTerm);
  // Task 10: Store a reference to the Redux store's dispatch method in a variable called `dispatch`
  const dispatch = useDispatch();

  function handleChange({ target: { value } }) {
    // Task 11: Dispatch the `setSearchTerm()` action creator, passing in the value of the search input
    dispatch(setSearchTerm(value));
  }

  return (
    <form className="search-bar">
      <label htmlFor="search">Search by caption: </label>
      <input
        id="search"
        name="search"
        onChange={handleChange}
        placeholder="e.g., terrier"
        type="search"
        value={searchTerm}
      />
    </form>
  );
}
