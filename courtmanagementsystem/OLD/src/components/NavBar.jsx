import { Link, NavLink } from "react-router-dom";
import '../styles/navBar.css';
import CauseLists from "../routes/CauseLists";
import LoginForm from "../routes/LoginForm";

const Navbar = () => {
    return (
        <nav className="navbar">

            <h1>District Judiciary Dir Lower</h1>

            <div>
                <NavLink to="/CauseLists" className="links">CauseLists</NavLink>
                <NavLink to="/LoginForm" className="links">Profile</NavLink>

                {/* <Link to="/" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: "8px",
                }}>Add Case</Link> */}

                {/* <a href="/">Home</a>
                <a href="/create" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: "8px",
                }}>New Blog</a> */}

            </div>
        </nav>
    );
}

export default Navbar;