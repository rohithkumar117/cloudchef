import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../hooks/useRecipesContext';
import './Profile.css'; // Import the CSS file for styling

const Profile = () => {
    const { user, dispatch } = useRecipesContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [about, setAbout] = useState('');
    const [region, setRegion] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [phoneNotifications, setPhoneNotifications] = useState(false);
    const [notifyOnFollowedRecipe, setNotifyOnFollowedRecipe] = useState(false);
    const [notifyOnReport, setNotifyOnReport] = useState(false);
    const [notifyOnComment, setNotifyOnComment] = useState(false);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('profile'); // State to track active section
    const [showLogoutSuccessModal, setShowLogoutSuccessModal] = useState(false); // State for logout success modal

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`/api/users/${user.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setEmail(data.email);
                    setProfilePhoto(data.profilePhoto);
                    setAbout(data.about);
                    setRegion(data.region);
                    setEmailNotifications(data.emailNotifications);
                    setPhoneNotifications(data.phoneNotifications);
                    setNotifyOnFollowedRecipe(data.notifyOnFollowedRecipe);
                    setNotifyOnReport(data.notifyOnReport);
                    setNotifyOnComment(data.notifyOnComment);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError('Failed to fetch user information');
            }
        };

        fetchUserInfo();
    }, [user.userId]);

    const handleLogout = () => {
        fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if (response.ok) {
                dispatch({ type: 'LOGOUT' });
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error('Failed to log out');
            }
        }).catch(error => {
            console.error('Error logging out:', error);
        });
    };

    const handleOkClick = () => {
        setShowLogoutSuccessModal(false);
        navigate('/login');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        if (password) formData.append('password', password);
        if (profilePhoto) formData.append('profilePhoto', profilePhoto);
        formData.append('about', about);
        formData.append('region', region);
        formData.append('emailNotifications', emailNotifications);
        formData.append('phoneNotifications', phoneNotifications);
        formData.append('notifyOnFollowedRecipe', notifyOnFollowedRecipe);
        formData.append('notifyOnReport', notifyOnReport);
        formData.append('notifyOnComment', notifyOnComment);

        try {
            const response = await fetch(`/api/users/${user.userId}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                dispatch({ type: 'LOGIN', payload: json });
                setError(null);
                alert('Profile updated successfully');
            }
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <form onSubmit={handleUpdateProfile} className="profile-form">
                        <div className="profile-info">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={user.firstName}
                                readOnly
                            />
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={user.lastName}
                                readOnly
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Profile Photo:</label>
                            <div className="profile-photo">
                                {profilePhoto ? (
                                    <img src={URL.createObjectURL(profilePhoto)} alt="Profile" />
                                ) : (
                                    <img src={user.profilePhoto || "/default-profile.png"} alt="Default Profile" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                                />
                                <label htmlFor="profilePhotoUpload" className="upload-button">
                                    Upload Photo
                                </label>
                            </div>
                            <label>About:</label>
                            <textarea
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                            <label>Region:</label>
                            <input
                                type="text"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            />
                            <button type="submit">Update Profile</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </form>
                );
            case 'location':
                return (
                    <form onSubmit={handleUpdateProfile} className="profile-form">
                        <div className="profile-info">
                            <label>Region:</label>
                            <input
                                type="text"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            />
                            <button type="submit">Update Location</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </form>
                );
            case 'security':
                return (
                    <form onSubmit={handleUpdateProfile} className="profile-form">
                        <div className="profile-info">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Update Security</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </form>
                );
            case 'notifications':
                return (
                    <form onSubmit={handleUpdateProfile} className="profile-form">
                        <div className="profile-info">
                            <label>Email Notifications:</label>
                            <input
                                type="checkbox"
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                            />
                            <label>Phone Notifications:</label>
                            <input
                                type="checkbox"
                                checked={phoneNotifications}
                                onChange={(e) => setPhoneNotifications(e.target.checked)}
                            />
                            <label>Notify when followed people create a recipe:</label>
                            <input
                                type="checkbox"
                                checked={notifyOnFollowedRecipe}
                                onChange={(e) => setNotifyOnFollowedRecipe(e.target.checked)}
                            />
                            <label>Notify when someone reports your recipe:</label>
                            <input
                                type="checkbox"
                                checked={notifyOnReport}
                                onChange={(e) => setNotifyOnReport(e.target.checked)}
                            />
                            <label>Notify when someone comments on your recipe:</label>
                            <input
                                type="checkbox"
                                checked={notifyOnComment}
                                onChange={(e) => setNotifyOnComment(e.target.checked)}
                            />
                            <button type="submit">Update Notifications</button>
                            {error && <div className="error">{error}</div>}
                        </div>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
            <div className="sidebar">
                <h3>Account Information</h3>
                <ul>
                    <li onClick={() => setActiveSection('profile')}>Profile Settings</li>
                    <li onClick={() => setActiveSection('location')}>Location</li>
                    <li onClick={() => setActiveSection('security')}>Security</li>
                    <li onClick={() => setActiveSection('notifications')}>Notifications</li>
                </ul>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="profile-card">
                <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</h2>
                <div className="profile-content">
                    {renderSection()}
                </div>
            </div>

            {showLogoutSuccessModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Logout Successful</h4>
                        <button onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
