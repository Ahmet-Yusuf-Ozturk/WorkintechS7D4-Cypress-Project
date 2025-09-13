import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Success = () => {
    const [showButton, setShowButton] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
        setShowButton(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleRedirect = () => {
        history.push('/main');
    };

    const pageStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        zIndex: 9999
    };

    const containerStyle = {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '48px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease-in-out'
    };

    const successIconContainerStyle = {
        marginBottom: '24px'
    };

    const successIconBackgroundStyle = {
        width: '64px',
        height: '64px',
        backgroundColor: '#dcfce7',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
    };

    const checkmarkStyle = {
        width: '32px',
        height: '32px',
        color: '#16a34a',
        strokeWidth: '2',
        fill: 'none',
        stroke: 'currentColor'
    };

    const headingStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '16px',
        lineHeight: '1.2'
    };

    const paragraphStyle = {
        color: '#6b7280',
        fontSize: '18px',
        marginBottom: '32px',
        lineHeight: '1.6'
    };

    const loadingContainerStyle = {
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px'
    };

    const dotStyle = {
        width: '8px',
        height: '8px',
        backgroundColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'bounce 1.5s infinite'
    };

    const dotStyle2 = {
        ...dotStyle,
        animationDelay: '0.1s'
    };

    const dotStyle3 = {
        ...dotStyle,
        animationDelay: '0.2s'
    };

    const redirectMessageStyle = {
        fontSize: '14px',
        color: '#9ca3af',
        marginBottom: showButton ? '16px' : '0',
        opacity: showButton ? 0.7 : 1,
        transition: 'opacity 0.3s ease'
    };

    const buttonStyle = {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
        opacity: showButton ? 1 : 0,
        visibility: showButton ? 'visible' : 'hidden',
        marginTop: '0'
    };

    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
        @keyframes bounce {
            0%, 80%, 100% {
            transform: scale(0);
            }
            40% {
            transform: scale(1);
            }
        }
        `;
        document.head.appendChild(style);
        
        return () => {
        document.head.removeChild(style);
        };
    }, []);

    return (
        <div style={pageStyle}>
        <div 
            style={containerStyle}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
            {/* Success Icon */}
            <div style={successIconContainerStyle}>
            <div style={successIconBackgroundStyle}>
                <svg 
                style={checkmarkStyle}
                viewBox="0 0 24 24"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7" 
                />
                </svg>
            </div>
            </div>

            {/* Success Message */}
            <h1 data-cy="success-mesage" style={headingStyle}>
            Login Successful!
            </h1>
            
            <p style={paragraphStyle}>
            Welcome back! You have successfully signed in.
            </p>

            {/* Custom Loading Component */}
            <div style={loadingContainerStyle}>
            <div style={dotStyle}></div>
            <div style={dotStyle2}></div>
            <div style={dotStyle3}></div>
            </div>

            {/* Redirect message */}
            <p style={redirectMessageStyle}>
            Redirecting you to the dashboard...
            </p>

            {/* Button that appears after 5 seconds */}
            <button 
            style={buttonStyle}
            onClick={handleRedirect}
            onMouseEnter={(e) => {
                if (showButton) {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1.05)';
                }
            }}
            onMouseLeave={(e) => {
                if (showButton) {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'scale(1)';
                }
            }}
            >
            Continue to Home
            </button>
        </div>
        </div>
);
};

export default Success;