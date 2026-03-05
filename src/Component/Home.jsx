import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Typography, Row, Col } from 'antd';
import { RocketOutlined, SafetyOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';
import { AuthProvider } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthProvider);

    const features = [
        {
            icon: <RocketOutlined className="text-5xl text-blue-500" />,
            title: "Fast & Reliable",
            description: "Lightning-fast performance with secure authentication"
        },
        {
            icon: <SafetyOutlined className="text-5xl text-green-500" />,
            title: "Secure Platform",
            description: "Your data is protected with industry-standard security"
        },
        {
            icon: <ThunderboltOutlined className="text-5xl text-yellow-500" />,
            title: "Easy to Use",
            description: "Intuitive interface designed for seamless experience"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <Title level={1} className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Welcome to Our Platform
                            </span>
                        </Title>
                        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Experience the next generation of secure and efficient web applications.
                            Join thousands of users who trust our platform.
                        </Paragraph>

                        <div className="flex gap-4 justify-center flex-wrap">
                            {user ? (
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<UserOutlined />}
                                    onClick={() => navigate('/profile')}
                                    className="h-12 px-8 !bg-emerald-600 text-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0"
                                >
                                    View Profile
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={() => navigate('/register')}
                                            className="h-12 px-8 !text-semibold !bg-emerald-600 hover:!bg-emerald-700 text-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0"
                                    >
                                        Get Started
                                    </Button>
                                    <Button
                                        size="large"
                                        onClick={() => navigate('/login')}
                                        className="h-12 px-8 text-lg"
                                    >
                                        Sign In
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Row gutter={[32, 32]}>
                    {features.map((feature, index) => (
                        <Col xs={24} md={8} key={index}>
                            <Card
                                hoverable
                                className="h-full text-center shadow-lg rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <Title level={3} className="mb-3">
                                    {feature.title}
                                </Title>
                                <Paragraph className="text-gray-600">
                                    {feature.description}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* CTA Section */}
            {!user && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 rounded-3xl shadow-2xl">
                        <div className="text-center py-12">
                            <Title level={2} className="text-white mb-4">
                                Ready to Get Started?
                            </Title>
                            <Paragraph className="text-white text-lg mb-8 opacity-90">
                                Join our community today and unlock amazing features
                            </Paragraph>
                            <Button
                                type="default"
                                size="large"
                                onClick={() => navigate('/register')}
                                className="h-12 px-8 text-lg bg-white text-blue-600 border-0 font-semibold hover:bg-gray-100"
                            >
                                Create Free Account
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Home;