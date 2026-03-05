import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { AuthProvider } from "../context/AuthContext";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthProvider);
    const axiosSecure=UseAxiosSecure()

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const res = await axiosSecure.post(
                "/api/auth/login",
                {
                    email: values.email,
                    password: values.password,
                },
                { withCredentials: true }
            );

            const { accessToken, user } = res.data;
            login(user, accessToken);
            message.success("Login successful!");
            navigate("/profile");
        } catch (err) {
            message.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-md">
                
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
                        Sign in to continue to your Profile
                    </p>
                </div>

                {/* Ant Design Form */}
                <Form
                    name="login"
                    onFinish={handleLogin}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        label={<span className="text-gray-700 font-medium">Email</span>}
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Enter your email"
                            size="large"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-gray-700 font-medium">Password</span>}
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your password" },
                            { min: 6, message: "Password must be at least 6 characters" },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter your password"
                            size="large"
                            className="rounded-lg"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                            style={{ backgroundColor: "#059669" }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center mt-6 text-gray-500">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-emerald-600 font-semibold">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;