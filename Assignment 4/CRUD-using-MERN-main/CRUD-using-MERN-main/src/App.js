import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import NotesState from "./context/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Calculator from "./components/Calculator";

function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />}/>
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
