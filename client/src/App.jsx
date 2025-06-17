import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Start from './1start';
import CameraChoice from './2camera';
import Chui from './3chui';
import Danjo from './3danjo';
import Miekata from './4miekata';
import Satsuei from './4satsuei';
import Nenrei from './5nenrei';
import QR1 from './qr1';    

 // こう書く！

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
         <Route path="/" element={<Navigate to="/1start" />} /> {/* ✅ 追加 */}
          <Route path="/1start" element={<Start />} />
        <Route path="/2camera" element={<CameraChoice />} />
        <Route path="/3chui" element={<Chui />} />
        <Route path="/3danjo" element={<Danjo setFormData={setFormData} />} />
        <Route path="/4miekata" element={<Miekata setFormData={setFormData} />} />
        <Route path="/5nenrei" element={<Nenrei setFormData={setFormData} />} />
        <Route path="/qr1" element={<QR1 formData={formData} />} />
        <Route path="/4satsuei" element={<Satsuei />} />
        <Route path="/6qr" element={<QR1 />} />
      </Routes>
    </Router>
  );
}

export default App;
