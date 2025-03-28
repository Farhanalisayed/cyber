import EnhancedVendorDashboard from "./components/EnhancedVendorDashboard";
import VendorListView from "./components/VendorListView";
import Advertise from "./components/Advertise";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnhancedVendorDashboard />} />
        <Route path="/vendors" element={<VendorListView />} />
        <Route path="/advertise" element={<Advertise />} />
      </Routes>
    </Router>
  )
}

export default App
