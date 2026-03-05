import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Button, Spin, message, Descriptions } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import UseAxiosSecure from "./hooks/UseAxiosSecure";
import { AuthProvider } from "./context/AuthContext";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const { logout } = useContext(AuthProvider);

    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosSecure.get("/api/auth/profile");

                setUserData(res.data.user);
            } catch {
                message.error("Failed to load profile");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [axiosSecure, navigate]);

    const handleLogout = async () => {
        try {
            await axiosSecure.post("/api/auth/logout");
            logout();
            message.success("Logged out successfully");
            navigate("/login");
        } catch {
            message.error("Logout failed");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Card
                    className="shadow-2xl rounded-2xl"
                    title={
                        <div className="flex items-center gap-3">
                            <UserOutlined className="text-2xl text-emerald-600" />
                            <span className="text-2xl font-bold">User Profile</span>
                        </div>
                    }
                >
                    <Descriptions bordered column={1} size="large">
                        <Descriptions.Item label="Name">
                            {userData?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {userData?.email}
                        </Descriptions.Item>
                        
                    </Descriptions>

                    <div className="mt-6 flex justify-end ">
                        <div className="bg-green-5">
                            <Button

                                type="primary"
                                danger
                                size="large"
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                                className="!bg-green-500 !text-semibold !border-green-500 !text-white hover:!bg-green-600"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;