import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemManagement from './pages/ItemManagement';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ItemManagement />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
