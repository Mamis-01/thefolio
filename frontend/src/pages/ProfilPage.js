// frontend/src/pages/ProfilPage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API, { BACKEND_URL } from '../api/axios';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);
    try {
      // Do NOT manually set Content-Type — Axios sets multipart automatically
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await API.put('/auth/change-password', {
        currentPassword: curPw,
        newPassword: newPw,
      });
      setCurPw('');
      setNewPw('');
      setMsg('Password changed successfully!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className='profile-page'>
      <h2>My Profile</h2>
      {msg && <p className={msg.includes('Error') ? 'error-msg' : 'success-msg'}>{msg}</p>}

      <div className='profile-section'>
        <h3>Profile Information</h3>
        <form onSubmit={handleProfile}>
          <div className='form-group'>
            <label>Name:</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Your name'
              required
            />
          </div>

          <div className='form-group'>
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder='Tell us about yourself...'
              rows={4}
            />
          </div>

          <div className='form-group'>
            <label>Profile Picture:</label>
            {user?.profilePic && (
              <div className='profile-pic-preview'>
                <img src={`${BACKEND_URL}/uploads/${user.profilePic}`} alt='Profile' />
              </div>
            )}
            <input
              type='file'
              accept='image/*'
              onChange={e => setPic(e.target.files[0])}
            />
          </div>

          <button type='submit'>Update Profile</button>
        </form>
      </div>

      <div className='password-section'>
        <h3>Change Password</h3>
        <form onSubmit={handlePassword}>
          <div className='form-group'>
            <label>Current Password:</label>
            <input
              type='password'
              value={curPw}
              onChange={e => setCurPw(e.target.value)}
              placeholder='Enter current password'
              required
            />
          </div>

          <div className='form-group'>
            <label>New Password:</label>
            <input
              type='password'
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder='Enter new password'
              required
            />
          </div>

          <button type='submit'>Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;