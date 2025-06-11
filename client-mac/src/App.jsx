import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QR1 from './qr1';
import MacView from '../../client-mac/src/7mac';
import AppMac from '../../client-mac/src/App-mac';

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    perspective: '',
    age: ''
  });

  <video src="/movie.mp4" autoPlay loop muted />
  return (
    <Router>
      <Routes>
        <Route path="/qr1" element={<QR1 formData={formData} />} />
        <Route path="/7mac" element={<MacView />} />
        <Route path="/4satsuei" element={<Satsuei />} />
        <Route path="/6qr" element={<QR1 />} />
  <Route path="/mac" element={<AppMac />} />
      </Routes>
    </Router>
  );
}

export default App;
