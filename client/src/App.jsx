import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import UserPage from "./pages/UserPage";
import ManagerPage from "./pages/ManagerPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TopNav />

      <div className="app-container">
        <Routes>
          <Route path="/admin" element={<ManagerPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
