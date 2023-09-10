import React, { useState } from 'react';

function App() {
  // Dummy array for demonstration; replace with your own data
  const data = Array.from({ length: 175 }, (_, i) => `Data ${i + 1}`);

  // Initialize state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data array to get only the items to render on the current page
  const getDataToRender = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const dataToRender = getDataToRender();

  // Generate page numbers with ellipses
  const generatePageNumbers = () => {
    const range = 2; // Display range for the current page
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      // Always include the first two and the last two pages
      if (i === 1 || i === 2 || i === totalPages || i === totalPages - 1) {
        pages.push(i);
      }
      // Include two pages before and two pages after the current page
      else if (i >= currentPage - range && i <= currentPage + range) {
        pages.push(i);
      }
    }

    // Remove duplicates and sort
    pages = [...new Set(pages)].sort((a, b) => a - b);

    // Insert ellipses
    let pagesWithEllipses = [];
    for (let i = 0; i < pages.length; i++) {
      if (i > 0 && pages[i] - pages[i - 1] > 1) {
        pagesWithEllipses.push('...');
      }
      pagesWithEllipses.push(pages[i]);
    }
    
    return pagesWithEllipses;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="container mx-auto p-4">
      <ul>
        {dataToRender.map((item, index) => (
          <li key={index} className="p-2 border-b">{item}</li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((page, index) => (
          typeof page === 'string' ? (
            <span key={index} className="px-3 py-1 mx-1">{page}</span>
          ) : (
            <button
              key={page}
              className={`px-3 py-1 mx-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        ))}
      </div>
    </div>
  );
}

export default App;
