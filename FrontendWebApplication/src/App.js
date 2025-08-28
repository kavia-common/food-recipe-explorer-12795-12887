import React from 'react';
import { SearchProvider } from './context/SearchContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import HomePage from './pages/HomePage';
import FoodDetailPage from './pages/FoodDetailPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <SearchProvider>
        <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/food/:id" element={<FoodDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        </div>
        </SearchProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
