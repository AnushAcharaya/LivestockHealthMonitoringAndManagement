import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AccountCreate from "./pages/CreateAccount";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<AccountCreate />} />
        <Route path="/" element={<LoginPage />} />

      </Routes>
    </Router>
  )
}

export default App;