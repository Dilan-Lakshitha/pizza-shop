import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemManagement from './pages/ItemManagement';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import InvoiceManagement from './pages/InvoiceManagement';
import Dashboard from './pages/dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <main className="flex-grow container mx-auto p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/item-management" element={<ItemManagement />} />
              <Route path="/invoice-management" element={<InvoiceManagement />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
