import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CaseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const cases = useSelector((state) => state.cases); // Assuming cases are stored in Redux state

  // Update search query state
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter cases based on search query
  const filteredCases = cases.filter((case) =>
    case.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search cases"
      />

      {filteredCases.length > 0 ? (
        <ul>
          {filteredCases.map((case) => (
            <li key={case.id}>{case.title}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default CaseSearch;
