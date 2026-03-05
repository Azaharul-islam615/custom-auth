import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthProvider } from '../context/AuthContext';
import { message } from 'antd';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const Nav = () => {
    const { user, logout } = useContext(AuthProvider);
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();

    const handleLogout = async () => {
        try {
            await axiosSecure.post("/api/auth/logout");
            logout();
            message.success("Logged out successfully");
            navigate("/login");
        } catch (err) {
            message.error("Logout failed");
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li ><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/profile"}>Profile</NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Authentication</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className=' text-[16px]'><NavLink to={"/"}>Home</NavLink></li>
                    <li className=' text-[16px]'><NavLink to={"/profile"}>Profile</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user || localStorage.getItem("accessToken") ? (
                    <div className='text-white'>
                        <button
                            onClick={handleLogout}
                            className="px-4 md:px-16 py-1 md:py-3 mr-1 md:mr-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition"
                        >
                            Logout
                        </button>
                        </div>
                ) : (
                    <>
                        <Link to={"/login"} className="px-4 md:px-16 py-1 md:py-3 mr-1 md:mr-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition">Login</Link>
                        <Link to={"/register"} className="px-4 md:px-16 py-1 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Nav;