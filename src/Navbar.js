import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <h1><a href="/">Medical Bill</a></h1>
      <div className="links">

        <Link to="/">Home</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: 'darkmagenta',
          borderRadius: '8px' 
        }}>New Bill</Link>

      </div>

    </nav>
  );
}
 
export default Navbar;