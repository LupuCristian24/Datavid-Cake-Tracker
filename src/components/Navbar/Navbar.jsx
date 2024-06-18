import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">Datavid Cake Tracker</h1>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/add">Add New Birthday</Link>
        <Link className="navbar-link" to="/list">List Birthdays</Link>
      </div>
    </nav>
  );
};

export default Navbar;