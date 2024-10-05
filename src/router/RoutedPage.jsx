import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from '../Views/App';
import Words from '../Views/Words';
import NotFound from '../Views/NotFound';

function RoutedPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/words" element={<Words />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutedPage;
