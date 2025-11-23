import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import AccountCreate from "./pages/CreateAccount";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<AccountCreate />} />

      </Routes>
    </Router>
  )
}

export default App;