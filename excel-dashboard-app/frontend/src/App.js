import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';

function App() {
  const [dashboardData, setDashboardData] = React.useState([]);

  const handleFileUploadSuccess = (data) => {
    setDashboardData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <FileUpload onUploadSuccess={handleFileUploadSuccess} />
          {dashboardData.length > 0 && (
            <Dashboard data={dashboardData} />
          )}
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
