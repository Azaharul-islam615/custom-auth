import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

import UseAxiosSecure from "../hooks/UseAxiosSecure";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const axiosSecure=UseAxiosSecure()

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            await axiosSecure.post("/api/auth/register", {
                name: values.name,
                email: values.email,
                password: values.password,
            });

            message.success("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            message.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (_, value) => {
        if (!value) {
            return Promise.reject("Please enter your password");
        }
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

        if (value.length < 6) {
            return Promise.reject("Password must be at least 6 characters");
        }
        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
            return Promise.reject(
                "Password must include uppercase, lowercase, number, and symbol"
            );
        }
        return Promise.resolve();
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
                        Sign Up to continue to your Profile
                    </p>
                </div>

                {/* Ant Design Form */}
                <Form
                    name="register"
                    onFinish={handleRegister}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        label={<span className="text-gray-700 font-medium">Name</span>}
                        name="name"
                        rules={[
                            { required: true, message: "Please enter your name" },
                            { min: 2, message: "Name must be at least 2 characters" },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your name"
                            size="large"
                            className="rounded-lg"
                        />
                    </Form.Item>

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
                        rules={[{ validator: validatePassword }]}
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
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                
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