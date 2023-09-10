import React, { useState } from 'react';

function App() {
  // Dummy array of 50 items
  const data = Array.from({ length: 50 }, (_, i) => `Data ${i + 1}`);
  
  // State to keep track of the current page, starting with page 1
  const [currentPage, setCurrentPage] = useState(1);
  
  // Number of items per page
  const itemsPerPage = 10;
  
  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to slice data for the current page
  const getDataToRender = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Fetch the data to render for the current page
  const dataToRender = getDataToRender();
  
  return (
    <div className="container mx-auto p-4">
      <ul>
        {dataToRender.map((item, index) => (
          <li key={index} className="p-2 border-b">{item}</li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
