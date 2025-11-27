import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AccountCreate from "./pages/CreateAccount";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<AccountCreate />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      </Routes>
    </Router>
  )
}

export default App;