import React, { useState } from 'react';

function App() {
  // Dummy array of 100 items to make 10 pages
  const data = Array.from({ length: 100 }, (_, i) => `Data ${i + 1}`);

  // State to keep track of the current page
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
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <>
            <button className="px-3 py-1 mx-1 border rounded" onClick={() => setCurrentPage(1)}>1</button>
            {currentPage > 2 && <span className="px-3 py-1">...</span>}
          </>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => Math.abs(currentPage - page) <= 1)
          .map(page => (
            <button
              key={page}
              className={`px-3 py-1 mx-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))
        }

        {currentPage < totalPages && (
          <>
            {currentPage < totalPages - 1 && <span className="px-3 py-1">...</span>}
            <button className="px-3 py-1 mx-1 border rounded" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
