import { useState } from "react";
import { Link, useNavigate } from "react-router";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            A
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Authentication
                        </h2>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500">
                        Sign Up to continue to your Profile
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    <div className="mb-2">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-2">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Signup */}
                <p className="text-center mt-6 text-gray-500">
                    already have an account?{" "}
                    <Link to={"/login"} className="text-emerald-600 font-semibold">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;