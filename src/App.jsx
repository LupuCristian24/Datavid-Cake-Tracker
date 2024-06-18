import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import AddBirthday from './components/Add/AddBirthday';
import ListBirthday from './components/List/ListBirthdays';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBirthday />} />
            <Route path="/list" element={<ListBirthday />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
