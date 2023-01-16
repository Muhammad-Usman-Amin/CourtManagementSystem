import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>District Judiciary Dir Lower</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: "8px",
                }}>New Blog</Link>
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