import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ theme, toggleTheme }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header>
            <h1>Hoops & Friends</h1>
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink></li>
                    
                    {user ? (
                        <>
                            <li><NavLink to="/create-post" className={({ isActive }) => isActive ? "active" : ""}>Write Post</NavLink></li>
                            {user.role === 'admin' && (
                                <li><NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin</NavLink></li>
                            )}
                            <li><NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>{user.name}</NavLink></li>
                            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink></li>
                            <li><NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>Join Us</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
            <div className="theme-switch-wrapper">
                <span id="mode-text">{theme === 'dark' ? "Dark Mode" : "Light Mode"}</span>
                <label className="theme-switch" htmlFor="checkbox">
                    <input 
                        type="checkbox" 
                        id="checkbox" 
                        onChange={toggleTheme} 
                        checked={theme === 'dark'} 
                    />
                    <div className="slider round"></div>
                </label>
            </div>
        </header>
    );
}