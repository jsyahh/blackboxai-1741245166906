import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <i className="fas fa-chart-line text-indigo-600 text-2xl"></i>
            <h1 className="text-xl font-semibold text-gray-800">
              Excel Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Reset
            </button>
            <a
              href="https://github.com/yourusername/excel-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
